import Card from 'react-bootstrap/Card';

function CategoryCard({ category }) {
  return (
    <Card>
      <Card.Body>{category.label}</Card.Body>
    </Card>
  );
}

export default CategoryCard;
