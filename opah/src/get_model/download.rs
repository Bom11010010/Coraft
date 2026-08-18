use std::{path::{Path, PathBuf}, str::FromStr};

use anyhow::{Result, anyhow, Context};
use reqwest::{Client, Request, Response};
use url::Url;
use tokio::{fs::File, io::{AsyncSeekExt, AsyncWriteExt, SeekFrom, BufWriter}, task::JoinSet};
use futures_util::StreamExt;
use indicatif::{MultiProgress, ProgressBar, ProgressStyle};

pub async fn download_model(url:&str, dl_path: &Path) -> anyhow::Result<()>{
    let client = Client::new();

    let res = client
        .get(url)
        .header(reqwest::header::RANGE, "bytes=0-0")
        .send()
        .await?;

    let mut temporary_path = dl_path.to_path_buf();
    temporary_path.add_extension("download");

    if res.status() == reqwest::StatusCode::PARTIAL_CONTENT{
        let total_size = res.headers()
            .get(reqwest::header::CONTENT_RANGE)
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.rsplit('/').next())
            .and_then(|v| v.parse::<u64>().ok());

        match total_size {
            Some(v) => {
                download_parallel(client, url, &temporary_path, v).await?
            }
            _ => {
                download_serial(client, url, &temporary_path).await?;
            }
        }

    }else{
        download_serial(client, url, &temporary_path).await?;
    }

    tokio::fs::rename(temporary_path, dl_path).await.context("failed file renaming")?;

    Ok(())
}

async fn download_serial(client: Client, url:&str, temporary_file_path:&Path) -> anyhow::Result<()>{
    eprintln!("Serial Download");
    let res = client.get(url).send().await?;
    let mut temporary_file = BufWriter::new(File::create(&temporary_file_path).await?);

    let total_size = res.content_length().unwrap_or(0);
    let mut stream = res.bytes_stream();

    let mut downloaded:u64 = 0;

    let pb = ProgressBar::new(total_size);

    pb.set_style(
        ProgressStyle::with_template(
            "[{bar:40.bold/black}] {pos}/{len} {percent}%"
        )
        .unwrap()
        .progress_chars("=> ")
    );

    while let Some(chunk) = stream.next().await {
        let chunk = chunk?;

        temporary_file.write_all(&chunk).await?;

        pb.inc(chunk.len() as u64);
    }
    pb.finish_with_message("finished");
    Ok(())
}

async fn download_parallel(client: Client, url:&str, temporary_file_path:&Path, total_size: u64) -> anyhow::Result<()>{
    eprintln!("Parallel Download");

    let mut join_set:JoinSet<anyhow::Result<()>> = JoinSet::new();

    let worker_count:usize = 16;
    let chunk_size:u64 = total_size / worker_count as u64;

    let multi_pb = MultiProgress::new();

    let parent_pb = multi_pb.add(ProgressBar::new(total_size));
    parent_pb.set_style(
        ProgressStyle::with_template(
            "[{bar:40.bold/black}] {pos}/{len} {percent}%"
        )
        .unwrap()
        .progress_chars("=>-")
    );
    let mut temporary_file: File = File::create(&temporary_file_path).await?;
    
    for i in 0..worker_count {
        let start = i as u64 * chunk_size;
        let end = if i == worker_count - 1{
            total_size - 1
        } else {
            start as u64 + chunk_size - 1
        };

        let client = client.clone();
        
        let mut temporary_file: File = temporary_file.try_clone().await?;

        temporary_file.set_len(total_size).await?;

        let url = url.to_string();

        let multi_pb = multi_pb.clone();

        let parent_pb = parent_pb.clone();
        
        join_set.spawn(async move {
            let range = format!("bytes={}-{}", start, end);
            let mut res = client
                .get(url)
                .header(reqwest::header::RANGE, range)
                .send()
                .await?;

            let mut o_file = temporary_file;

            o_file.seek(SeekFrom::Start(start as u64)).await?;

            let mut stream = res.bytes_stream();
            
            let mut downloaded:u64 = 0;

            let pb = multi_pb.add(ProgressBar::new(end - start as u64));

            pb.set_style(
                ProgressStyle::with_template(
                    &(format!("{}", i).to_string() + ": [{bar:20.bold/black}] {pos}/{len} {percent}%")
                )
                .unwrap()
                .progress_chars("=>-")
            );

            while let Some(chunk) = stream.next().await{
                let chunk = chunk?;
                o_file.write_all(&chunk).await?;

                pb.inc(chunk.len() as u64);
                parent_pb.inc(chunk.len() as u64);
            }
            o_file.flush().await?;

            Ok(())
        }
        );
    }

    while let Some(res) = join_set.join_next().await{
        res??;
    }


    Ok(())
}