import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';

import useToastStore from '@/stores/toastStore';

import useCopyClipBoard from '@/hooks/common/useCopyClipboard';

jest.mock('@/stores/toastStore');

describe('useCopyClipBoard', () => {
  let addToastMock: jest.Mock;

  beforeEach(() => {
    addToastMock = jest.fn();
    (useToastStore as unknown as jest.Mock).mockReturnValue({ addToast: addToastMock });
  });

  it('텍스트가 클립보드에 성공적으로 복사되면 성공 토스트 메시지를 추가한다.', async () => {
    const writeTextMock = jest.fn().mockReturnValue(Promise.resolve());
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useCopyClipBoard());

    await act(async () => {
      await result.current[1]('test text');
    });

    expect(writeTextMock).toHaveBeenCalledWith('test text');
    expect(result.current[0]).toBe(true);
    expect(addToastMock).toHaveBeenCalledWith({ status: 'SUCCESS', message: '클립보드에 복사되었습니다.' });
  });

  it('텍스트가 클립보드에 복사 실패하면 실패 토스트 메시지를 추가한다.', async () => {
    const writeTextMock = jest.fn().mockRejectedValue(new Error('Failed to copy') as unknown as never);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useCopyClipBoard());

    await act(async () => {
      await result.current[1]('test text');
    });

    expect(writeTextMock).toHaveBeenCalledWith('test text');
    expect(result.current[0]).toBe(false);
    expect(addToastMock).toHaveBeenCalledWith({ status: 'ERROR', message: '클립보드에 복사에 실패했습니다.' });
  });
});
