import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const modalToggle = () => setIsModalOpen(!isModalOpen);

  return { isModalOpen, openModal, closeModal, modalToggle };
};

export default useModal;
