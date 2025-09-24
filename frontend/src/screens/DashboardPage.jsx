import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import recipeService from '../services/recipeService';
import Button from '../components/Button';
import RecipeCard from '../components/RecipeCard';
import { PlusIcon } from '@heroicons/react/24/solid';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await recipeService.getAllRecipes();
        setRecipes(data || []);
      } catch (err) {
        setError('Failed to fetch recipes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    FlavorFusion
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">Welcome, {user?.name}!</span>
                    <Button onClick={logout} variant="secondary" size="sm">Logout</Button>
                </div>
            </div>
        </header>

        <main className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Recipes Dashboard</h1>
                    <Link to="/create-recipe">
                        <Button>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Create Recipe
                        </Button>
                    </Link>
                </div>

                {loading && <p className="text-center text-gray-500">Loading recipes...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && (
                    recipes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center bg-white p-12 rounded-lg shadow-sm">
                            <h3 className="text-xl font-medium text-gray-900">No recipes yet!</h3>
                            <p className="mt-2 text-gray-500">Be the first one to create a recipe.</p>
                            <div className="mt-6">
                                <Link to="/create-recipe">
                                    <Button>
                                        Create Your First Recipe
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )
                )}
            </div>
        </main>
    </div>
  );
};

export default DashboardPage;
