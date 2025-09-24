import React from 'react';
import config from '../constants';
import { ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const RecipeCard = ({ recipe }) => {
  const imageUrl = recipe.imageUrl ? `${config.BACKEND_URL}${recipe.imageUrl}` : 'https://via.placeholder.com/400x300.png?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img src={imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{recipe.description.substring(0, 100)}...</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4 mt-auto">
            <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
                <UserCircleIcon className="h-4 w-4 mr-1" />
                <span>{recipe.User?.name || 'Unknown Author'}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
