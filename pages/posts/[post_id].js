import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../utils/data/postData';
import CommentCard from '../../components/commentCard';

export default function ViewPost() {
  const router = useRouter();
  const { post_id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    getSinglePost(post_id).then(setPost);
  }, [post_id]);

  return (
    <div className="view-post">
      <img className="view-post-img" src={`${post.image_url}`} />
      <h2 className="view-post-title">{post.title}</h2>
      <p className="view-post-author">
        Created By: {post.user.first_name} {post.user.last_name} on {post.publication_date}
      </p>
      {post.comments && post.comments.map((comment) => <CommentCard comment={comment} />)}
      <div className="view-post-tags">
        {post.tags.map((tag) => {
          return <p className="view-post-tag">{tag.label}</p>;
        })}
      </div>
    </div>
  );
}
