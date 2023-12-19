import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { getAllPosts } from '../utils/data/postData';
import PostCard from '../components/postCard';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  return (
    <div className="posts">
      <div className="logo-title">
        <Image className="logo" src="https://pics.craiyon.com/2023-12-15/s_fOctGjRkClCHCQULy5ww.webp" />
        <h1 className="breaddit">Breaddit</h1>
        <Link passHref href="/posts/new">
          <Button className="title-button">Create Post</Button>
        </Link>
      </div>
      {posts && posts.map((post) => <PostCard post={post} />)}
    </div>
  );
}

export default Home;
