import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventForm } from './index';

const mockFormProps = {
  title: '',
  setTitle: vi.fn(),
  date: '2024-03-20',
  startTime: '09:00',
  endTime: '10:00',
  description: '',
  editingEvent: null,
  resetForm: vi.fn(),
};

describe('EventForm', () => {
  it('제목이 비어있을 때 에러 메시지를 표시한다', () => {
    const mockSaveEvent = vi.fn();
    render(
      <EventForm
        formProps={mockFormProps}
        events={[]}
        saveEvent={mockSaveEvent}
        setIsOverlapDialogOpen={vi.fn()}
        setOverlappingEvents={vi.fn()}
      />
    );

    const submitButton = screen.getByTestId('event-submit-button');
    fireEvent.click(submitButton);

    expect(mockSaveEvent).not.toHaveBeenCalled();
    expect(screen.getByText('필수 정보를 모두 입력해주세요.')).toBeInTheDocument();
  });

  it('수정 모드일 때 버튼 텍스트가 변경된다', () => {
    const editingFormProps = {
      ...mockFormProps,
      editingEvent: { id: '1', title: '기존 일정', date: '2024-03-20' },
    };

    render(
      <EventForm
        formProps={editingFormProps}
        events={[]}
        saveEvent={vi.fn()}
        setIsOverlapDialogOpen={vi.fn()}
        setOverlappingEvents={vi.fn()}
      />
    );

    expect(screen.getByText('일정 수정')).toBeInTheDocument();
  });
});
