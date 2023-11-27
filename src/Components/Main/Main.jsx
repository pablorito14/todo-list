import { Box,Container, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { FormAddTask } from "../FormAddTask/FormAddTask";
import { TodoList } from "../TodoList/TodoList";
import { Clock } from "../Clock/Clock";
import { IoMoon,IoSunny } from "react-icons/io5";
 
const Main = () => {

  const [tasks,setTasks ] = useState([]);
  const [updateTaskList,setUpdateTaskList] = useState(false);
  // const [darkMode,setDarkMode] = useState(true);
  
  useEffect(() => {
    const tasklist = JSON.parse(localStorage.getItem('taskList_g')) ?? [];
    setTasks(tasklist)
  },[])
  
  useEffect(() => {
    if(updateTaskList){
      localStorage.setItem('taskList_g',JSON.stringify(tasks));
      setUpdateTaskList(false);
    }
  },[tasks])

  const deleteTask = (id) => {
    setUpdateTaskList(true);
    setTasks((tasks) => {
      return tasks.filter(t => t.id != id);
    })
  }

  const changeStatusTask = (id) => {
    setUpdateTaskList(true);
    setTasks(tasks => {
      const changeTasks = tasks.map(task => {
        if(task.id == id){
          const newTask = {...task,complete:!task.complete};
          return newTask;
        }
        return task
      })
      return changeTasks;
    });
  }

  const formAddTaskProps = {
    tasks:tasks, 
    setTasks:setTasks,
    setUpdateTaskList:setUpdateTaskList
  }

  const todoListProps = {
    tasks:tasks, 
    changeStatusTask:changeStatusTask,
    deleteTask:deleteTask
  }

  const { toggleColorMode } = useColorMode();
  const bgMain = useColorModeValue('todoLight','todoDark')
  const bgToggleTheme = useColorModeValue('#6e6d6e30','todoGreen')
  const iconTheme = useColorModeValue(<IoMoon />,<IoSunny />)

  return(
    <Box bg={bgMain} minH='calc(100dvh - 64px)'>
      <Container pb={10}>

        <Box display='flex' justifyContent='end' >
          <Box mt={5} p={2} position='absolute' color='todoDark'
              bg={bgToggleTheme} rounded='50%' onClick={toggleColorMode}>
            {iconTheme}
          </Box>
        </Box>

        {/* RELOJ */}
        <Clock />
        {/* RELOJ */}

        {/* TASKLIST */}
        <TodoList {...todoListProps} />
        {/* TASKLIST */}

        {/* FORMULARIO */}
        <FormAddTask {...formAddTaskProps}/>
        {/* FORMULARIO */}

      </Container>
    </Box>
  )
}

export { Main }