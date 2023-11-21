import { Box,Container } from "@chakra-ui/react"
import { useState,useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { FormAddTask } from "../FormAddTask/FormAddTask";
import { TodoList } from "../TodoList/TodoList";
import { Clock } from "../Clock/Clock";

const Main = () => {

  const taskList = [
    {
      id:1,
      complete:true,
      detail:'Ut hendrerit, felis vel ornare',
    },
    {
      id:2,
      complete:false,
      detail:'Vestibulum hendrerit, augue eget bibendum',
    },
    {
      id:3,
      complete:false,
      detail:'Pellentesque blandit suscipit massa, at',
    },
    {
      id:4,
      complete:false,
      detail:'Praesent non eros justo. Duis',
    },
    {
      id:5,
      complete: true,
      detail:'Sed interdum finibus urna quis',
    },
    {
      id:6,
      complete:false,
      detail:'Donec eget gravida sapien, ut',
    },
    {
      id:7,
      complete:false,
      detail:'Maecenas blandit nibh vitae nulla',
    }
  ]

  const [tasks,setTasks ] = useState([]);
  const [taskLength,setTaskLength] = useState(0);
  const [ changeStatus,setChangeStatus ] = useState({})
  // cambiar de estado cuando se elimina la tarea y volver a cambiar en el useEfect
  const [deletingTask,setDeletingTask] = useState(false); 
  
  const taskRef = useRef([]);
  

  useEffect(() => {
    console.log('useEfect task')
    setTasks(taskList)
    setTaskLength(taskList.length);
    

  },[])
  
  const motionTask = useAnimation();
  useEffect(() => {
    console.log('useEfect tasks')
    motionTask.start({
      opacity: [0, 1],
      y: [300, 0],
      transition:{ 
        duration: 0.5,
        delay:0.5 
      }
    })

    !deletingTask 
      ? window.scrollTo({top:0,left: 0,behavior:'smooth'})
      : setDeletingTask(false)
    
  },[tasks])


  const motionChangeStatus = useAnimation();
  useEffect(() => {
    console.log('cambio estado')
    motionChangeStatus.start({
      opacity: [1, 0],
      y: [300, 0],
      transition:{ 
        duration:1,
        
      }
    })

  },[changeStatus])

  const deleteTask = (id) => {
    console.log('deleteTask')
    setDeletingTask(true);
    setTasks((tasks) => {
      return tasks.filter(t => t.id != id);
    })
  }

  const changeStatusTask = (id) => {
    
    setTasks(tasks => {
      const changeTasks = tasks.map(task => {
        if(task.id == id){
          const newTask = {...task,complete:!task.complete};
          setChangeStatus(newTask);
          return newTask;
        }
        return task
      })
      return changeTasks;
    });
  }

  return(
    <Box bg='todoDark' minH='calc(100dvh - 64px)'>
      <Container pb={10}>
        {/* <DateTime /> */}
        <Clock />

        {/* TASKLIST */}
        <TodoList tasks={tasks} taskRef={taskRef} 
                  changeStatusTask={changeStatusTask}
                  deleteTask={deleteTask} />
        {/* TASKLIST */}

        {/* FORMULARIO */}
        <FormAddTask tasks={tasks} taskLength={taskLength} taskRef={taskRef} setTasks={setTasks} setTaskLength={setTaskLength}/>
        {/* FORMULARIO */}
      </Container>
      
    </Box>
  )
}

export { Main }