import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
// import Stack from 'react-bootstrap/Stack';

const TagBox = ({ tag }) => (
  <Badge bg="info">{tag.label}</Badge>
);

TagBox.propTypes = {
  tag: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};

export default TagBox;
