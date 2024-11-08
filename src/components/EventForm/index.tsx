import { VStack, Heading, Button, useToast } from '@chakra-ui/react';
import { EventFormFields } from './EventFormFields';
import { Event, EventForm as EventFormType } from '../../types';
import { findOverlappingEvents } from '../../utils/eventOverlap';

interface EventFormProps {
  formProps: any; // useEventForm의 반환값
  events: Event[];
  saveEvent: (event: EventFormType) => Promise<void>;
  setIsOverlapDialogOpen: (value: boolean) => void;
  setOverlappingEvents: (events: Event[]) => void;
}

export const EventForm = ({
  formProps,
  events,
  saveEvent,
  setIsOverlapDialogOpen,
  setOverlappingEvents,
}: EventFormProps) => {
  const toast = useToast();

  const addOrUpdateEvent = async () => {
    const {
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category,
      isRepeating,
      repeatType,
      repeatInterval,
      repeatEndDate,
      notificationTime,
      startTimeError,
      endTimeError,
      editingEvent,
      resetForm,
    } = formProps;

    if (!title || !date || !startTime || !endTime) {
      toast({
        title: '필수 정보를 모두 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (startTimeError || endTimeError) {
      toast({
        title: '시간 설정을 확인해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const eventData: Event | EventFormType = {
      id: editingEvent ? editingEvent.id : undefined,
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category,
      repeat: {
        type: isRepeating ? repeatType : 'none',
        interval: repeatInterval,
        endDate: repeatEndDate || undefined,
      },
      notificationTime,
    };

    const overlapping = findOverlappingEvents(eventData, events);
    if (overlapping.length > 0) {
      setOverlappingEvents(overlapping);
      setIsOverlapDialogOpen(true);
    } else {
      await saveEvent(eventData);
      resetForm();
    }
  };

  return (
    <VStack w="400px" spacing={5} align="stretch">
      <Heading>{formProps.editingEvent ? '일정 수정' : '일정 추가'}</Heading>
      <EventFormFields {...formProps} />
      <Button data-testid="event-submit-button" onClick={addOrUpdateEvent} colorScheme="blue">
        {formProps.editingEvent ? '일정 수정' : '일정 추가'}
      </Button>
    </VStack>
  );
};
