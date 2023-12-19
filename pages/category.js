import { useEffect, useState } from 'react';
import { getAllCategories } from '../utils/data/categoryData';
import CategoryCard from '../components/categoryCard';

function Category() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((data) => setCategories(data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {categories.map((category) => <CategoryCard key={category.id} category={category} onUpdate={getCategories} />)}
    </div>
  );
}

export default Category;
