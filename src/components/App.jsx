import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGalerry';
import ImageGalleryItem from './ImageGalerryItem/ImageGalerryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FETCH_STATUS } from '../FetchStatus/FetchStatus';
import { loadImage } from './Loader/Loader';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [imageList, setImageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentHits, setCurrentHits] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.start);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await loadImage({
          q: imageName,
          page: currentPage,
        });

        if (response.totalHits > 0) {
          if (currentPage === 1) {
            Notify.success(`${response.totalHits} images were founded.`);
          }
          setImageList(prev => [...prev, ...response.hits]);
          setTotalHits(response.totalHits);
          setCurrentHits(prev => prev + response.hits.length);

          if (response.totalHits > 12) {
            setStatus(FETCH_STATUS.fullfilled);
          }
        }
        if (response.totalHits === 0) {
          Notify.failure('There are no images matching your search query.');
        }
      } catch (error) {
        console.log(error);
        setStatus(FETCH_STATUS.rejected);
      }
    };

    if (imageName !== '' || currentHits !== totalHits) {
      setStatus(FETCH_STATUS.loading);

      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName, currentPage]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImageList([]);
    setCurrentPage(1);
    setCurrentHits(null);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleOpenModal = e => {
    const { name, alt } = e.target;
    if ((name, alt)) {
      setIsOpenModal(true);
      setModalImg(name);
      setAlt(alt);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setModalImg('');
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery>
        <ImageGalleryItem ImgList={imageList} onOpenModal={handleOpenModal} />
      </ImageGallery>
      {status === FETCH_STATUS.fullfilled ? (
        <Button
          loadNextPage={handleLoadMore}
          disabled={currentHits === totalHits}
        />
      ) : (
        <></>
      )}

      {isOpenModal && (
        <Modal bigImage={modalImg} alt={alt} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
