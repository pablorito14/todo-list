import { Box, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FaCircle, FaTrash } from "react-icons/fa6"


const TodoItem = ({task,index,changeStatusTask,onOpen,setDelTask}) => {

  const borderGrid = useColorModeValue('todoBorderLight','todoBorderDark');
  const bgGrid = useColorModeValue('todoLight','todoDark')
  // const colorTrash = useColorModeValue('todoGreenLight','todoGreen')
  
  return(
    
    <motion.div layout animate={{opacity: [0, 1],y: [300, 0]}}
                style={{margin: '1.5rem 0'}} key={task.id}
                transition={{ type: "spring",damping: 30, duration:0.5, delay:index/8 }} 
                exit={{ opacity: [1, 0.5], scale: [1,0.2], transition:{duration:.5} }}>
      <Grid templateColumns='repeat(8,1fr)' borderWidth='1px' borderColor={borderGrid}
            boxShadow='todoShadow' bg={bgGrid} borderRadius='1rem'>
        <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' 
                  py={4} onClick={() => changeStatusTask(task.id)} _hover={{cursor:'pointer'}} 
                  color={(task.complete) ? 'todoGreen' : 'todoRed'}>
            <FaCircle />
        </GridItem>
        
        <GridItem colSpan={6} textAlign='center'py={4} 
                  onClick={() => changeStatusTask(task.id)} _hover={{cursor:'pointer'}}>
          <Text color='todoGray'>{task.detail}</Text>
        </GridItem>
        <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' 
                  py={4} 
                  color="todoGreen"
                  // color={colorTrash}
                  >
          <Box _focusVisible={{borderColor:'none'}} cursor='pointer'
                onClick={() => {setDelTask(task);onOpen()}}><FaTrash /></Box>
        </GridItem>
      </Grid>
      
    </motion.div>
  )
}

export { TodoItem }