import { Modal, ModalBody, ModalContent, ModalOverlay, useColorModeValue } from '@chakra-ui/react';
import { useFunctionContext } from '../../Providers/TaskProvider';
import { AddUpdateTask } from '../AddUpdateTask/AddUpdateTask';

const FormModal = () => {
  const {formAddTaskModal} = useFunctionContext();

  const bgOverlay = useColorModeValue('blackAlpha.200','blackAlpha.600')
  const bgModal = useColorModeValue('todoLight','todoDark')
  const fontColorModal = useColorModeValue('todoDark','todoLight')

  return(
    <>
      {formAddTaskModal.isOpen && 
        <Modal onClose={formAddTaskModal.onClose} isOpen={formAddTaskModal.isOpen} isCentered->
          <ModalOverlay backdropFilter='blur(3px)' bg={bgOverlay}/>
          <ModalContent mx={4} rounded='none' mt={20}>
            <ModalBody p={0}  borderWidth='1px' borderColor='todoGreen' bg={bgModal} color={fontColorModal}>

              <AddUpdateTask />
              
            </ModalBody>
          </ModalContent>
        </Modal>
      }
    </>
  )
}

export { FormModal }