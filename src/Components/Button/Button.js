export default function Button({ onClick }) {
  return (
    <button className="Button loadMore" type="button" onClick={onClick}>
      Показать ещё
    </button>
  );
}
