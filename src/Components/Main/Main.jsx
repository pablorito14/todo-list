import { Box,Container } from "@chakra-ui/react"
import { useState,useEffect, useRef } from "react";
import { FormAddTask } from "../FormAddTask/FormAddTask";
import { TodoList } from "../TodoList/TodoList";
import { Clock } from "../Clock/Clock";

const Main = () => {

  const [tasks,setTasks ] = useState([]);
  const [updateTaskList,setUpdateTaskList] = useState(false);
  
  const taskRef = useRef([]);

  useEffect(() => {
    console.log('useEffect onload')

    const tasklist = JSON.parse(localStorage.getItem('taskList')) ?? [];
    setTasks(tasklist)

  },[])
  
  useEffect(() => {
    console.log('useEffect update tasks')

    if(updateTaskList){
      console.log('actualizar localstorage')
      
      localStorage.setItem('taskList',JSON.stringify(tasks));
      setUpdateTaskList(false);
    
    }

  },[tasks])

  const deleteTask = (id) => {
    console.log('deleteTask')
    setUpdateTaskList(true);
    setTasks((tasks) => {
      return tasks.filter(t => t.id != id);
    })
  }

  const changeStatusTask = (id) => {
    console.log('changeStatusTask')
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

  return(
    <Box bg='todoDark' 
          minH='calc(100dvh - 64px)'
          >
      <Container pb={10}>
        {/* <DateTime /> */}
        <Clock />

        {/* TASKLIST */}
        <TodoList {...todoListProps} />
        {/* TASKLIST */}

        <FormAddTask {...formAddTaskProps}/>
        {/* <FormAddTask tasks={tasks} taskLength={taskLength} taskRef={taskRef} setTasks={setTasks} setTaskLength={setTaskLength} setUpdateTaskList={setUpdateTaskList}/> */}
        {/* FORMULARIO */}
      </Container>
      {/* <Container>
        <FormAddTask {...formAddTaskProps}/>
      </Container> */}
      
    </Box>
  )
}

export { Main }