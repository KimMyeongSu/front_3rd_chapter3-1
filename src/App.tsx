import { Box, Flex } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { EventForm } from './components/EventForm';
import { Calendar } from './components/Calendar';
import { EventList } from './components/EventList';
import { Notifications } from './components/Notifications';
import { OverlapDialog } from './components/Dialogs/OverlapDialog';

import { useCalendarView } from './hooks/useCalendarView';
import { useEventForm } from './hooks/useEventForm';
import { useEventOperations } from './hooks/useEventOperations';
import { useNotifications } from './hooks/useNotifications';
import { useSearch } from './hooks/useSearch';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const notificationOptions = [
  { value: 1, label: '1분 전' },
  { value: 10, label: '10분 전' },
  { value: 60, label: '1시간 전' },
  { value: 120, label: '2시간 전' },
  { value: 1440, label: '1일 전' },
];

function App() {
  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState([]);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const formProps = useEventForm();
  const { events, saveEvent, deleteEvent } = useEventOperations(
    Boolean(formProps.editingEvent),
    () => formProps.setEditingEvent(null)
  );
  const { notifications, notifiedEvents, setNotifications } = useNotifications(events);
  const { view, setView, currentDate, holidays, navigate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventForm
          formProps={formProps}
          events={events}
          saveEvent={saveEvent}
          setIsOverlapDialogOpen={setIsOverlapDialogOpen}
          setOverlappingEvents={setOverlappingEvents}
        />

        <Calendar
          view={view}
          setView={setView}
          currentDate={currentDate}
          navigate={navigate}
          weekDays={weekDays}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
          holidays={holidays}
        />

        <EventList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredEvents={filteredEvents}
          notifiedEvents={notifiedEvents}
          editEvent={formProps.editEvent}
          deleteEvent={deleteEvent}
          notificationOptions={notificationOptions}
        />
      </Flex>

      <OverlapDialog
        isOpen={isOverlapDialogOpen}
        onClose={() => setIsOverlapDialogOpen(false)}
        overlappingEvents={overlappingEvents}
        cancelRef={cancelRef}
        onConfirm={() => {
          setIsOverlapDialogOpen(false);
          saveEvent({
            id: formProps.editingEvent ? formProps.editingEvent.id : undefined,
            title: formProps.title,
            date: formProps.date,
            startTime: formProps.startTime,
            endTime: formProps.endTime,
            description: formProps.description,
            location: formProps.location,
            category: formProps.category,
            repeat: {
              type: formProps.isRepeating ? formProps.repeatType : 'none',
              interval: formProps.repeatInterval,
              endDate: formProps.repeatEndDate || undefined,
            },
            notificationTime: formProps.notificationTime,
          });
        }}
      />

      <Notifications notifications={notifications} setNotifications={setNotifications} />
    </Box>
  );
}

export default App;
