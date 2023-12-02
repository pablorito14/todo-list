import { Box } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { useFunctionContext } from "../../Providers/TaskProvider";
import { FaPlus, FaTrash } from "react-icons/fa6";

const AddDelButtons = () => {
  const {tasks,setTask,formAddTaskModal,confirmModal} = useFunctionContext();

  const hasTasksComplete = tasks.some(t => t.complete);

  const handleAddTask = () => {
    setTask(null);
    formAddTaskModal.onOpen();
  }
  const handleDeleteAll = () => {
    if(hasTasksComplete){
      setTask(null);
      confirmModal.onOpen();
    }
  }

  return (
    <Box position='fixed' bottom='0' left='0'  w='full' bg='todo-Dark'>
      <Box display='flex' justifyContent='center' gap={6} >
        <motion.div whileTap={{scale:0.9}} whileHover={{scale: [1,1.1]}}>
          <Box mb={6} p={3} color='todoDark' boxShadow='todoShadow'
              bg='todoGreen' rounded='50%' onClick={handleAddTask}>
            <FaPlus size={25}/>
          </Box>
        </motion.div>
        
        <motion.div whileTap={{scale:0.9}} whileHover={{scale: [1,1.1]}}>
          <Box mb={6} p={3} color='todoLight' boxShadow='todoShadow'
              bg={(hasTasksComplete) ? 'todoRed' : 'todoGray'} rounded='50%' 
              onClick={handleDeleteAll}>
            <FaTrash size={25}/>
          </Box>
        </motion.div>
      </Box>
    </Box>
  )
}

export { AddDelButtons }