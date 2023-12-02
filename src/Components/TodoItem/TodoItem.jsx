import { Box, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FaCircle, FaTrash, FaPen } from "react-icons/fa6"
import { useFunctionContext } from "../../Providers/TaskProvider";
import { useState } from "react";
import { useEffect } from "react";

const TodoItem = ({task,index}) => {

  const [taskDate,setTaskDate] = useState();
  const {changeStatusTask,setTask,formAddTaskModal,confirmModal} = useFunctionContext();

  const borderGrid = useColorModeValue('todoBorderLight','todoBorderDark');
  const bgGrid = useColorModeValue('todoLight','todoDark')

  useEffect(() => {
      const now = new Date(task.date)
      const date = Intl.DateTimeFormat('es-AR',{year:'numeric',month:'numeric',day:'numeric'}).format(now);
      const time = Intl.DateTimeFormat('es-AR', {hour: 'numeric',minute:'numeric' }).format(now);
      const weekday = Intl.DateTimeFormat('es-AR', {weekday: 'long' }).format(now);
      setTaskDate(`${date} (${weekday}) ${time}`)
  },[])

  const handleChangeStatusTask = () => {
    changeStatusTask(task.id);
  }

  const handleUpdateTask = () =>{
    setTask(task);
    formAddTaskModal.onOpen();
  }

  const handleDeleteTask = () => {
    setTask(task);
    confirmModal.onOpen();
  }

  return(
    
    <motion.div layout animate={{opacity: [0, 1],y: [300, 0]}}
                style={{margin: '1.5rem 0'}} key={task.id}
                transition={{ type: "spring",damping: 30, duration:0.5, delay:index/8 }} 
                exit={{ opacity: [1, 0.5], scale: [1,0.2], transition:{duration:.5} }}>
      <Grid templateColumns='repeat(12,1fr)' borderWidth='1px' borderColor={borderGrid}
            boxShadow='todoShadow' bg={bgGrid} borderRadius='1rem'>
        
        <GridItem colSpan={2} display='flex' justifyContent='center' alignItems='center' 
                  py={2} onClick={handleChangeStatusTask} _hover={{cursor:'pointer'}} 
                  color={(task.complete) ? 'todoGreen' : 'todoRed'}>
            <FaCircle size={25} />
        </GridItem>
        
        <GridItem colSpan={8} textAlign='center'py={2} onClick={handleChangeStatusTask}
                  _hover={{cursor:'pointer'}}>
          <Text color='todoGray'textDecoration={task.complete && "line-through"}>
            {task.detail}
          </Text>
          <Text color='todoGray' fontSize="small" textDecoration={task.complete && "line-through"}>
            {taskDate}
          </Text>
        </GridItem>

        <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' 
                  py={4} color="todoGray">
          {!task.complete && <Box _focusVisible={{borderColor:'none'}} cursor='pointer'
                onClick={handleUpdateTask}><FaPen /></Box>}
        </GridItem>

        <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' 
                  py={4} color="todoGray">
          <Box _focusVisible={{borderColor:'none'}} cursor='pointer' onClick={handleDeleteTask}>
            <FaTrash />
          </Box>
        </GridItem>
      </Grid>
    </motion.div>
  )
}

export { TodoItem }