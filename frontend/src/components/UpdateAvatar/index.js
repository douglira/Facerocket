import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Dropzone from 'react-dropzone';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';

import { connect } from 'react-redux';
import { Creators as UserActions } from 'store/ducks/user';

import { Container, ModalContainer } from './styles';

class UpdateAvatar extends Component {
  static propTypes = {
    updateProfileRequest: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    onAvatarHover: false,
    modalVisible: false,
    image: null,
    filename: '',
    src: '',
    pixelCrop: {},
    crop: {
      x: 10,
      y: 10,
      width: 64,
      height: 64,
      aspect: 1,
    },
  };

  onDrop = (file) => {
    this.setState({ src: file[0].preview, filename: file[0].name, modalVisible: true });
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop, pixelCrop) => {
    this.setState({ pixelCrop });
  };

  onImageLoaded = (image) => {
    this.setState({
      image,
      crop: makeAspectCrop(
        {
          x: 25,
          y: 0,
          aspect: 1,
          width: 64,
        },
        image.width / image.height,
      ),
    });
  };

  onAvatarHover = () => {
    this.setState({ onAvatarHover: true });
  };

  onAvatarLeave = () => {
    this.setState({ onAvatarHover: false });
  };

  handleOk = () => {
    const { pixelCrop, image, filename } = this.state;
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );
    canvas.toBlob((blob) => {
      let avatar = blob;
      avatar = new File([avatar], filename, { type: 'image/jpeg' });
      avatar.preview = URL.createObjectURL(avatar);

      const form = new FormData();
      form.append('avatar', avatar);

      this.props.updateProfileRequest(form);
    }, 'image/jpeg');

    this.setState({ modalVisible: false });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <Container
        className="dropzone"
        hover={this.state.onAvatarHover}
        onMouseOver={this.onAvatarHover}
        onFocus={this.onAvatarHover}
        onMouseLeave={this.onAvatarLeave}
      >
        <Dropzone onDrop={this.onDrop} multiple={false}>
          {this.props.children}
        </Dropzone>
        <span>Alterar foto</span>
        <Modal visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <ModalContainer>
            {this.state.src && (
              <ReactCrop
                src={this.state.src}
                crop={this.state.crop}
                onChange={this.onCropChange}
                onComplete={this.onCropComplete}
                onImageLoaded={this.onImageLoaded}
              />
            )}
          </ModalContainer>
        </Modal>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateProfileRequest: form => dispatch(UserActions.updateProfileRequest(form)),
});

export default connect(
  null,
  mapDispatchToProps,
)(UpdateAvatar);
