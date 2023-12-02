import { useDisclosure } from "@chakra-ui/react";
import { useState,useEffect,useContext,createContext } from "react";

const functionContext = createContext();

export const useFunctionContext = () => {
  return useContext(functionContext);
}

export const TasksProvider = ({children}) => {

  // listado de tareas
  const [tasks,setTasks ] = useState([]); 
   // bandera para actualizar localstorage
  const [updateTaskList,setUpdateTaskList] = useState(false);
  // tarea seleccionada para actualizar o eliminar
  const [task,setTask] = useState(null);

  // modal agregar/editar tarea
  const formAddTaskModal = useDisclosure();

  // modal confirmar eliminar tareas
  const confirmModal = useDisclosure()

  useEffect(() => {
    const tasklist = JSON.parse(localStorage.getItem('todoList')) ?? [];

    if(tasklist){
      tasklist.sort((t1,t2) => {
        if(t1.date < t2.date){
          return -1;
        } else if(t1.date > t2.date){
          return 1;
        }

        return 0;
      })
    }

    setTasks(tasklist)
  },[])
  
  useEffect(() => {
    if(updateTaskList){
      localStorage.setItem('todoList',JSON.stringify(tasks));
      setUpdateTaskList(false);
    }
  },[tasks])

  const updateLocalstorage = () => {
    setUpdateTaskList(true);
  }

  const deleteTask = () => {
    setTasks((tasks) => tasks.filter(t => t.id != task.id))
    updateLocalstorage();
  }

  const changeStatusTask = (id) => {
    setTasks(tasks => {
      const changeTasks = tasks.map(t => {
        if(t.id == id){
          const newTask = {...t,complete:!t.complete};
          return newTask;
        }
        return t
      })
      return changeTasks;
    });
    updateLocalstorage();
  }

  const addTask = (values) => {
    const id = tasks.sort((t1,t2) => t2.id - t1.id)[0]?.id ?? 0;
    const newTask = {id:id+1,complete:false,detail:values.detail,date:values.date}
    const updatedTasks = [newTask,...tasks];
    updatedTasks.sort((t1,t2) => {
      if(t1.date < t2.date){
        return -1;
      } else if(t1.date > t2.date){
        return 1;
      }

      return 0;
    })
    setTasks(updatedTasks);
    updateLocalstorage();
  }

  const updateTask = (values) => {
    const updatedTasks = tasks.map(t => {
      if(t.id == task.id){
        const newTask = {...t,detail:values.detail,date:values.date};
        return newTask;
      }
      return t
    })
    updatedTasks.sort((t1,t2) => {
      if(t1.date < t2.date){
        return -1;
      } else if(t1.date > t2.date){
        return 1;
      }

      return 0;
    })
    setTasks(updatedTasks);
    updateLocalstorage();
  }

  const deleteCompleteTask = () => {
    const taskListIncomplete = tasks.filter(t => !t.complete)
    setTasks(taskListIncomplete)
    updateLocalstorage(); 
  }

  const lengthValidation = (detail) => {
    if(detail.length < 2){
      return {
        message: 'Por favor ingrese al menos 2 letras',
        bg: 'todoRed'
      }
    } 

    return null;
  }

  const dateValidation = (date) => {
    if(isNaN(new Date(date))){
      return {
        message: 'Por favor ingrese una fecha valida',
        bg: 'todoRed'
      }
    }

    return null;
  }

  const inArrayValidation = (values) => {
    const indexTask = tasks.findIndex(t => {
      if(task){
        return t.detail.toLowerCase() === values.detail.toLowerCase() && 
                t.date === values.date && t.id != task.id
      } else {
        return t.detail.toLowerCase() === values.detail.toLowerCase() && 
                t.date === values.date
      }
    })

    if(indexTask != -1){
      return {
        message: 'La tarea se encuentra en el listado',
        bg: 'orange.400'
      }
      
    }
    return null;
  }

  const dataContext = {
    tasks,
    task,
    setTask,
    addTask,
    updateTask,
    changeStatusTask,
    deleteTask,
    deleteCompleteTask,
    lengthValidation,dateValidation,inArrayValidation,
    formAddTaskModal,
    confirmModal
  }

  return (
    <functionContext.Provider value={dataContext}>
      {children}
    </functionContext.Provider>
  )
}