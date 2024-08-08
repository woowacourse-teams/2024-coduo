import { describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import usePreventScroll from '@/hooks/common/usePreventScroll';

describe('usePreventScroll', () => {
  const originalScrollTo = window.scrollTo;
  const originalScrollY = window.scrollY;

  beforeAll(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
    window.scrollY = originalScrollY;
  });

  it('스크롤을 방지하고, cleanup 시 스크롤을 허용한다.', () => {
    const { unmount } = renderHook(() => usePreventScroll(true));

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.width).toBe('100%');
    expect(document.body.style.top).toBe('-0px');
    expect(document.body.style.overflowY).toBe('auto');

    unmount();

    expect(document.body.style.position).toBe('');
    expect(document.body.style.width).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.overflowY).toBe('');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('isOpen이 false일 때 스크롤을 방지하지 않는다.', () => {
    renderHook(() => usePreventScroll(false));

    expect(document.body.style.position).toBe('');
    expect(document.body.style.width).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.overflowY).toBe('');
  });
});
