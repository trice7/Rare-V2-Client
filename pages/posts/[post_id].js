import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../utils/data/postData';
import CommentCard from '../../components/commentCard';
import { useAuth } from '../../utils/context/authContext';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import CommentBox from '../../components/commentBox';

export default function ViewPost() {
  const router = useRouter();
  const { post_id } = router.query;
  const [post, setPost] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(post_id).then(setPost);
  }, [post_id]);

  return (
    <div className="view-post">
      <img className="view-post-img" src={`${post.image_url}`} />
      <h2 className="view-post-title">{post.title}</h2>
      {post.user?.id === user.id ? (
        <Link passHref href={`/posts/edit/${post.id}`}>
          <Button type="button" variant="primary">
            Edit
          </Button>
        </Link>
      ) : (
        ''
      )}
      <p className="view-post-author">{/* Created By: {post.user.username} on {post.publication_date} */}</p>

      <div className="view-post-tags">
        {post.tags?.map((tag) => {
          return (
            <p key={`key${tag.id}`} className="view-post-tag">
              {tag.label}
            </p>
          );
        })}
      </div>
      <CommentBox setPost={setPost} postId={post_id} />
      {post.comments && post.comments.map((comment) => <CommentCard setPost={setPost} key={`comment${comment.id}`} comment={comment} />)}
    </div>
  );
}
