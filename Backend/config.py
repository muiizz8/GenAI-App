from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams

# model parameters
params = {
    GenParams.DECODING_METHOD: "greedy",
    GenParams.MAX_NEW_TOKENS:200

}
# wastonx credentials
credentials = {
    "url":"https://eu-de.ml.cloud.ibm.com",
    "project_id":"your project_id",# Replace with your actual project ID
}

# model ids
llama3_model_id = "meta-llama/llama-3-3-70b-instruct"  
Granite_model_id = "ibm/granite-3-3-8b-instruct"    
Mistral_model_id = "mistralai/mistral-medium-2505"
watsonx_api_key = "your watsonx_api_key" # Replace with your actual API key