import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const mockEvent: Event = {
    id: '1',
    title: '회의',
    date: '2024-01-01',
    startTime: '14:00',
    notificationTime: 30,
    description: '',
  };

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const now = new Date('2024-01-01T13:30:00'); // 이벤트 30분 전
    const events = [mockEvent];
    const notifiedEvents: string[] = [];

    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([mockEvent]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const now = new Date('2024-01-01T13:30:00');
    const events = [mockEvent];
    const notifiedEvents = [mockEvent.id];

    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-01-01T13:00:00'); // 이벤트 1시간 전
    const events = [mockEvent];
    const notifiedEvents: string[] = [];

    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });
  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-01-01T14:10:00'); // 이벤트 시작 10분 후
    const events = [mockEvent];
    const notifiedEvents: string[] = [];

    const result = getUpcomingEvents(events, now, notifiedEvents);
    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: '회의',
      date: '2024-01-01',
      startTime: '14:00',
      notificationTime: 30,
      description: '',
    };

    const result = createNotificationMessage(event);
    expect(result).toBe('30분 후 회의 일정이 시작됩니다.');
  });
});
