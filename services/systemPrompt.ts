export const RECIPE_PROMPTS = {
  GENERATE_RECIPE_OPTION_PROMPT: `Depends on user instruction create 3 different Recipe variants with Racipe Name as recipe_name with a Emoji text, 2 line description as description and main ingredients list in a json format with valid recipename , description, ingredients (without size) only.`,
  GENERNATE_COMPLE_RECIPE_PROMPT: `
    - As per recipe Name and Description, Give me all list of ingredients as ingredient ,
    - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps
    - Total Calories as calories (only number), Minutes to cook as cookTime and serving number as serveTo
    - relastic image Text prompt as per reciepe as imagePrompt
    - Give me Category List for recipe from [Breakfast,Lunch,Cake,Desserts,Chinese,Healthy,Fastfood,Drinks] as category
    - Give me response in JSON format only'
    `,
};
