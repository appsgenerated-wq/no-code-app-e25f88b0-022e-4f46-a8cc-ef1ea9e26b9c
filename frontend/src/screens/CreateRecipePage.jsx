import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import recipeService from '../services/recipeService';
import Input from '../components/Input';
import Button from '../components/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const CreateRecipePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const ingredientsArray = ingredients.split('\n').filter(ing => ing.trim() !== '');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('instructions', instructions);
        formData.append('prepTime', prepTime);
        formData.append('cookTime', cookTime);
        ingredientsArray.forEach(ing => formData.append('ingredients[]', ing));
        if (image) {
            formData.append('imageUrl', image);
        }

        try {
            await recipeService.createRecipe(formData);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create recipe. Please check your inputs.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a New Recipe</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input label="Recipe Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Prep Time (minutes)" type="number" value={prepTime} onChange={e => setPrepTime(e.target.value)} />
                            <Input label="Cook Time (minutes)" type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients (one per line)</label>
                            <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} rows="5" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                            <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows="8" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Image</label>
                            <input type="file" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading} size="lg">
                                {loading ? 'Creating...' : 'Create Recipe'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateRecipePage;
