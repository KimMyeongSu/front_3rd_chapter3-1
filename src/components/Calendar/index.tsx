import { VStack, HStack, IconButton, Select } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { Event } from '../../types';

interface CalendarProps {
  view: 'week' | 'month';
  setView: (view: 'week' | 'month') => void;
  currentDate: Date;
  navigate: (direction: 'prev' | 'next') => void;
  weekDays: string[];
  filteredEvents: Event[];
  notifiedEvents: string[];
  holidays: Record<string, string>;
}

export const Calendar = ({
  view,
  setView,
  currentDate,
  navigate,
  weekDays,
  filteredEvents,
  notifiedEvents,
  holidays,
}: CalendarProps) => {
  return (
    <VStack flex={1} spacing={5} align="stretch">
      <HStack mx="auto" justifyContent="space-between">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate('prev')}
        />
        <Select
          aria-label="view"
          value={view}
          onChange={(e) => setView(e.target.value as 'week' | 'month')}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Select>
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={() => navigate('next')}
        />
      </HStack>

      {view === 'week' && (
        <WeekView
          currentDate={currentDate}
          weekDays={weekDays}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
        />
      )}
      {view === 'month' && (
        <MonthView
          currentDate={currentDate}
          weekDays={weekDays}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
          holidays={holidays}
        />
      )}
    </VStack>
  );
};
