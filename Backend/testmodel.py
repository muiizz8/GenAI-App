from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams


credentials = Credentials (

    url = "https://eu-de.ml.cloud.ibm.com",
    api_key = "your watsonx api key"

)

params = {
    GenParams.DECODING_METHOD: "greedy",
    GenParams.MAX_NEW_TOKENS:200
}

model = ModelInference (
    model_id = "meta-llama/llama-2-13b-chat",
    credentials = credentials,
    params = params,
    project_id = "your project_id"
)

text = """what is the capital of France?"""

print(model.generate(text)['results'][0]['generated_text'])

