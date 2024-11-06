import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const result = parseDateTime('2024-07-01', '14:30');
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(6); // 0-based month
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const result = parseDateTime('invalid-date', '14:30');
    expect(result.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const result = parseDateTime('2024-07-01', 'invalid-time');
    expect(result.toString()).toBe('Invalid Date');
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const result = parseDateTime('', '14:30');
    expect(result.toString()).toBe('Invalid Date');
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event = {
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
    };

    const result = convertEventToDateRange(event);

    expect(result.start).toBeInstanceOf(Date);
    expect(result.end).toBeInstanceOf(Date);
    expect(result.start.getHours()).toBe(14);
    expect(result.start.getMinutes()).toBe(30);
    expect(result.end.getHours()).toBe(15);
    expect(result.end.getMinutes()).toBe(30);
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event = {
      date: 'invalid-date',
      startTime: '14:30',
      endTime: '15:30',
    };

    const result = convertEventToDateRange(event);
    expect(result.start.toString()).toBe('Invalid Date');
    expect(result.end.toString()).toBe('Invalid Date');
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event = {
      date: '2024-07-01',
      startTime: 'invalid-time',
      endTime: 'invalid-time',
    };

    const result = convertEventToDateRange(event);
    expect(result.start.toString()).toBe('Invalid Date');
    expect(result.end.toString()).toBe('Invalid Date');
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1 = {
      date: '2024-07-01',
      startTime: '14:00',
      endTime: '16:00',
    };

    const event2 = {
      date: '2024-07-01',
      startTime: '15:00',
      endTime: '17:00',
    };

    expect(isOverlapping(event1, event2)).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1 = {
      date: '2024-07-01',
      startTime: '14:00',
      endTime: '15:00',
    };

    const event2 = {
      date: '2024-07-01',
      startTime: '16:00',
      endTime: '17:00',
    };

    expect(isOverlapping(event1, event2)).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent = {
      id: '1',
      date: '2024-07-01',
      startTime: '14:00',
      endTime: '16:00',
    };

    const existingEvents = [
      {
        id: '2',
        date: '2024-07-01',
        startTime: '15:00',
        endTime: '17:00',
      },
      {
        id: '3',
        date: '2024-07-01',
        startTime: '16:30',
        endTime: '18:00',
      },
    ];

    const overlappingEvents = findOverlappingEvents(newEvent, existingEvents);
    expect(overlappingEvents).toHaveLength(1);
    expect(overlappingEvents[0].id).toBe('2');
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent = {
      id: '1',
      date: '2024-07-01',
      startTime: '14:00',
      endTime: '15:00',
    };

    const existingEvents = [
      {
        id: '2',
        date: '2024-07-01',
        startTime: '16:00',
        endTime: '17:00',
      },
    ];

    const overlappingEvents = findOverlappingEvents(newEvent, existingEvents);
    expect(overlappingEvents).toHaveLength(0);
  });
});
