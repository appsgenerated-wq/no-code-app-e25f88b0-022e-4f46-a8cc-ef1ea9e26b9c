import apiService from './apiService';

const recipeService = {
  getAllRecipes() {
    return apiService.get('/recipes');
  },
  getRecipeById(id) {
    return apiService.get(`/recipes/${id}`);
  },
  createRecipe(recipeData) {
    // recipeData is expected to be FormData
    return apiService.post('/recipes', recipeData);
  },
  updateRecipe(id, recipeData) {
    // recipeData is expected to be FormData
    return apiService.put(`/recipes/${id}`, recipeData);
  },
  deleteRecipe(id) {
    return apiService.delete(`/recipes/${id}`);
  },
};

export default recipeService;
