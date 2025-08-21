from langchain_ibm import ChatWatsonx
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from config import params, llama3_model_id, Granite_model_id, Mistral_model_id, watsonx_api_key

# Define JSON output structure
class AIResponse(BaseModel):
	summary: str = Field(description="Summary of the user's message")
	sentiment: int = Field(description="Sentiment score from 0 (negative) to 100 (positive)")
	response: str = Field(description="Suggested response to the user")

# JSON output parser
json_parser = JsonOutputParser(pydantic_object=AIResponse)

# Function to initialize a model
def initialize_model(model_id):
	return ChatWatsonx(
		model_id=model_id,
		url="https://eu-de.ml.cloud.ibm.com",
		project_id="your project_id",  # Replace with your actual project ID,
		apikey=watsonx_api_key,
		params=params,
	)

# Initialize models
llama3_llm = initialize_model(llama3_model_id)
granite_llm = initialize_model(Granite_model_id)
mistral_llm = initialize_model(Mistral_model_id)

# Prompt templates
llama3_template = PromptTemplate(
	template='''<|begin_of_text|><|start_header_id|>system<|end_header_id|>
{system_prompt}\n{format_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>
{user_prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>
''',
	input_variables=["system_prompt", "format_prompt", "user_prompt"]
)
granite_template = PromptTemplate(
	template="System: {system_prompt}\n{format_prompt}\nHuman: {user_prompt}\nAI:",
	input_variables=["system_prompt", "format_prompt", "user_prompt"]
)
mixtral_template = PromptTemplate(
	template="<s>[INST]{system_prompt}\n{format_prompt}\n{user_prompt}[/INST]",
	input_variables=["system_prompt", "format_prompt", "user_prompt"]
)

def get_ai_response(model, template, system_prompt, user_prompt):
	chain = template | model | json_parser
	return chain.invoke({'system_prompt': system_prompt, 'user_prompt': user_prompt, 'format_prompt': json_parser.get_format_instructions()})

# Model-specific response functions
def llama3_response(system_prompt, user_prompt):
	return get_ai_response(llama3_llm, llama3_template, system_prompt, user_prompt)

def granite_response(system_prompt, user_prompt):
	return get_ai_response(granite_llm, granite_template, system_prompt, user_prompt)

def mistral_response(system_prompt, user_prompt):
	return get_ai_response(mistral_llm, mixtral_template, system_prompt, user_prompt)