export default function ImageGalleryItem({ photoUrl, onClickPhoto, tags }) {
  return (
    <li className="ImageGalleryItem" onClick={onClickPhoto}>
      <img src={photoUrl} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}
