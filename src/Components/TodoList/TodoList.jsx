import { Box, Grid, GridItem, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react"
import { motion,AnimatePresence } from "framer-motion"
import { FaCircle, FaTrash } from "react-icons/fa6"
import { TodoItem } from "../TodoItem/TodoItem"


// const DeletePopover = ({idTask,detailTask,deleteTask}) => {
//   return (
//     <Popover placement='left' >
//     {({ onClose }) => (
//       <>
//         <PopoverTrigger>
//           <Box _focusVisible={{borderColor:'none'}} cursor='pointer'><FaTrash /></Box>
//         </PopoverTrigger>
//         <PopoverContent rounded='10px'  bg='todoBgHeader' arrowShadowColor='todoRed'
//                   color='todoLight' borderColor='todoRed'_focusVisible={{outline:'none'}}>
//           <PopoverArrow  bg='todoRed'/>
//           <PopoverBody p='0'>
//             <Box display='flex' alignItems='center' justifyContent='space-between'>
//               <Text ps={2} >¿Eliminar {detailTask}?</Text>
//               <Box cursor='pointer' bg='todoRed' roundedEnd='8px' border='1px solid todoRed' 
//                     onClick={() => {onClose();deleteTask(idTask)}}
//                     color='todoLight' p={3}>Eliminar</Box>
//             </Box>
//           </PopoverBody>
//         </PopoverContent>
//       </>
//     )}
//   </Popover>
//   )
// }

// const TodoItem = ({task,taskRef,index,changeStatusTask,deleteTask}) => {
//   return(
//     <motion.div layout animate={{opacity: [0, 1],y: [300, 0]}}
//                         style={{margin: '1.5rem 0'}}
//                         key={task.id}
//                         transition={{ 
//                           ype: "spring",damping: 30,
//                           duration:0.5, delay:index/8 
//                         }} 
//                         exit={{
//                           opacity: [1, 0.5],
//                           y: [0, 300],
//                           transition:{duration:.1}
//                         }}
//                           >
//             <Grid  templateColumns='repeat(6,1fr)' border='1px solid #6e6d6e' 
//                   bg='todoDark' borderRadius='1rem'
//                   ref={el => taskRef.current[index] = el}
//                   >
//               <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' bg='blu-e' py={4} onClick={() => changeStatusTask(task.id)} _hover={{cursor:'pointer'}} 
//               color={(task.complete) ? 'todoGreen' : 'todoRed'}>
//                   <FaCircle />
//               </GridItem>
              
//               <GridItem colSpan={4} textAlign='center' bg='orang-e' 
//                         py={4} onClick={() => changeStatusTask(task.id)} _hover={{cursor:'pointer'}}>
//                 <Text color='todoGray'>{task.detail}</Text>
//               </GridItem>
//               <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' bg='r-ed' py={4} 
//               // onClick={() => deleteTask(task.id)}
//               color="todoGreen">
//                 <DeletePopover idTask={task.id} detailTask={task.detail} deleteTask={deleteTask} />
//                 {/* <FaTrash /> */}
//               </GridItem>
//             </Grid>
//           </motion.div>
//   )
// }

const TodoList = ({tasks,taskRef,changeStatusTask,deleteTask}) => {
  return(
    <Box pb={6}>
          <AnimatePresence mode='sync'>
          {tasks.map((task,i) => (
            
            <TodoItem task={task} key={task.id} taskRef={taskRef} index={i} 
            changeStatusTask={changeStatusTask}
            deleteTask={deleteTask}/>
          ) )}
          </AnimatePresence>
        </Box>
  )
}

export { TodoList }