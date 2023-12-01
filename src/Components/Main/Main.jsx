import { Box,Container, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { useState,useEffect } from "react";
import { ButtonFormAddTask, FormAddTask } from "../FormAddTask/FormAddTask";
import { ConfirmModal, TodoList } from "../TodoList/TodoList";
import { Clock } from "../Clock/Clock";
import { IoMoon,IoSunny } from "react-icons/io5";


const ButtonColorMode = () => {
  const { toggleColorMode } = useColorMode();
  const bgToggleTheme = useColorModeValue('#6e6d6e30','todoGreen');
  const iconTheme = useColorModeValue(<IoMoon />,<IoSunny />)
  return (
    <Box display='flex' justifyContent='end' >
      <Box mt={5} p={2} position='absolute' color='todoDark'
          bg={bgToggleTheme} rounded='50%' onClick={toggleColorMode}>
        {iconTheme}
      </Box>
    </Box>
  )
}

const Main = () => {

  const [tasks,setTasks ] = useState([]);
  const [updateTaskList,setUpdateTaskList] = useState(false);
  const [task,setTask] = useState(null);

  const formAddTaskModal = useDisclosure();
  const confirmModal = useDisclosure()
  
  useEffect(() => {
    const tasklist = JSON.parse(localStorage.getItem('todoList')) ?? [];
    setTasks(tasklist)
  },[])
  
  useEffect(() => {
    if(updateTaskList){
      localStorage.setItem('todoList',JSON.stringify(tasks));
      setUpdateTaskList(false);
    }
  },[tasks])

  const deleteTask = (id) => {
    if(id === -1){
      console.log('buscar tareas completadas')
      const taskListIncomplete = tasks.filter(t => !t.complete)
      setTasks(taskListIncomplete)
    } else {
      setTasks((tasks) => {
        return tasks.filter(t => t.id != id);
      })
    }
    setUpdateTaskList(true);
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

  const updateTask = (id) => {
    console.log('actualizar tareas +'+id)
  }

  const formAddTaskProps = {
    tasks:tasks, 
    setTasks:setTasks,
    setUpdateTaskList:setUpdateTaskList,
    updateTask: updateTask
  }

  const todoListProps = {
    tasks:tasks, 
    changeStatusTask:changeStatusTask,
    deleteTask:deleteTask,
    updateTask: updateTask
  }

  const bgMain = useColorModeValue('todoLight','todoDark')

  return(
    <Box bg={bgMain} minH='calc(100dvh - 64px)'>
      <Container pb={10}>

        <ButtonColorMode />

        {/* RELOJ */}
        <Clock />
        {/* RELOJ */}

        {/* TASKLIST */}
        <TodoList {...todoListProps} setTask={setTask} formAddTaskModal={formAddTaskModal} confirmModal={confirmModal}/>
        {/* TASKLIST */}

        {/* BOTONES ABRIR FORM Y ELIMINAR TODO */}
        <ButtonFormAddTask formAddTaskModal={formAddTaskModal} confirmModal={confirmModal} deleteTask={deleteTask} setTask={setTask} hasTasksComplete={tasks.some(t => t.complete)}/>
        {/* BOTONES ABRIR FORM Y ELIMINAR TODO */}
        
        {/* MODAL CONFIRMAR ELIMINACION */}
        {confirmModal.isOpen && <ConfirmModal confirmModal={confirmModal} task={task}  deleteTask={deleteTask}/>}
        {/* MODAL CONFIRMAR ELIMINACION

        {/* FORMULARIO */}
        {formAddTaskModal.isOpen && <FormAddTask formAddTaskModal={formAddTaskModal} task={task} {...formAddTaskProps}/>}
        {/* FORMULARIO */}

      </Container>
    </Box>
  )
}

export { Main }