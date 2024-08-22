import { describe, it, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';

import type { InputStatus } from '@/components/common/Input/Input.type';

import useInput from '@/hooks/common/useInput';

describe('useInput', () => {
  it('초기 상태가 올바른지 확인한다.', () => {
    const { result } = renderHook(() => useInput('initial'));
    expect(result.current.value).toBe('initial');
    expect(result.current.status).toBe('DEFAULT');
    expect(result.current.message).toBe('');
  });

  it('handleChange가 값을 업데이트하는지 확인한다.', () => {
    const { result } = renderHook(() => useInput('initial'));

    act(() => {
      result.current.handleChange({ target: { value: 'new value' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('new value');
  });

  it('handleChange가 유효성 검사를 수행하는지 확인한다.', () => {
    const validateValue = (value: string) => {
      if (value.length < 5) {
        return { status: 'ERROR' as InputStatus, message: 'Too short' };
      }
      return { status: 'DEFAULT' as InputStatus, message: '' };
    };

    const { result } = renderHook(() => useInput('initial'));

    act(() => {
      result.current.handleChange(
        { target: { value: 'new' } } as React.ChangeEvent<HTMLInputElement>,
        validateValue('new'),
      );
    });

    expect(result.current.status).toBe('ERROR');
    expect(result.current.message).toBe('Too short');

    act(() => {
      result.current.handleChange(
        { target: { value: 'new value' } } as React.ChangeEvent<HTMLInputElement>,
        validateValue('new value'),
      );
    });

    expect(result.current.status).toBe('DEFAULT');
    expect(result.current.message).toBe('');
  });

  it('resetValue가 값을 초기화하는지 확인한다.', () => {
    const { result } = renderHook(() => useInput('initial'));

    act(() => {
      result.current.handleChange({ target: { value: 'new value' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.resetValue();
    });

    expect(result.current.value).toBe('initial');
  });
});
