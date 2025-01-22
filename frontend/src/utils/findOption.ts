import type { Option } from '@/components/_common/Dropdown/Dropdown';

export const findIdByValue = (options: Option[], value: string) => {
  return options.find((option) => option.value === value)?.id || null;
};

export const findValueById = (options: Option[], id: string) => {
  return options.find((option) => option.id === id)?.value || null;
};
