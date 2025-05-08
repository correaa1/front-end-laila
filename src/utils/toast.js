import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../theme';

const { toast } = createStandaloneToast({ theme });

export const showToast = (title, description, status = 'info') => {
  toast({
    title,
    description,
    status,
    duration: 3000,
    isClosable: true,
    position: 'top-right',
  });
};

export const successToast = (title, description) => 
  showToast(title, description, 'success');

export const errorToast = (title, description) => 
  showToast(title, description, 'error');

export const warningToast = (title, description) => 
  showToast(title, description, 'warning');

export const infoToast = (title, description) => 
  showToast(title, description, 'info'); 