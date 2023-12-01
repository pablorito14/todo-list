import { Box, Grid, GridItem, Text,  Modal, ModalOverlay, ModalBody, ModalContent, useDisclosure, useColorModeValue } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"
import { useState } from "react"

const ConfirmModal = ({confirmModal,deleteTask,task}) => {

  const bgOverlay = useColorModeValue('blackAlpha.200','blackAlpha.600')
  const bgModal = useColorModeValue('todoLight','todoDark')
  const fontColorModal = useColorModeValue('todoDark','todoLight')

  console.log('abre confirmModal',task,confirmModal.isOpen)
  const message = task ? task.detail : 'todas las tareas completadas';
  const id = task ? task.id : -1

  return (
    <>
      {/* {task &&  */}
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
                          onClick={() => {deleteTask(id);confirmModal.onClose()}}
                          color='todoLight' py={4} px={2} textTransform='uppercase'>Eliminar</Box>
                </motion.button>
              </GridItem>
            </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
      {/* } */}
    </>
  )
}

const TodoList = ({tasks,changeStatusTask,deleteTask,updateTask,isOpenModal,onOpenModal,confirmModal,setTask,formAddTaskModal}) => {
  // const confirmModal = useDisclosure()

  const [delTask,setDelTask] = useState(null);

  const todoItemProp ={
    // onOpenConfirm:confirmModal.onOpen,
    formAddTaskModal:formAddTaskModal,
    setTask:setTask,
    confirmModal:confirmModal,
    onOpenModal: onOpenModal,
    setDelTask:setDelTask,
    changeStatusTask:changeStatusTask,
    updateTask:updateTask
  }
  
  return(
    <Box pb={6}>
      <AnimatePresence mode='sync'>
        {tasks.map((task,i) => (
          <TodoItem task={task} 
                    key={task.id} 
                    index={i} {...todoItemProp} />            
        ) )}
      </AnimatePresence>
      {/* <ConfirmModal confirmModal={confirmModal} 
                    deleteTask={deleteTask} task={delTask} /> */}
    </Box>
  )
}

export { TodoList,ConfirmModal }