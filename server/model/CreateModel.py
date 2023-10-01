from db import db
import openai
openai.api_key = ""

class CreateModel:
	def prompt_gpt(self, messages, temperature):
		try:
			#message_tokens = self.num_tokens_from_string('testing', 'gpt-3.5-turbo')
			#print(message_tokens);
			# Set the desired maximum token limit
			max_tokens = 2048  # Adjust as per your model's limit

			# Check if the total token count exceeds the limit
			#if message_tokens > max_tokens:
			#	raise ValueError("Total token count exceeds the maximum limit.")

			response = openai.ChatCompletion.create(
				model= 'gpt-3.5-turbo',
				messages=messages,
				temperature=temperature if temperature else 0.5,
				max_tokens=max_tokens
			)['choices'][0]['message']['content']

			return response
		except ValueError as e:
			return 'Error: {}'.format(str(e))
		except:
			return 'An error occured on chatcompletion'

	def create(self, currentRecipes, inventory):
		recipe = self.prompt_gpt([
			{"role": "system", "content": "You are a renowned chef and recipe expert."},
			{"role": "system", "content": "Your mission is to provide delicious recipes to users based on the ingredients they have at home."},
			{"role": "system", "content": "You will receive a list of ingredients, and you need to suggest at least 7 different recipes using these ingredients."},
			{"role": "system", "content": 'Your response should be a javascript array of objects, json parsable like this: [{"id": "random id", "name": "Recipe Name", "description": "Description of the recipe", "execution": "Detailed steps formatted in HTML code", "ingredients": "HTML code with quantities"}], properly JSON formatted. and no other extra text from you.'},
			{"role": "user", "content": f"Here are the ingredients I have: `{inventory}`."} if len(inventory) > 0 else {"role": "user", "content": "I have no specific ingredients; surprise me with your best recipes!"},
			{"role": "user", "content": f"Please provide 5 or more unique recipes. different from these ones: {currentRecipes}"},
			{"role": "user", "content": "Remember to format your response as described. Nothing more from you. Only the requested format."},
			{"role": "user", "content": "Make the response json valid. Only the requested format. Nothing else should be returned."},
		], 0.5)
		
		return recipe