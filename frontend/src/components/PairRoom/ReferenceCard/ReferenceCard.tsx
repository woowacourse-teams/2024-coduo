import { useState } from 'react';

import { FaFilter } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import { css } from 'styled-components';

import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { Message } from '@/components/common/Input/Input.styles';
import { InputStatus } from '@/components/common/Input/Input.type';
import { Modal } from '@/components/common/Modal';
import { PairRoomCard } from '@/components/PairRoom/PairRoomCard';
import AddReferenceForm from '@/components/PairRoom/ReferenceCard/AddReferenceForm/AddReferenceForm';
import CategoryFilter from '@/components/PairRoom/ReferenceCard/CategoryFilter/CategoryFilter';
import ReferenceList from '@/components/PairRoom/ReferenceCard/ReferenceList/ReferenceList';

import useInput from '@/hooks/common/useInput';
import useModal from '@/hooks/common/useModal';

import useAddCategory from '@/queries/PairRoom/category/useAddCategory';
import useGetCategories from '@/queries/PairRoom/category/useGetCategories';
import useReferenceLinks from '@/queries/PairRoom/useReferenceLinks';

import { theme } from '@/styles/theme';

import * as S from './ReferenceCard.styles';

interface ReferenceCardProps {
  accessCode: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const ReferenceCard = ({ accessCode, isOpen, toggleIsOpen }: ReferenceCardProps) => {
  const { categories, categoryRecord, isCategoryExist } = useGetCategories(accessCode);

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const { referenceLinks, handleAddReferenceLink, handleDeleteReferenceLink } = useReferenceLinks(
    accessCode,
    selectedCategory,
  );

  const { isModalOpen, openModal, closeModal } = useModal();
  const { value, handleChange, resetValue, message, status } = useInput('');
  const { addCategory } = useAddCategory();

  const validateCategoryName = (category: string): { status: InputStatus; message: string } => {
    if (category.length >= 8)
      return {
        status: 'ERROR',
        message: '8자 이하로 입력해주세요',
      };
    if (isCategoryExist(category))
      return {
        status: 'ERROR',
        message: '중복된 카테고리 입니다.',
      };
    return {
      status: 'DEFAULT',
      message: '',
    };
  };
  const closeCategoryModal = () => {
    closeModal();
    resetValue();
  };
  return (
    <>
      <Modal isOpen={isModalOpen} close={closeCategoryModal} size="45rem">
        <Modal.Header>
          <S.CategoryModalHeader>
            <FaFilter />
            <p>카테고리 선택</p>
          </S.CategoryModalHeader>
        </Modal.Header>
        <Modal.CloseButton close={closeCategoryModal} />
        <Modal.Body>
          <CategoryFilter
            categories={categoryRecord}
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
          />
        </Modal.Body>

        <S.AddNewCategoryBox
          onSubmit={(event) => {
            event.preventDefault();
            if (status === 'ERROR') return;
            addCategory({ accessCode, category: value });
            resetValue();
          }}
        >
          <S.AddNewCategoryInputBox>
            <Input
              value={value}
              placeholder="새로운 카테고리를 입력해주세요."
              onChange={(event) => handleChange(event, validateCategoryName(event.target.value))}
              status={status}
              $css={css`
                font-size: ${({ theme }) => theme.fontSize.md};
                width: 75%;
                border: none;
                width: 100%;
              `}
            />
            <Button size="sm" disabled={status === 'ERROR' || value === ''}>
              추가
            </Button>
          </S.AddNewCategoryInputBox>

          <Message $status={status}>{message}</Message>
        </S.AddNewCategoryBox>
      </Modal>
      <S.Layout>
        <PairRoomCard>
          <PairRoomCard.Header
            icon={<IoIosLink color={theme.color.primary[500]} />}
            title="링크"
            isOpen={isOpen}
            toggleIsOpen={toggleIsOpen}
          >
            <S.CategoryBox>
              {selectedCategory && (
                <Button
                  onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    event.stopPropagation();
                  }}
                  rounded={true}
                  size="sm"
                  css={css`
                    min-width: 6rem;
                    width: fit-content;
                    padding: 0 1rem;
                  `}
                >
                  {selectedCategory}
                </Button>
              )}
              <Button
                onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  event.stopPropagation();
                  openModal();
                }}
                filled={false}
                rounded={true}
                size="sm"
                css={css`
                  display: flex;
                  gap: 0.5rem;
                  width: fit-content;
                  padding: 0 1rem;
                `}
              >
                <FaFilter />
                카테고리 관리
              </Button>
            </S.CategoryBox>
          </PairRoomCard.Header>
          <S.Body $isOpen={isOpen}>
            <ReferenceList referenceLinks={referenceLinks} onDeleteReferenceLink={handleDeleteReferenceLink} />
            <S.Footer>
              <AddReferenceForm categories={categories} handleAddReferenceLink={handleAddReferenceLink} />
            </S.Footer>
          </S.Body>
        </PairRoomCard>
      </S.Layout>
    </>
  );
};

export default ReferenceCard;
