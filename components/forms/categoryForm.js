/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createCategory } from '../../utils/data/categoryData';

export default function PostForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    label: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCategory(formData, user.id).then(() => {
      router.push('/categories/category');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Label</Form.Label>
        <Form.Control value={formData.label} as="textarea" name="label" required placeholder="Enter Label for category" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
