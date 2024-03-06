import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { MdOutlineClose } from "react-icons/md";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, image, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      portalClassName={css.portal}
      overlayClassName={css.overlay}
      className={css.modal}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.overlay} onClick={closeModal}>
        <button className={css.button} onClick={closeModal}>
          <MdOutlineClose size={32} />
        </button>
        <div className={css.container}>
          <h2 className={css.title}>{image.alt_description}</h2>
          <p className={css.text}>Author: {image.user.name} </p>
          <img
            className={css.image}
            src={image.urls.regular}
            alt={image.alt_description}
          />
        </div>
      </div>
    </Modal>
  );
}
