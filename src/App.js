import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
import Loader from 'react-loader-spinner';
import pixabayFetch from './services/pixabayAPI';

import './App.css';

export default class App extends Component {
  state = {
    photos: [],
    searchQuery: '',
    status: 'idle',
    pageNumber: 1,
    modalShown: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState(() => {
        return { photos: [] };
      });

      this.fetchPhotos();
    }
  }

  fetchPhotos = () => {
    const { searchQuery, pageNumber } = this.state;

    this.setState(() => {
      return { status: 'pending' };
    });

    return pixabayFetch(searchQuery, pageNumber)
      .then(({ hits }) => {
        this.setState(prevState => {
          return { photos: [...prevState.photos, ...hits] };
        });

        if (hits.length === 0) {
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
      .catch(err => console.log(err))
      .finally(() => {
        this.setState(prevState => ({
          pageNumber: prevState.pageNumber + 1,
        }));

        // window.scrollTo({
        //   top: document.documentElement.scrollHeight,
        //   behavior: 'smooth',
        // });
      });
  };

  onSubmitSearchQuery = searchQuery => {
    this.setState({ searchQuery, pageNumber: 1 });
  };

  onClickPhoto = e => {
    const clickedPhoto = this.state.photos.find(
      photo => photo.webformatURL === e.target.src,
    );
    const { largeImageURL, tags } = clickedPhoto;
    this.setState({ modalShown: true, largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ modalShown: false });
  };

  render() {
    const { status, photos, tags, largeImageURL, modalShown } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSubmitSearchQuery} />

        <ImageGallery photosArr={photos} onClickPhoto={this.onClickPhoto} />

        {status === 'pending' && (
          <div className="Loader">
            <Loader type="Circles" color="#00BFFF" height={80} width={80} />
          </div>
        )}

        {status === 'resolved' && <Button onClick={this.fetchPhotos} />}

        {modalShown && (
          <Modal
            tags={tags}
            largeImage={largeImageURL}
            closeModal={this.closeModal}
          />
        )}

        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}
