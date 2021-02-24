import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
import Loader from 'react-loader-spinner';
// import pixabayFetch from './services/pixabayAPI';

import './App.css';

export default class App extends Component {
  state = {
    photos: [],
    searchQuery: '',
    status: 'idle',
    pageNumber: 0,
    // pending, rejected, resolved
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ photos: [], pageNumber: 0 });

      this.fetchPhotos();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onSubmitSearchQuery = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  fetchPhotos = () => {
    const { searchQuery, pageNumber } = this.state;
    const KEY = '19409083-c44dedced2b14f118a69bc1b1';
    const BASE_URL = 'https://pixabay.com/api/';

    this.setState({ pageNumber: pageNumber + 1, status: 'pending' });

    return fetch(
      `${BASE_URL}?q=${searchQuery}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Что-то пошло не так =('));
      })
      .then(response => {
        this.setState(prevState => ({
          photos: [...prevState.photos, ...response.hits],
        }));
        console.log(this.state.photos);
        if (response.hits.length === 0) {
          toast(`Не нашли картинок по запросу: ${searchQuery}`, {
            type: 'warning',
          });

          this.setState({ status: 'rejected' });

          return Promise.reject(
            new Error(`Не нашли картинок по запросу: ${searchQuery}`),
          );
        }

        this.setState({ status: 'resolved' });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { status, photos } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSubmitSearchQuery} />

        <ImageGallery photosArr={photos} />

        {status === 'pending' && (
          <div className="Loader">
            <Loader type="Circles" color="#00BFFF" height={80} width={80} />
          </div>
        )}

        {status === 'resolved' && <Button onClick={this.fetchPhotos} />}

        <Modal />

        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}
