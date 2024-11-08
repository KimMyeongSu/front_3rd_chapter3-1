import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OverlapDialog } from './OverlapDialog';

describe('OverlapDialog', () => {
  const mockEvent = {
    id: '1',
    title: '겹치는 일정',
    date: '2024-03-20',
    startTime: '09:00',
    endTime: '10:00',
  };

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    overlappingEvents: [mockEvent],
    cancelRef: { current: null },
    onConfirm: vi.fn(),
  };

  it('겹치는 일정 정보를 올바르게 표시한다', () => {
    render(<OverlapDialog {...defaultProps} />);

    expect(screen.getByText(/겹치는 일정/)).toBeInTheDocument();
    expect(screen.getByText(/09:00-10:00/)).toBeInTheDocument();
  });

  it('확인 버튼 클릭시 onConfirm이 호출된다', () => {
    render(<OverlapDialog {...defaultProps} />);

    const confirmButton = screen.getByText('계속 진행');
    fireEvent.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });
});
