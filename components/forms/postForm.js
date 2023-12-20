/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-for */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getAllCategories } from '../../utils/data/categoryData';
import { useAuth } from '../../utils/context/authContext';
import { createPost, getAllPosts, updatePost } from '../../utils/data/postData';
import { getAllTags } from '../../utils/data/tagData';
import { createPostTag, getAndDeleteAllPostTagsByPostId } from '../../utils/data/postTagsData';

export default function PostForm({ postObj }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [post, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  useEffect(() => {
    const checkedTagsArr = [];
    tags.forEach(() => {
      checkedTagsArr.push(false);
    });
    setCheckedTags(checkedTagsArr);
  }, [tags]);

  const [formData, setFormData] = useState({
    categoryId: 1,
    uid: user.uid,
    title: '',
    imageUrl: '',
    content: '',
    approved: true,
  });

  // const [currentPostTags, setCurrentPostTags] = useState([]);

  useEffect(() => {
    if (postObj && postObj.id) {
      setFormData({
        categoryId: postObj.category.id,
        uid: user.uid,
        title: postObj.title,
        imageUrl: postObj.image_url,
        content: postObj.content,
        approved: true,
      });
    }
  }, [postObj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArr = checkedTags.map((tag, index) => {
      if (tag === true) {
        return index;
      }
    });
    if (postObj && postObj.id) {
      await updatePost(postObj.id, formData);
      await getAndDeleteAllPostTagsByPostId(postObj.id);
      tagsArr.forEach(async (tag) => {
        await createPostTag({ postId: postObj.id, tagId: tag + 1 });
      });
      router.push('/');
    } else {
      createPost(formData).then((res) => {
        tagsArr.forEach(async (tag) => {
          await createPostTag({ postId: res.data.id, tagId: tag + 1 });
        });
      }).then(() => {
        router.push('/');
      });
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedTags.map((item, index) => (index === position ? !item : item));
    setCheckedTags(updatedCheckedState);
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
            categories.map((category) => (
              <option key={`category${category.id}`} value={category.id}>
                {category.label}
              </option>
            ))}
        </Form.Select>
        <legend>Post tags</legend>
        <div className="post-tags-checkboxes">
          {tags.map(({ id, label }, index) => (
            <>
              <input type="checkbox" id={id} value={id} name="postTags" checked={checkedTags[index]} onChange={() => handleOnChange(index)} />
              <label for={label}>{label}</label>
            </>
          ))}
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        {postObj?.id ? 'Update' : 'Submit'}
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.number,
    content: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
};
