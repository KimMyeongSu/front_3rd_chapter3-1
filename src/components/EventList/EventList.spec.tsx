import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventList } from './index';

describe('EventList', () => {
  const mockEvent = {
    id: '1',
    title: '테스트 일정',
    date: '2024-03-20',
    startTime: '09:00',
    endTime: '10:00',
    description: '테스트 설명',
    location: '테스트 장소',
    category: '업무',
    repeat: { type: 'none' },
    notificationTime: 10,
  };

  const defaultProps = {
    searchTerm: '',
    setSearchTerm: vi.fn(),
    filteredEvents: [mockEvent],
    notifiedEvents: [],
    editEvent: vi.fn(),
    deleteEvent: vi.fn(),
    notificationOptions: [{ value: 10, label: '10분 전' }],
  };

  it('검색어 입력이 정상적으로 동작한다', () => {
    render(<EventList {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('검색어를 입력하세요');
    fireEvent.change(searchInput, { target: { value: '테스트' } });

    expect(defaultProps.setSearchTerm).toHaveBeenCalledWith('테스트');
  });

  it('일정 삭제 버튼이 정상적으로 동작한다', () => {
    render(<EventList {...defaultProps} />);

    const deleteButton = screen.getByLabelText('Delete event');
    fireEvent.click(deleteButton);

    expect(defaultProps.deleteEvent).toHaveBeenCalledWith('1');
  });
});
