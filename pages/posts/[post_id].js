/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Stack } from 'react-bootstrap';
import Link from 'next/link';
import { PencilFill, XCircle } from 'react-bootstrap-icons';
import TagBox from '../../components/TagBadge';
import { deletePost, getSinglePost } from '../../utils/data/postData';
import CommentCard from '../../components/commentCard';
import { useAuth } from '../../utils/context/authContext';
import CommentBox from '../../components/commentBox';

export default function ViewPost() {
  const router = useRouter();
  const { post_id } = router.query;
  const [post, setPost] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(post_id).then(setPost);
  }, [post_id]);

  const handleDelete = () => {
    if (window.confirm('Delete your post?')) {
      deletePost(post_id).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <div className="view-post">
      <Card>
        <Card.Header>
          <Card.Title>{post.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Img src={post.image_url} />
          <Card.Text>
            {post.content}
          </Card.Text>
          {post.user?.id === user.id ? (
            <>
              <Link passHref href={`/posts/edit/${post.id}`}>
                <PencilFill type="button" />
              </Link>
              <XCircle className="del-svg" type="button" onClick={handleDelete} />
            </>
          ) : (
            ''
          )}
        </Card.Body>
        <Card.Footer>
          <Stack direction="horizontal" gap={2}>
            {post.tags?.map((tag) => (
              <TagBox key={tag.id} tag={tag} />
            ))}
          </Stack>
        </Card.Footer>
      </Card>
      <p className="view-post-author">{/* Created By: {post.user.username} on {post.publication_date} */}</p>

      {/* <div className="view-post-tags">
        {post.tags?.map((tag) => (
          <p key={`key${tag.id}`} className="view-post-tag">
            {tag.label}
          </p>
        ))}
      </div> */}
      <CommentBox setPost={setPost} postId={post_id} />
      {post.comments && post.comments.map((comment) => <CommentCard setPost={setPost} key={`comment${comment.id}`} comment={comment} />)}
    </div>
  );
}
