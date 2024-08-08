import { describe, it, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';

import useModal from '@/hooks/common/useModal';

describe('useModal', () => {
  it('초기 상태가 false인지 확인한다.', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isModalOpen).toBe(false);
  });

  it('초기 상태가 true인지 확인한다.', () => {
    const { result } = renderHook(() => useModal(true));
    expect(result.current.isModalOpen).toBe(true);
  });

  it('openModal을 호출하면 isModalOpen이 true가 된다.', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);
  });

  it('closeModal을 호출하면 isModalOpen이 false가 된다.', () => {
    const { result } = renderHook(() => useModal(true));

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });

  it('modalToggle을 호출하면 isModalOpen이 반전된다.', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.modalToggle();
    });

    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.modalToggle();
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
