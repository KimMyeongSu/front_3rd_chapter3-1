import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const event: Event[] = [
  {
    id: '2b7545a6-ebee-426c-b906-2329bc8d62bd',
    title: '팀 회의',
    date: '2024-11-20',
    startTime: '10:00',
    endTime: '11:00',
    description: '주간 팀 미팅',
    location: '회의실 A',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: '09702fb3-a478-40b3-905e-9ab3c8849dcd',
    title: '점심 약속',
    date: '2024-11-21',
    startTime: '12:30',
    endTime: '13:30',
    description: '동료와 점심 식사',
    location: '회사 근처 식당',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 'da3ca408-836a-4d98-b67a-ca389d07552b',
    title: '프로젝트 마감',
    date: '2024-11-25',
    startTime: '09:00',
    endTime: '18:00',
    description: '분기별 프로젝트 마감',
    location: '사무실',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 'dac62941-69e5-4ec0-98cc-24c2a79a7f81',
    title: '생일 파티',
    date: '2024-11-28',
    startTime: '19:00',
    endTime: '22:00',
    description: '친구 생일 축하',
    location: '친구 집',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: '80d85368-b4a4-47b3-b959-25171d49371f',
    title: '운동',
    date: '2024-11-22',
    startTime: '18:00',
    endTime: '19:00',
    description: '주간 운동',
    location: '헬스장',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
];

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const currentDate = new Date('2024-11-06');
  const { result } = renderHook(() => useSearch(event, currentDate, 'month'));
  expect(result.current.searchTerm).toBe('');
  expect(result.current.filteredEvents).toEqual(event);
});

it('검색어가 있을 때 해당 검색어를 포함하는 이벤트만 반환해야 한다', () => {
  //TODO:여기 수정 필요
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(event, currentDate, 'month'));

  act(() => {
    result.current.setSearchTerm('회의');
  });
  expect(result.current.searchTerm).toBe('회의');
  expect(result.current.filteredEvents).toEqual([]);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(event, currentDate, 'month'));
  expect(result.current.filteredEvents).toEqual([]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const currentDate = new Date();
  const { result } = renderHook(() => useSearch(event, currentDate, 'month'));
  expect(result.current.filteredEvents).toEqual([]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {});

it('검색어를 "회의"에서 "점심"으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다', () => {});
