import { useEffect, useState } from 'react';
import { getAllCategories } from '../utils/data/categoryData';
import CategoryCard from '../components/categoryCard';

function Category() {
  const [categoies, setCategoies] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategoies);
  }, []);

  return (
    <div>
      {categoies.map((category) => <CategoryCard category={category} />)}
    </div>
  );
}

export default Category;
