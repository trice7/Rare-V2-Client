/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { XCircle, PencilFill } from 'react-bootstrap-icons';
import CommentBox from './commentBox';
import { useAuth } from '../utils/context/authContext';
import { deleteComment } from '../utils/data/commentData';
import { getSinglePost } from '../utils/data/postData';

export default function CommentCard({ comment, setPost }) {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);

  const handleCommentDelete = () => {
    if (window.confirm('Delete your comment?')) {
      deleteComment(comment.id)
        .then(() => getSinglePost(comment.post))
        .then(setPost);
    }
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
                <div className="comment-buttons">
                  <XCircle className="del-svg" type="button" onClick={handleCommentDelete} />
                  <PencilFill type="button" onClick={handleEditing} />
                </div>
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

CommentCard.propTypes = {
  comment: PropTypes.shape({
    post: PropTypes.number,
    author: PropTypes.number,
    content: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  setPost: PropTypes.func.isRequired,
};
