import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
import pixabayFetch from './services/pixabayAPI';

import './App.css';

export default class App extends Component {
  state = {
    photos: [],
    searchQuery: '',
    status: 'idle',
    // pending, rejected, resolved
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      pixabayFetch(this.state.searchQuery)
        .then(response => {
          console.log(response);
          this.setState(state => ({
            photos: response.hits,
          }));
        })
        .catch(err => console.log(err));
    }
  }

  onSubmitSearchQuery = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  // fetchPhotos = () => {
  //   const { searchQuery } = this.state;
  // };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmitSearchQuery} />
        <ImageGallery photosArr={this.state.photos} />
        <Modal />
        {/* <Loader/> */}
        {this.state.photos.length > 0 && <Button />}
        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}
