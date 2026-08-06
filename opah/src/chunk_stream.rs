use crate::{complementer, get_prompt, model_profile::Config};

pub struct Chunk {
    pub is_hole: bool,
    pub body: String,
}

pub async fn create(path: &str, raw_chunks: Vec<String>, config :&Config) -> anyhow::Result<Vec<Chunk>> {
    let mut chunks: Vec<Chunk> = Vec::new();

    for (i, v) in raw_chunks.iter().enumerate() {
        let is_hole = v
            .trim_matches(|c| c == ' ' || c == '\t')
            .starts_with("#pragma opah");
        if is_hole {
            let user_prompt: String = {
                let buffer: String = v
                    .to_string()
                    .trim_matches(|c| c == ' ' || c == '\t')
                    .chars()
                    .skip(13)
                    .collect();

                buffer.replace("\\\n", "\n")
            };
            let mut pre: String = String::new();
            let mut suf: String = String::new();

            for (j, v2) in raw_chunks.iter().enumerate() {
                let chunk: String = {
                    if v2
                        .trim_matches(|c| c == ' ' || c == '\t')
                        .starts_with("#pragma opah")
                    {
                        "{\n}\n".to_string()
                    } else {
                        v2.to_string()
                    }
                };
                if j < i {
                    pre += &chunk;
                }
                if j > i {
                    suf += &chunk;
                }
            }

            let pre = pre;
            let suf = suf;
            let snippet = complementer::complement(&user_prompt, path, &pre, &suf, config).await?;
            chunks.push(Chunk {
                is_hole: true,
                body: format!("{{\n{snippet}\n}}\n"),
            });
        } else {
            chunks.push(Chunk {
                is_hole: false,
                body: v.to_string(),
            });
        }
    }

    Ok(chunks)
}
