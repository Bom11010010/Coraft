
use clap::{Parser, builder::Str};

#[derive(Parser, Debug)]
#[command(override_usage = "opah [INPUTS]... <OPTIONS>")]
pub struct Args{
    pub inputs: Vec<String>,
    #[arg(
        short,
        long,
        help = r"Model profile ( ./models/<MODEL_PROFILE>/ )",
        value_name = "MODEL_PROFILE"
    )]
    pub model: Option<String>,

    #[arg(
        short,
        long,
        help = "Initialize"
    )]
    pub init: bool,
}