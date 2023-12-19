import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createComment, updateComment } from '../utils/data/commentData';
import { useAuth } from '../utils/context/authContext';
import { getSinglePost } from '../utils/data/postData';

export default function CommentBox({
  postId,
  comment,
  setEditing,
  setPost,
  handleCommentDelete,
}) {
  const [commentText, setCommentText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (comment && comment.id) {
      setCommentText(comment.content);
    }
  }, [comment]);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentPayload = { authorId: user.id, postId, content: commentText };
    if (comment && comment.id) {
      updateComment(comment.id, commentPayload)
        .then(setEditing(false))
        .then(setCommentText(''))
        .then(() => {
          getSinglePost(postId).then(setPost);
        });
    } else {
      await createComment(commentPayload);
      setCommentText('');
      getSinglePost(postId).then(setPost);
    }
  };

  return (
    <div className="comment-box">
      <input value={commentText} onChange={handleChange} placeholder={comment?.id ? `${comment.content}` : 'Make a comment!'} type="textarea" className="comment-input" />
      <Button size="sm" variant="primary" onClick={handleSubmit}>
        Save
      </Button>
      {comment && comment.id ? (
        <Button variant="danger" onClick={handleCommentDelete}>
          Delete
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}

CommentBox.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }).isRequired,
  postId: PropTypes.number.isRequired,
  setEditing: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  handleCommentDelete: PropTypes.func.isRequired,
};
