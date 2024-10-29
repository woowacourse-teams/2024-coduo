import { useState } from 'react';

const useModal = (defaultValue: boolean = false) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValue);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const modalToggle = () => setIsModalOpen(!isModalOpen);

  return { isModalOpen, openModal, closeModal, modalToggle };
};

export default useModal;
