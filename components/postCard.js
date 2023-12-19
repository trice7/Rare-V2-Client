import Link from 'next/link';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function PostCard({ post }) {
  return (
    <div className="post-container">
      <Card className="post-card">
        <Card.Img className="post-card-img" src={post.image_url} />
        <Card.Body>
          <Card.Text>
            <Link passHref href={`posts/${post.id}`}>
              <h3 className="post-card-title">{post.title}</h3>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    image_url: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};
