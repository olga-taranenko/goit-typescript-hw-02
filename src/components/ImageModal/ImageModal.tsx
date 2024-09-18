// import css from "./ImageModal.module.css"
import Modal from "react-modal";

type ModalProps = {
  isOpen: boolean;
  urlModal: string;
  altModal: string;
  closeModal: () => void;
};

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, urlModal, altModal, closeModal }: ModalProps) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(180, 180, 180, 0.2)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <img src={urlModal} alt={altModal} />
      </Modal>
    </div>
  );
};

export default ImageModal;
