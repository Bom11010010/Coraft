
use tokio::{fs::File, io::AsyncWriteExt };

pub async fn init() -> anyhow::Result<()>{
    eprintln!("Initializing start");
    tokio::fs::create_dir_all("./models/qwen3/").await?;
    let mut toml = File::create("./models/qwen3/model.toml").await?;
    toml.write_all(String::from("
path = \"https://huggingface.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-1M-GGUF/resolve/main/Qwen3-Coder-30B-A3B-Instruct-1M-Q4_K_M.gguf?download=true\"
temperature = 0.8
top_p = 0.9
sys_prompt = \"prompt.md\"
stop = \"```\"
"       ).as_bytes()).await?;
        let mut prompt = File::create("./models/qwen3/prompt.md").await?;
        prompt.write_all(r"# Use Order
{user}

# Code

## User Code

{file_name}
```cpp
{pre}
/* Replace the code in this section. */
{suf}
```

# Your Response

Replace code at `/* Replace the code in this section. */` section is:
```cpp".as_bytes()).await?;
    eprintln!("Initializing finish");
        
    Ok(())
}