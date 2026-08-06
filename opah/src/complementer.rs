use std::sync::Mutex;
use llama_cpp_2::{
    context::params::LlamaContextParams,
    llama_backend::LlamaBackend,
    llama_batch::LlamaBatch,
    model::{AddBos, LlamaModel, params::LlamaModelParams},
    sampling::LlamaSampler,
};
use encoding_rs::UTF_8;
use std::num::NonZeroU32;

use crate::{get_model, model_profile::Config, get_prompt};

static BACKEND: Mutex<Option<LlamaBackend>> = Mutex::new(None);
static MODEL: Mutex<Option<LlamaModel>> = Mutex::new(None);

pub async fn initialize(config: &Config)-> anyhow::Result<()>{
    
    let model_local_path = get_model::get(&(config.path)).await?;

    let model_param  = LlamaModelParams::default();

    *BACKEND
    .lock()
    .unwrap() = {
        let mut temporary = LlamaBackend::init()?;
        //temporary.void_logs();
        Some(temporary)
    };

    let g = BACKEND.lock().unwrap();

    let backend = g.as_ref().unwrap();

    *MODEL.lock().unwrap() = Some(
        LlamaModel::load_from_file(
            backend,
            model_local_path.to_str().unwrap(),
            &model_param
        )?
    );
    Ok(())
}

pub async fn complement(user: &str, path: &str, pre: &str, suf: &str, config: &Config) -> anyhow::Result<String>{
    let prompt = get_prompt::get(user, path, pre, suf);
    let ctx_param = LlamaContextParams::default()
        .with_n_ctx(NonZeroU32::new(config.n_ctx))
        .with_n_seq_max(config.n_seq_max);

    let g= BACKEND.lock().unwrap();
    let backend = g.as_ref().unwrap();
    let g= MODEL.lock().unwrap();
    let model = g.as_ref().unwrap();

    let tokens = model.str_to_token(&prompt, AddBos::Never)?;

    let n_batch_tokens: usize = config.batch_size;

    let mut batch = LlamaBatch::new(n_batch_tokens, 1);

    let mut decoder = UTF_8.new_decoder();

    let mut sampler = LlamaSampler::chain_simple([
        LlamaSampler::top_p(config.top_p, 1),
        LlamaSampler::temp(config.temperature),
        LlamaSampler::dist(config.seed),
    ]);

    let stop = config.stop.clone();
    let mut output = String::new();
    let mut cursor: i32 = 0;

    let mut ctx = model.new_context(backend, ctx_param)?;

    ctx.kv_cache_seq_rm(0, None, None);
    cursor = tokens.len() as i32;

    let mut pos: usize = 0;

    eprint!("{}{{", pre);

    for c in tokens.chunks(n_batch_tokens) {
        batch.clear();
        for (i, token) in c.iter().enumerate() {
            batch.add(
                *token,
                pos as i32 + i as i32,
                &[0],
                pos + i == tokens.len() - 1,
            )?;
        }
        ctx.decode(&mut batch)?;
        pos += c.len();
    }

    for _ in 0..200 {
        let token = sampler.sample(&ctx, batch.n_tokens() - 1);

        if model.is_eog_token(token) {
            break;
        }

        let word = model.token_to_piece(token, &mut decoder, false, None)?;

        output.push_str(&word);

        if output.contains(&stop) {
            break;
        }
        eprint!("{}", word);

        batch.clear();
        batch.add(token, cursor, &[0], true)?;
        ctx.decode(&mut batch)?;
        cursor += 1;
    }
    eprint!("}}{}", suf);
    let (output,_) = output.split_once('`').unwrap();
    Ok(output.to_string())
}