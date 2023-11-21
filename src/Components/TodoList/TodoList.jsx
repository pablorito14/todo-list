import { Box } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"


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