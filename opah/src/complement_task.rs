pub trait ComplementTask{
    fn get_chunk(&self)-> &str;
}

pub fn create(kind: &str, src: &str, o_file_path: &str) -> Box<dyn ComplementTask>{
    match kind{
        "PASSTHRU" => Box::new(PassThru {
            code: src.to_string(),
            filename: o_file_path.to_string()
        }),

        "COMPLEMENT" => Box::new(Complement {
            prompt: src.to_string(),
            filename: o_file_path.to_string()
        }),

        _ => panic!("Invalid Task.")
    }
}

struct Complement{
    prompt: String,
    filename: String,
}

//Pass Through (I abbreviate it)
struct PassThru{
    code: String,
    filename: String,
}

impl ComplementTask for PassThru{
    fn get_chunk(&self) -> &str{
        &(self.code)
    }
}

impl ComplementTask for Complement {
    fn get_chunk(&self) -> &str {
        "/* Placeholder */"
    }
}