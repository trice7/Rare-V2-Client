import Card from 'react-bootstrap/Card';

export default function CommentCard({ comment }) {
  return (
    <>
      <Card className="comment-card">
        <Card.Body>{comment.content}</Card.Body>
        <Card.Body>{/* Created by: <strong>{comment.author.username}</strong> on <em>{comment.created_on}</em> */}</Card.Body>
      </Card>
    </>
  );
}
