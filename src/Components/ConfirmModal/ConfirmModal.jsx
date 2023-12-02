import { Box, Grid, GridItem, Modal, ModalBody, ModalContent, ModalOverlay, Text, useColorModeValue } from "@chakra-ui/react";
import { useFunctionContext } from "../../Providers/TaskProvider";
import { motion } from "framer-motion";

const ConfirmModal = () => {

  const {task,deleteTask,deleteCompleteTask,confirmModal} = useFunctionContext();

  const bgOverlay = useColorModeValue('blackAlpha.200','blackAlpha.600')
  const bgModal = useColorModeValue('todoLight','todoDark')
  const fontColorModal = useColorModeValue('todoDark','todoLight')

  const message = task ? task.detail : 'todas las tareas completadas';
  const id = task ? task.id : -1

  const handleConfirm = () => {
    task ? deleteTask() : deleteCompleteTask();
    confirmModal.onClose();
  }

  return (
    <Modal onClose={confirmModal.onClose} isOpen={confirmModal.isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(3px)' bg={bgOverlay}/>
      <ModalContent bg={bgModal} color={fontColorModal}
                    mx={4} rounded='none'>
        <ModalBody p={0}  border='2px solid #fc524c'>
          <Grid templateColumns='repeat(6,1fr)' alignItems='center'>
            <GridItem colSpan={5}>
              <Text p={2}>¿Eliminar {message}?</Text>
            </GridItem>
            <GridItem colSpan={1} display='flex' h='full'>
              <motion.button whileTap={{scale:0.9}} 
                            style={{display:'block',outline:'none'}}
                            tabIndex='-1'>
                <Box cursor='pointer' bg='todoRed' h='full' display='flex' 
                      alignItems='center' _focusVisible={{border:'none'}}
                      onClick={handleConfirm} color='todoLight' py={4} px={2} 
                      textTransform='uppercase'>Eliminar</Box>
              </motion.button>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export { ConfirmModal }