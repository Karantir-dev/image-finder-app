export default function Modal({ largeImage, onCloseModal }) {
  return (
    <div className="Overlay" onClick={onCloseModal}>
      <div className="Modal">
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
}
