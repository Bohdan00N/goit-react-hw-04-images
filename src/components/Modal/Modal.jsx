import propTypes from 'prop-types';
import css from './modal.module.scss';
import { Component } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeBtnEscBackdrop);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeBtnEscBackdrop);
  }
  closeBtnEscBackdrop = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    Loading.hourglass({
      svgColor: 'blue',
    });
Loading.remove();
    return (
      <div className={css.Overlay} onClick={this.closeBtnEscBackdrop}>
        
        <div className={css.Modal}>
          <img
            src={this.props.bigImage}
            name=""
            alt=""
            width="800"
            height="600"
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  bigImage: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  onCloseModal: propTypes.func.isRequired,
};
