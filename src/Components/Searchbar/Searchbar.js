import { toast } from 'react-toastify';
import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast('Введите поисковый запрос.', { type: 'warning' });
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}
