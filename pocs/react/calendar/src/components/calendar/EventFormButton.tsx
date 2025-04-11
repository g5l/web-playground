import React, {useState} from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import EventModal from './EventModal';

const EventFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button 
        leftIcon={<AddIcon />} 
        colorScheme="blue" 
        onClick={handleOpen}
      >
        Add Event
      </Button>
      <EventModal 
        isOpen={isOpen} 
        onClose={handleClose} 
        initialDate={new Date()}
      />
    </>
  );
};

export default EventFormButton; 