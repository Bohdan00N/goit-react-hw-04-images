import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './searchbar.module.scss';

const Searchbar = ({onSubmit}) => {
  const [imageName, setImageName] = useState('');

  const handleChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
          aria-label="Submit"
        >
          <span className="SearchFormButtonLabel">Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          value={imageName}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
