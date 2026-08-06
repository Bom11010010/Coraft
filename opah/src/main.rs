use clap::{Parser, builder::Str};
use encoding_rs::UTF_8;
use llama_cpp_2::{
    context::params::LlamaContextParams,
    llama_backend::LlamaBackend,
    llama_batch::LlamaBatch,
    model::{AddBos, LlamaModel, params::LlamaModelParams},
    sampling::LlamaSampler,
};
use serde::Deserialize;
use std::path::Path;
use std::{collections::HashMap, num::NonZeroU32};
use tokio::{fs::File, io::AsyncWriteExt};

use crate::{code_split::code_split, complementer::{complement, initialize}};

mod args;
mod chunk_stream;
mod code_split;
mod complement_task;
mod get_model;
mod get_prompt;
mod init;
mod model_profile;
mod complementer;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let args = args::Args::parse();

    if args.init {
        init::init().await?;
        return Ok(());
    }

    let model_profile_name: String = match args.model {
        Some(model) => model,
        None => {
            "qwen3".to_string() //Todo: ./models 直下のディレクトリのうち、辞書順で最初のプロファイルを選ぶようにする
        }
    };

    let config: model_profile::Config = {
        let content = tokio::fs::read_to_string(
            Path::new("./models/")
                .join(&model_profile_name)
                .join("model.toml"),
        )
        .await?;

        toml::from_str(&content)?
    };
    let mut splited_codes: HashMap<String, Vec<String>> = HashMap::new();
    for path in args.inputs {
        let code = tokio::fs::read_to_string(&path).await?;
        let splited = code_split(&code);

        splited_codes.insert(path.clone(), splited.clone());
    }

    let splited_codes: HashMap<String, Vec<String>> = splited_codes;

    let mut chunk_streams: HashMap<String, Vec<chunk_stream::Chunk>> = HashMap::new();

    let base_prompt = tokio::fs::read_to_string(
        Path::new("./models/")
            .join(&model_profile_name)
            .join(&(config.sys_prompt)),
    )
    .await?;
    get_prompt::set_base_prompt(&base_prompt);
    
    initialize(&config).await?;

    for (path, chunks) in splited_codes {
        chunk_streams.insert(path.clone(), chunk_stream::create(&path, chunks, &config).await?);
    }
    let chunk_streams = chunk_streams;


    for (path, chunks) in chunk_streams {
        let o_path = path + ".complement.cpp";
        let mut o_file = File::create(&o_path).await?;
        for c in chunks {
            o_file.write_all(c.body.as_bytes()).await?;
        }
    }

    Ok(())
}
