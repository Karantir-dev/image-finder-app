import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ photosArr, onClickPhoto }) {
  return (
    <ul className="ImageGallery">
      {photosArr.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          photoUrl={webformatURL}
          largeImageURL={largeImageURL}
          onClickPhoto={onClickPhoto}
          tags={tags}
        />
      ))}
    </ul>
  );
}
