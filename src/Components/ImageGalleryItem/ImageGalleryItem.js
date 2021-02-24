export default function ImageGalleryItem({ photoUrl, onClick }) {
  return (
    <li className="ImageGalleryItem" onClick={onClick}>
      <img src={photoUrl} alt="" className="ImageGalleryItem-image" />
    </li>
  );
}
