import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CommentBox from './commentBox';
import { useAuth } from '../utils/context/authContext';
import { useState } from 'react';
import { deleteComment } from '../utils/data/commentData';
import { getSinglePost } from '../utils/data/postData';

export default function CommentCard({ comment, setPost }) {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);

  const handleCommentDelete = () => {
    deleteComment(comment.id)
      .then(() => getSinglePost(comment.post))
      .then(setPost);
  };

  const handleEditing = () => {
    if (editing) {
      setEditing(false);
    }
    setEditing(true);
  };

  return (
    <>
      {!editing ? (
        <>
          <Card className="comment-card">
            <Card.Body>{comment.content}</Card.Body>
            <Card.Body>{/* Created by: <strong>{comment.author.username}</strong> on <em>{comment.created_on}</em> */}</Card.Body>
            {user.id === comment.author ? (
              <>
                <Button size="sm" variant="danger" onClick={handleCommentDelete}>
                  Delete
                </Button>
                <Button size="sm" variant="primary" onClick={handleEditing}>
                  Edit
                </Button>
              </>
            ) : (
              ''
            )}
          </Card>
        </>
      ) : (
        <CommentBox setPost={setPost} postId={comment.post} comment={comment} setEditing={setEditing} handleCommentDelete={handleCommentDelete} />
      )}
    </>
  );
}
