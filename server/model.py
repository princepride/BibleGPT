from transformers import AutoTokenizer, AutoModelForCausalLM
import os
from dotenv import load_dotenv
import anthropic
from openai import OpenAI

class LocalModel:
    def __init__(self) -> None:
        self.model_name_or_path = "TheBloke/zephyr-7B-beta-AWQ"

        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name_or_path)
        # Load model
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name_or_path).cuda()


    def generate(self, vectors, chatData):
        rag_context = '\n'.join([vector.metadata['book']+"第"+str(vector.metadata['chapter']+1)+"章："+vector.get_text() for vector in vectors])
        prompt = ''
        if len(chatData) >= 3:
            chat_history = [chatData[0]]+chatData[-2:]
        else:
            chat_history = chatData
        for d in chat_history:
            prompt += "<|"+d['agent']+"|>"
            prompt += d['content']
            if d['agent'] == 'system':
                prompt += '\n尽可能使用以下信息: '+ rag_context
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
            max_new_tokens=1000
        )

        token_output = generation_output[0]
        text_output = self.tokenizer.decode(token_output)
        return text_output[20+len(prompt):]
        
class ClaudeModel:
    def __init__(self):
        load_dotenv()
        self.client = anthropic.Anthropic(
            api_key=os.getenv("CLAUDE_API_KEY"),
        )

    def generate(self, vectors, chatData):
        rag_context = '\n'.join([vector.metadata['book']+"第"+str(vector.metadata['chapter']+1)+"章："+vector.get_text() for vector in vectors])
        prompt = []
        system = ''
        if len(chatData) >= 6:
            chat_history = [chatData[0]]+chatData[-5:]
        else:
            chat_history = chatData
        for d in chat_history:
            if d['agent'] == 'system':
                system = d['content']+'\n尽可能使用以下信息: '+ rag_context
            else:
                prompt.append({'role':d['agent'], 'content':d['content']})
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        print(prompt)
        message = self.client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1000,
            temperature=0.3,
            system=system,
            messages=prompt
        )
        return message.content[0].text
    
class ChatGPTModel:
    def __init__(self):
        load_dotenv()
        self.client = OpenAI(
            api_key=os.getenv("CHATGPT_API_KEY"),
        )

    def generate(self, vectors, chatData):
        rag_context = '\n'.join([vector.metadata['book']+"第"+str(vector.metadata['chapter']+1)+"章："+vector.get_text() for vector in vectors])
        prompt = []
        system = ''
        if len(chatData) >= 6:
            chat_history = [chatData[0]]+chatData[-5:]
        else:
            chat_history = chatData
        for d in chat_history:
            if d['agent'] == 'system':
                system = '你是一个用圣经帮助人答疑解惑的聊天机器人'
                prompt.append({'role':d['agent'], 'content':system})
            else:
                prompt.append({'role':d['agent'], 'content':d['content']})
        prompt[-1]['content'] += '请尽可能使用以下圣经中的信息回答user的问题: '+ rag_context
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        print(prompt)
        message = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=prompt
        )
        return message.choices[0].message.content
    
class AIYYDSModel:
    def __init__(self):
        load_dotenv()
        self.client = OpenAI(
            api_key=os.getenv("AI_YYDS"),
            base_url="https://ai-yyds.com/v1"
        )

    def generate(self, vectors, chatData):
        rag_context = '\n'.join([vector.metadata['book']+"第"+str(vector.metadata['chapter']+1)+"章："+vector.get_text() for vector in vectors])
        prompt = []
        system = ''
        if len(chatData) >= 6:
            chat_history = [chatData[0]]+chatData[-5:]
        else:
            chat_history = chatData
        for d in chat_history:
            if d['agent'] == 'system':
                system = '你是一个用圣经帮助人答疑解惑的聊天机器人'
                prompt.append({'role':d['agent'], 'content':system})
            else:
                prompt.append({'role':d['agent'], 'content':d['content']})
        prompt[-1]['content'] += '请尽可能使用以下圣经中的信息回答user的问题: '+ rag_context
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        print(prompt)
        message = self.client.chat.completions.create(
            model="claude-3-haiku-20240307",
            messages=prompt
        )
        return message.choices[0].message.content