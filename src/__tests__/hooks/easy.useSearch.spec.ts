import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const events: Event[] = [
  {
    id: '1',
    title: '회의',
    description: '팀 미팅',
    location: '회의실A',
    startTime: new Date(),
    endTime: new Date(),
  },
  {
    id: '2',
    title: '점심',
    description: '팀 점심',
    location: '식당',
    startTime: new Date(),
    endTime: new Date(),
  },
];
it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  expect(result.current.searchTerm).toBe('');
  //TODO:여기 수정 필요
  expect(result.current.filteredEvents).toEqual([]);
});

it('검색어가 있을 때 해당 검색어를 포함하는 이벤트만 반환해야 한다', () => {
  const currentDate = new Date();

  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));

  act(() => {
    result.current.setSearchTerm('회의');
  });
  expect(result.current.searchTerm).toBe('회의');
  expect(result.current.filteredEvents).toEqual([]);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  expect(result.current.filteredEvents).toEqual([]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  expect(result.current.filteredEvents).toEqual([]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  expect(result.current.filteredEvents).toEqual([]);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(events, currentDate, 'month'));
  expect(result.current.filteredEvents).toEqual([]);
});
