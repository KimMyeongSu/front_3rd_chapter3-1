import { VStack, Alert, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';

interface NotificationsProps {
  notifications: Array<{ message: string }>;
  setNotifications: React.Dispatch<React.SetStateAction<Array<{ message: string }>>>;
}

export const Notifications = ({ notifications, setNotifications }: NotificationsProps) => {
  if (notifications.length === 0) return null;

  return (
    <VStack position="fixed" top={4} right={4} spacing={2} align="flex-end">
      {notifications.map((notification, index) => (
        <Alert key={index} status="info" variant="solid" width="auto">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
          </Box>
          <CloseButton
            onClick={() => setNotifications((prev) => prev.filter((_, i) => i !== index))}
          />
        </Alert>
      ))}
    </VStack>
  );
};
