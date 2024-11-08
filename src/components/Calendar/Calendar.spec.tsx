import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './index';

describe('Calendar', () => {
  const defaultProps = {
    view: 'week' as const,
    setView: vi.fn(),
    currentDate: new Date('2024-03-20'),
    navigate: vi.fn(),
    weekDays: ['일', '월', '화', '수', '목', '금', '토'],
    filteredEvents: [],
    notifiedEvents: [],
    holidays: {},
  };

  it('뷰 전환이 정상적으로 동작한다', () => {
    render(<Calendar {...defaultProps} />);

    const viewSelect = screen.getByLabelText('view');
    fireEvent.change(viewSelect, { target: { value: 'month' } });

    expect(defaultProps.setView).toHaveBeenCalledWith('month');
  });

  it('이전/다음 버튼이 정상적으로 동작한다', () => {
    render(<Calendar {...defaultProps} />);

    const prevButton = screen.getByLabelText('Previous');
    const nextButton = screen.getByLabelText('Next');

    fireEvent.click(prevButton);
    expect(defaultProps.navigate).toHaveBeenCalledWith('prev');

    fireEvent.click(nextButton);
    expect(defaultProps.navigate).toHaveBeenCalledWith('next');
  });
});
