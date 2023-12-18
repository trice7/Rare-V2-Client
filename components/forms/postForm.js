import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllCategories } from '../../utils/data/categoryData';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../utils/data/postData';
import { useRouter } from 'next/router';

export default function PostForm({ postObj }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const [formData, setFormData] = useState({
    categoryId: 1,
    uid: user.uid,
    title: '',
    imageUrl: '',
    content: '',
    approved: true,
  });

  useEffect(() => {
    if (postObj && postObj.id) {
      setFormData({ categoryId: postObj.category.id, uid: user.uid, title: postObj.title, imageUrl: postObj.image_url, content: postObj.content, approved: true });
    }
  }, [postObj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postObj && postObj.id) {
      await updatePost(postObj.id, formData);
      router.push('/');
    } else {
      createPost(formData).then(() => {
        router.push(`/`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control value={formData.title} as="textarea" name="title" required placeholder="Enter a title for your post" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Content</Form.Label>
        <Form.Control value={formData.content} as="textarea" name="content" required placeholder="Add some text to your post" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Image URL</Form.Label>
        <Form.Control value={formData.imageUrl} as="textarea" name="imageUrl" required placeholder="Enter a url for your post image" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Label>Category</Form.Label>
        <Form.Select value={formData.value} name="categoryId" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}>
          {categories &&
            categories.map((category) => {
              return (
                <option key={`category${category.id}`} value={category.id}>
                  {category.label}
                </option>
              );
            })}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        {postObj?.id ? 'Update' : 'Submit'}
      </Button>
    </Form>
  );
}
