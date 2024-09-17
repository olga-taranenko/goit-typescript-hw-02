// import css from "./ImageModal.module.css"
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overlay: { backgroundColor: "rgba(180, 180, 180, 0.2)" },
  },
};

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, urlModal, altModal, closeModal }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <img src={urlModal} alt={altModal} />
      </Modal>
    </div>
  );
};

export default ImageModal;
