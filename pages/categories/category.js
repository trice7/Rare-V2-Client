import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAllCategories } from '../../utils/data/categoryData';
import CategoryCard from '../../components/categoryCard';

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
      <h3>Categories</h3>
      <Link passHref href="/categories/new">
        <Button>Create Category</Button>
      </Link>
      {categories.map((category) => <CategoryCard key={category.id} category={category} onUpdate={getCategories} />)}
    </div>
  );
}

export default Category;
