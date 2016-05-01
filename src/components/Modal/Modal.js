import React, { PropTypes } from 'react';
import { default as ReactModal } from 'react-modal';
import {
  newPostTop, pointer, newPostInputContainer,
  newPostInput, submitPostBtn, darkBtn
} from './styles.css';

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
}

const Modal = ({openModal, isOpen, closeModal, postText, isSubmitDisabled, updatePostText, user}) => {
  const submitPost = () => {
    console.log(postText, user)
  }
  return (
    <span className={darkBtn} onClick={openModal}>
    {'Post'}
      <ReactModal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal}>
        <div className={newPostTop}>
          <span>{'Compose new Post'}</span>
          <span onClick={closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newPostInputContainer}>
          <textarea
            onChange={(e) => updatePostText(e.target.value)}
            value={postText}
            maxLength={140}
            type='text'
            className={newPostInput}
            placeholder='write something' />
        </div>
        <button className={submitPostBtn}
          disable={isSubmitDisabled}
          onClick={submitPost}>
          {'Post'}
        </button>
      </ReactModal>
    </span>
  );
};

const { object, string, func, bool } = PropTypes;
Modal.propTypes = {
  postText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updatePostText: func.isRequired
}

export default Modal;
