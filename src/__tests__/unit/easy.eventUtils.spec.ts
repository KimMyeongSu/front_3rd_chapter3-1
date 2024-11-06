import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const events: Event[] = [
      { id: '1', title: '이벤트 1', date: '2024-07-01', description: '', location: '' },
      { id: '2', title: '이벤트 2', date: '2024-07-02', description: '', location: '' },
      { id: '3', title: '미팅', date: '2024-07-03', description: '', location: '' },
    ];
    const result = getFilteredEvents(events, '이벤트 2', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[1]]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const events: Event[] = [
      { id: '1', title: '이벤트 1', date: '2024-07-01', description: '', location: '' },
      { id: '2', title: '이벤트 2', date: '2024-07-03', description: '', location: '' },
      { id: '3', title: '이벤트 3', date: '2024-07-08', description: '', location: '' },
    ];
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[0], events[1]]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      { id: '1', title: '이벤트 1', date: '2024-07-01', description: '', location: '' },
      { id: '2', title: '이벤트 2', date: '2024-07-15', description: '', location: '' },
      { id: '3', title: '이벤트 3', date: '2024-08-01', description: '', location: '' },
    ];
    const result = getFilteredEvents(events, '', new Date('2024-07-15'), 'month');
    expect(result).toEqual([events[0], events[1]]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const events: Event[] = [
      { id: '1', title: '이벤트 1', date: '2024-07-01', description: '', location: '' },
      { id: '2', title: '미팅', date: '2024-07-02', description: '', location: '' },
      { id: '3', title: '이벤트 2', date: '2024-07-08', description: '', location: '' },
    ];
    const result = getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[0]]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      { id: '1', title: '이벤트 1', date: '2024-07-01', description: '', location: '' },
      { id: '2', title: '미팅', date: '2024-07-02', description: '', location: '' },
    ];
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');
    expect(result).toEqual(events);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const events: Event[] = [
      { id: '1', title: '이벤트 TEST', date: '2024-07-01', description: '', location: '' },
      { id: '2', title: '미팅', date: '2024-07-02', description: '', location: '' },
    ];
    const result = getFilteredEvents(events, 'test', new Date('2024-07-01'), 'month');
    expect(result).toEqual([events[0]]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const events: Event[] = [
      { id: '1', title: '이벤트 1', date: '2024-07-31', description: '', location: '' },
      { id: '2', title: '이벤트 2', date: '2024-08-01', description: '', location: '' },
    ];
    const result = getFilteredEvents(events, '', new Date('2024-07-31'), 'month');
    expect(result).toEqual([events[0]]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const events: Event[] = [];
    const result = getFilteredEvents(events, '이벤트', new Date(), 'month');
    expect(result).toEqual([]);
  });
});
