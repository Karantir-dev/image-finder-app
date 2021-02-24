import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ photosArr }) {
  return (
    <ul className="ImageGallery">
      {photosArr.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem key={id} photoUrl={webformatURL} />
      ))}
    </ul>
  );
}
