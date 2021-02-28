import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Показать ещё
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
