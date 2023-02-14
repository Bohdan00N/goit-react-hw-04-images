import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGallery.module.scss';

function ImageGallery({ children }) {
  return <ul className={css.imageGallery}>{children}</ul>;
}

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;