import { Box, Grid, GridItem, Text,  Modal, ModalOverlay, ModalBody, ModalContent, useDisclosure, useColorModeValue } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"
import { useState } from "react"

const ConfirmModal = ({isOpen,onClose,deleteTask,task}) => {

  const bgOverlay = useColorModeValue('blackAlpha.200','blackAlpha.600')
  const bgModal = useColorModeValue('todoLight','todoDark')
  const fontColorModal = useColorModeValue('todoDark','todoLight')

  return (
    <>
      {task && 
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay backdropFilter='blur(3px)' bg={bgOverlay}/>
          <ModalContent bg={bgModal} color={fontColorModal}
                        mx={4} rounded='none'>
            <ModalBody p={0}  border='2px solid #fc524c'>
            <Grid templateColumns='repeat(6,1fr)' alignItems='center'>
              <GridItem colSpan={5}>
                <Text p={2}>¿Eliminar {task.detail}?</Text>
              </GridItem>
              <GridItem colSpan={1}>
              <motion.button whileTap={{scale:0.9}} 
              style={{display:'block',height:'100%',width:'100%',outline:'none'}}
              tabIndex='-1'
              >
                <Box cursor='pointer' bg='todoRed' h='full' display='flex' 
                      alignItems='center' _focusVisible={{border:'none'}}
                          onClick={() => {deleteTask(task.id);onClose()}}
                          color='todoLight' py={4} px={2} textTransform='uppercase'>Eliminar</Box>
                </motion.button>
              </GridItem>
            </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
      }
    </>
  )
}



const TodoList = ({tasks,changeStatusTask,deleteTask}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [delTask,setDelTask] = useState(null);

  const todoItemProp ={
    onOpen:onOpen,
    setDelTask:setDelTask,
    changeStatusTask:changeStatusTask,
  }
  
  return(
    <Box pb={6}>
          {/* <AnimatePresence mode='popLayout'> */}
          <AnimatePresence mode='sync'>
          {tasks.map((task,i) => (
            <TodoItem task={task} 
                      key={task.id} 
                      index={i} {...todoItemProp} />            
          ) )}
          </AnimatePresence>
          <ConfirmModal isOpen={isOpen} onClose={onClose} 
                        deleteTask={deleteTask} task={delTask} />
        </Box>
  )
}

export { TodoList }