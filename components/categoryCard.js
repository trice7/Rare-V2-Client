/* eslint-disable react/prop-types */
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { deleteCategory } from '../utils/data/categoryData';
import { useAuth } from '../utils/context/authContext';

function CategoryCard({ category, onUpdate }) {
  const { user } = useAuth();

  const deleteSingleCategory = () => {
    if (window.confirm(`Delete ${category.label}?`)) {
      deleteCategory(category.id, user.id).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Body>{category.label}</Card.Body>
      <Card.Footer>
        <Button variant="danger" onClick={deleteSingleCategory}>Delete</Button>
      </Card.Footer>
    </Card>
  );
}

export default CategoryCard;
