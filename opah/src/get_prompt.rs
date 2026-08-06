use std::sync::Mutex;

static BASE_PROMPT: Mutex<String> = Mutex::new(String::new());

pub fn get(user: &str, file_name: &str, pre: &str, suf: &str) -> String {
    BASE_PROMPT
        .lock()
        .unwrap()
        .to_string()
        .replace("{user}", user)
        .replace("{file_name}", file_name)
        .replace("{pre}", &(pre.to_string() + "{"))
        .replace("{suf}", &("}".to_string() + suf))
}

pub fn set_base_prompt(prompt: &str) {
    *(BASE_PROMPT.lock().unwrap()) = prompt.to_string();
}
