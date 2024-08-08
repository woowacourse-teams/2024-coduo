import { describe, it, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';

import usePairNameInputs from '@/hooks/Main/usePairNameInputs';

describe('usePairNameInputs', () => {
  it('페어 이름을 입력하지 않으면 error 상태와 에러 메세지가 출력된다.', async () => {
    const { result } = renderHook(() => usePairNameInputs());

    act(() => {
      result.current.handleFirstPair({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.firstPair.status).toBe('ERROR');
    expect(result.current.firstPair.message).toBe('값을 입력해주세요.');

    act(() => {
      result.current.handleSecondPair({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.secondPair.status).toBe('ERROR');
    expect(result.current.secondPair.message).toBe('값을 입력해주세요.');
  });
});
