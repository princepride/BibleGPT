from transformers import AutoTokenizer, AutoModelForCausalLM
import anthropic

class LocalModel:
    def __init__(self) -> None:
        self.model_name_or_path = "TheBloke/zephyr-7B-beta-AWQ"

        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name_or_path)
        # Load model
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name_or_path).cuda()


    def generate(self, vectors, chatData):
        prompt = '\n'.join([vector.get_text() for vector in vectors])
        prompt += '\n请参考上面的圣经内容，尽可能的用圣经的故事来解答<|user|>的问题\n'
        for d in chatData[-3:]:
            prompt += "<|"+d['agent']+"|>"
            prompt += "<|"+d['content']+"|>"
            prompt += "</s>"
        token_input = self.tokenizer(
            prompt,
            return_tensors='pt'
        ).input_ids.cuda()

        # Generate output
        generation_output = self.model.generate(
            token_input,
            do_sample=True,
            temperature=0.3,
            top_p=0.95,
            top_k=40,
            max_new_tokens=512
        )

        token_output = generation_output[0]
        text_output = self.tokenizer.decode(token_output)
        return text_output[20+len(prompt):]

    