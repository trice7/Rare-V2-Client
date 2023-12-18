import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/forms/postForm';

export default function EditPost() {
  const router = useRouter();
  const { post_id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    getSinglePost(post_id).then(setPost);
  }, [post_id]);

  return <PostForm postObj={post} />;
}
