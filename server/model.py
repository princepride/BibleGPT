from typing import List
from transformers import AutoTokenizer, AutoModelForCausalLM

class Model:
    def __init__(self) -> None:
        self.model_name_or_path = "TheBloke/zephyr-7B-beta-AWQ"

        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name_or_path)
        # Load model
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name_or_path).cuda()


    def generate(self, prompts:List[List[str]]) -> str:
        combine_prompt = ""
        for prompt in prompts:
            for sentence in prompt:
                combine_prompt += sentence
            combine_prompt += "</s>"
        
        token_input = self.tokenizer(
            combine_prompt,
            return_tensors='pt'
        ).input_ids.cuda()

        # Generate output
        generation_output = self.model.generate(
            token_input,
            do_sample=True,
            temperature=0.7,
            top_p=0.95,
            top_k=40,
            max_new_tokens=512
        )

        # Get the tokens from the output, decode them, print them
        token_output = generation_output[0]
        text_output = self.tokenizer.decode(token_output)
        return text_output.replace(combine_prompt, "")