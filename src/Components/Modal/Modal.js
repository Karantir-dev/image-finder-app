import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Modal extends Component {
  onPressEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onPressEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressEscape);
  }

  onClickByOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  render() {
    const { largeImage, tags } = this.props;
    return (
      <div className="Overlay" onClick={this.onClickByOverlay}>
        <img className="ModalImg" src={largeImage} alt={tags} />
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string,
  onCloseModal: PropTypes.func,
};
