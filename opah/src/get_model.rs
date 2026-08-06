use std::{path::{Path, PathBuf}, str::FromStr};

use anyhow::{Result, anyhow, Context};
use reqwest::{Client, Request, Response};
use url::Url;
use tokio::{fs::File, io::{AsyncSeekExt, AsyncWriteExt, SeekFrom, BufWriter}, task::JoinSet};
use futures_util::StreamExt;
use indicatif::{MultiProgress, ProgressBar, ProgressStyle};

const MODEL_ROOT_STR:&str = "./opah/models";

mod download;

pub async fn get(model_path: &str) -> anyhow::Result<PathBuf>{
    let mut model_root = PathBuf::from(dirs::config_dir().unwrap());

    model_root.push(MODEL_ROOT_STR);

    tokio::fs::create_dir_all(&model_root).await?;

    let local_model_path = PathBuf::from(get_path_from_url_or_path(model_path).await?);
    let mut path = PathBuf::new();

    path = if local_model_path.is_absolute() {
        local_model_path
    }else{
        path.clear();
        path.push(&model_root);
        path.push(local_model_path);

        path
    };


    Ok(path)
}

async fn get_path_from_url_or_path(path_or_url: &str) -> anyhow::Result<String>{
    let mut result = path_or_url.to_string();
    if let Ok(url) = Url::parse(path_or_url){
        match url.scheme() {
            "http" | "https" | "ftp" => {
                if let Some((_, r)) = result.rsplit_once('/'){
                    result = r.to_string();
                }
                if let Some((l, _)) = result.split_once('?'){
                    result = l.to_string();
                }
                let mut dl_path = PathBuf::from(&dirs::config_dir().unwrap());
                dl_path.push(MODEL_ROOT_STR);
                dl_path.push(&result);

                let exist = tokio::fs::try_exists(&dl_path).await?;
                if !exist{
                    download::download_model(path_or_url, &dl_path).await?;
                }
            }

            _ => {}
        }
    }
    Ok(result)
}