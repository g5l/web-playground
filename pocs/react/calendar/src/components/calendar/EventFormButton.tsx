import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import EventModal from './EventModal';

const EventFormButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button 
        leftIcon={<AddIcon />} 
        colorScheme="blue" 
        onClick={onOpen}
      >
        Add Event
      </Button>
      <EventModal 
        isOpen={isOpen} 
        onClose={onClose} 
        initialDate={new Date()}
      />
    </>
  );
};

export default EventFormButton; 