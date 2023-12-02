import { Box } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"
import { useFunctionContext } from "../../Providers/TaskProvider"

const TodoList = () => {
  const {tasks} = useFunctionContext();
  
  return(
    <Box pb={6}>
      <AnimatePresence mode='sync'>
        {tasks.map((task,i) => (<TodoItem task={task} key={task.id} index={i} />) )}
      </AnimatePresence>
    </Box>
  )
}

export { TodoList }