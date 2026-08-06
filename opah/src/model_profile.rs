use serde::Deserialize;

fn n_ctx_default() -> u32 {
    8192
}
fn n_seq_max_default() -> u32 {
    16
}
fn temperature_default() -> f32 {
    0.8
}
fn top_p_default() -> f32 {
    0.85
}

fn batch_size_default() -> usize {
    1024
}

fn stop_default() -> String {
    "```".to_string()
}
fn seed_default() -> u32 {
    0
}

#[derive(Debug, Deserialize)]
pub struct Config {
    pub path: String,
    pub sys_prompt: String,

    #[serde(default = "n_ctx_default")]
    pub n_ctx: u32,

    #[serde(default = "n_seq_max_default")]
    pub n_seq_max: u32,

    #[serde(default = "temperature_default")]
    pub temperature: f32,

    #[serde(default = "top_p_default")]
    pub top_p: f32,

    #[serde(default = "batch_size_default")]
    pub batch_size: usize,

    #[serde(default = "seed_default")]
    pub seed: u32,

    #[serde(default = "stop_default")]
    pub stop: String,
}
