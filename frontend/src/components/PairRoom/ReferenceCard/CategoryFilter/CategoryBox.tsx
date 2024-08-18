import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '@/components/common/Input/Input';
import { Message } from '@/components/common/Input/Input.styles';
import { InputStatus } from '@/components/common/Input/Input.type';
import CategoryItem from '@/components/PairRoom/ReferenceCard/CategoryFilter/CategoryItem';
import IconButton from '@/components/PairRoom/ReferenceCard/CategoryFilter/IconButton';

import useInput from '@/hooks/common/useInput';

import useDeleteCategory from '@/queries/PairRoom/category/useDeleteCategory';
import useGetCategories from '@/queries/PairRoom/category/useGetCategories';
import useUpdateCategory from '@/queries/PairRoom/category/useUpdateCategory';

import * as S from './CategoryFilter.styles';

interface CategoryProps {
  category: string;
  isChecked: boolean;
  handleSelectCategory: (category: string) => void;
}

const CategoryBox = ({ category, isChecked, handleSelectCategory }: CategoryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { value, handleChange, resetValue, message, status } = useInput(category);
  const { accessCode } = useParams() as { accessCode: string };
  const { deleteCategoryMutation } = useDeleteCategory();
  const { updateCategoryMutation } = useUpdateCategory(() => resetValue());
  const { isCategoryExist } = useGetCategories(accessCode);

  const updateCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'ERROR') return;

    await updateCategoryMutation({ updatedCategoryName: value, previousCategoryName: category, accessCode });

    setIsEditing(false);
    handleSelectCategory('전체');
    navigate(`/room/${accessCode}?category=전체`, { state: { driver: '11', navigator: '22' } });
    //TODO:  방 정보 기능 구현 시 state 삭제
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetValue();
  };

  const validateCategoryName = (category: string): { status: InputStatus; message: string } => {
    if (category.length >= 8)
      return {
        status: 'ERROR',
        message: '8자 이하로 입력해주세요',
      };
    if (isCategoryExist(category) || category === '전체')
      return {
        status: 'ERROR',
        message: '중복된 카테고리 입니다.',
      };
    return {
      status: 'DEFAULT',
      message: '',
    };
  };

  const handleEdit = () => setIsEditing(true);

  const deleteCategory = () => deleteCategoryMutation({ categoryName: category, accessCode });

  const navigate = useNavigate();

  return (
    <>
      <S.CategoryBox
        onClick={() => {
          navigate(`/room/${accessCode}?category=${category}`, { state: { driver: '11', navigator: '22' } });
        }}
        //TODO:  방 정보 기능 구현 시 state 삭제
      >
        {isEditing ? (
          <S.EditFrom onSubmit={(event) => updateCategory(event)}>
            <S.CategoryItemInputBox>
              <Input
                placeholder="수정할 카테고리 이름을 입력해주세요."
                value={value}
                onChange={(event) => {
                  handleChange(event, validateCategoryName(event.target.value));
                }}
                status={status}
              />
              <S.CategoryIconsBox>
                <IconButton icon="CHECK" />
                <IconButton onClick={handleCancel} icon="CANCEL" />
              </S.CategoryIconsBox>
            </S.CategoryItemInputBox>

            {message && <Message $status={status}>{message}</Message>}
          </S.EditFrom>
        ) : (
          <>
            <CategoryItem
              id={category}
              isChecked={isChecked}
              category={category}
              handleSelectCategory={handleSelectCategory}
            />

            {category !== '전체' && (
              <S.CategoryIconsBox>
                <IconButton onClick={handleEdit} icon="EDIT" />
                <IconButton onClick={deleteCategory} icon="DELETE" />
              </S.CategoryIconsBox>
            )}
          </>
        )}
      </S.CategoryBox>
    </>
  );
};

export default CategoryBox;
