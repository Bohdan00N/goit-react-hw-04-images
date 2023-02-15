import propTypes from 'prop-types';
import css from './modal.module.scss';
import { useEffect } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const Modal = ({ bigImage, alt, onCloseModal }) => {
  useEffect(() => {
    const closeBtnEscBackdrop = ({ target, code, currentTarget }) => {
      if (target === currentTarget || code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', closeBtnEscBackdrop);
    return () => {
      window.removeEventListener('keydown', closeBtnEscBackdrop);
    };
  }, [onCloseModal]);
  
  Loading.hourglass({
    svgColor: 'blue',
  });
  Loading.remove(350);
  return (
    <div className={css.Overlay} onClick={onCloseModal}>
      <div className={css.Modal}>
        <img src={bigImage} name="" alt={alt} width="800" height="600" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  bigImage: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  onCloseModal: propTypes.func.isRequired,
};
export default Modal;
