import { useEffect, useState } from 'react';
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
        <img className="logo" src="https://www.craiyon.com/image/79IpA6paSDasjDLwaDQARA" />
        <h1 className="breaddit">Breaddit</h1>
      </div>
      {posts && posts.map((post) => <PostCard post={post} />)}
    </div>
  );
}

export default Home;
