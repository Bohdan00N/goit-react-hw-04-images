import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './searchbar.module.scss';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton} aria-label="Submit">
            <span className="SearchFormButtonLabel">Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            value={this.state.imageName}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;