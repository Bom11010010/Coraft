
enum ParseState{
    NONE,
    CODE,
    PROMPT,
    STRING,
}
pub fn code_split(code :&str) -> Vec<String>{
    let normalized_code = code.replace("\r\n", "\n").replace("\r", "\n");
    let mut chunks: Vec<String> = Vec::new();

    let lines: Vec<&str> = normalized_code.lines().collect();
    let mut i: usize = 0;

    let mut chunk_buffer = String::new();

    let mut state = ParseState::NONE;
    while lines.len() > i {
        match state {
            ParseState::NONE => {
                match lines[i] {
                    line if lines[i].trim_matches(|c| c == ' ' || c == '\t').starts_with("#pragma opah") =>{
                        state = ParseState::PROMPT;
                    }
                    _ => {
                        state = ParseState::CODE;
                    }
                }
            }

            ParseState::PROMPT => {
                chunk_buffer.push_str(lines[i]);
                chunk_buffer.push_str("\n");

                if !lines[i].ends_with("\\") {
                    chunks.push(chunk_buffer.clone());

                    chunk_buffer.clear();

                    state = ParseState::NONE;
                }

                i += 1;
            }

            ParseState::CODE => {
                chunk_buffer.push_str(lines[i]);
                chunk_buffer.push_str("\n");
                i += 1;
                if lines.len() <= i{
                    break;
                }

                if lines[i].trim_matches(|c| c == ' ' || c == '\t').starts_with("#pragma opah") {
                    chunks.push(chunk_buffer.clone());

                    chunk_buffer.clear();

                    state = ParseState::NONE;
                }
            }

            _ => {
                state = ParseState::NONE;
            }
        }
    }
    chunks.push(chunk_buffer.clone());

    chunks
}