import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const getUserByEmail = (email: string) =>
  apiClient.get(`/user-lists?filters[email][$eq]=${email}`);

export const createNewUser = (userData: any) =>
  apiClient.post("/user-lists", { data: userData });

export const getCategoryList = () => apiClient.get("/categories?populate=*");
export const createNewRecipe = (data: any) =>
  apiClient.post("/recipes", {
    data: data,
  });
export const getRecipeByCategory = (category: string) =>
  apiClient.get("/recipes?filters[category][$containsi]=" + category);

export const getAllRecipeList = () => apiClient.get("/recipes?sort[0]=id:desc");
export const getAllRecipesByLimit = (limit: number) =>
  apiClient.get(
    "/recipes?sort[0]=id:desc&pagination[start]=0&pagination[limit]=" + limit
  );
export const getUserRecipes = (email: string) =>
  apiClient.get(
    "/recipes?filters[createdUser][$eq]=" + email + "&sort[0]=id:desc"
  );
export const saveRecipe = (data: any) =>
  apiClient.post("/user-favorites", { data: data });

export const removeFromSavedRecipe = (data: any) =>
  apiClient.delete("/user-favorites/" + data?.recipeDocId);

export const userSavedRecipe = (email: string) =>
  apiClient.get("/user-favorites?filters[email][$eq]=" + email);

export const getSavedRecipesByQuery = (query: any) =>
  apiClient.get("/recipes?" + query);
export const updateUser = (userId: number, updatedData: any) =>
  apiClient.put("/user-lists/" + userId, {
    data: updatedData,
  });

export const saveRecipeToDb = async (
  content: any,
  email?: string,
  imageUrl?: string
) => {
  const data = {
    ...content,
    imageUrl,
    createdUser: email,
  };
  const result = await createNewRecipe(data);
  return result.data.data;
};
