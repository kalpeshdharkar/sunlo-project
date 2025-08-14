import React from 'react';

const categories = ['Hindi', 'Marathi', 'English', 'Romantic', 'Lofi', 'Workout'];

const CategoryFilter = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, idx) => (
        <button
          key={idx}
          className="px-4 py-1 bg-pink-600 rounded-full text-sm hover:bg-pink-500 transition"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
