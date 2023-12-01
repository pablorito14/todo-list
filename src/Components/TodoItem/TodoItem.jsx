import { Box, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react";
import { FaCircle, FaTrash, FaPen } from "react-icons/fa6"

const TodoItem = ({task,index,changeStatusTask,setDelTask,updateTask,confirmModal,formAddTaskModal,setTask}) => {

  const borderGrid = useColorModeValue('todoBorderLight','todoBorderDark');
  const bgGrid = useColorModeValue('todoLight','todoDark')
  // const colorTrash = useColorModeValue('todoGreenLight','todoGreen')
  
  // const [updateTask,setUpdateTask] = useState(null);

  const dateToString = () => {
    const now = new Date(task.date)
    const date = Intl.DateTimeFormat('es-AR',{year:'numeric',month:'numeric',day:'numeric'}).format(now);
    const time = Intl.DateTimeFormat('es-AR', {hour: 'numeric',minute:'numeric' }).format(now);
    const weekday = Intl.DateTimeFormat('es-AR', {weekday: 'long' }).format(now);
    return `${date} (${weekday}) ${time}`;
  }

  const handleChangeStatusTask = (id) => {
    changeStatusTask(task.id);
  }

  const handleUpdateTask = (id) =>{
    setTask(task);
    formAddTaskModal.onOpen();
  }

  const handleDeleteTask = (id) => {
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
                  py={2} 
                  // onClick={() => changeStatusTask(task.id)} 
                  onClick={handleChangeStatusTask}
                  _hover={{cursor:'pointer'}} 
                  color={(task.complete) ? 'todoGreen' : 'todoRed'}>
            <FaCircle size={25} />
        </GridItem>
        
        <GridItem colSpan={8} textAlign='center'py={2} 
                  // onClick={() => changeStatusTask(task.id)} 
                  onClick={handleChangeStatusTask}
                  _hover={{cursor:'pointer'}}>
          <Text color='todoGray'textDecoration={task.complete && "line-through"}>{task.detail}</Text>
          <Text color='todoGray' fontSize="small" textDecoration={task.complete && "line-through"}>{dateToString()}</Text>
        </GridItem>

        <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' 
                  py={4} color="todoGray">
          {!task.complete && <Box _focusVisible={{borderColor:'none'}} cursor='pointer'
                onClick={handleUpdateTask}><FaPen /></Box>}
        </GridItem>

        <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' 
                  py={4} color="todoGray">
          <Box _focusVisible={{borderColor:'none'}} cursor='pointer'
                // onClick={() => {setDelTask(task);confirmModal.onOpen()}}
                onClick={handleDeleteTask}
                ><FaTrash /></Box>
        </GridItem>
      
      </Grid>
      
    </motion.div>
  )
}

export { TodoItem }