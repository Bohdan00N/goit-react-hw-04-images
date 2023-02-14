import PropTypes from 'prop-types';
import css from './imageGalerryItem.module.scss';


function ImageGalleryItem({ ImgList = [], onOpenModal }) {
  let elements = ImgList.map(element => {
    const { id, tags, webformatURL, largeImageURL } = element;

    return (
      <li key={id} className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          name={largeImageURL}
          alt={tags}
          onClick={onOpenModal}
          className={css.ImageGalleryItemImage}
        />
      </li>
    );
  });

  return <>{elements}</>;
}

ImageGalleryItem.propTypes = {
  ImgList: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;