import { Box,Button,Container,Flex,Grid,GridItem,Input,Link,Popover,PopoverArrow,PopoverBody,PopoverCloseButton,PopoverContent,PopoverFooter,PopoverHeader,PopoverTrigger,Portal,Text, useDisclosure } from "@chakra-ui/react"
import { useState,useEffect, useRef } from "react";
import { FaTrash,FaCircle } from 'react-icons/fa6';
import { AnimatePresence, Reorder, motion, useAnimation, useDragControls } from "framer-motion";
import { Formik } from 'formik';

const DateTime = () =>{
  
  const [dateNow,setTime] = useState(new Date())

  useEffect(() => {
    // ejecuta cada 1s el cambio de fecha dentro del dateNow
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer)
  },[])
  
  const date = Intl.DateTimeFormat('es-AR',{year:'numeric',month:'long',day:'numeric'}).format(dateNow);
  const time = Intl.DateTimeFormat('es-AR', { hour: 'numeric',minute:'numeric' }).format(dateNow);

  
  return(
    <Box display='flex' flexDirection='column' alignItems='center' py={10}>
      <Text fontSize='6xl' fontWeight='300' color='todoGreen'>{time}</Text>
      <Text color='todoGray' fontSize='md'>{date}</Text>
    </Box>
    
  )
}

const DeletePopover = ({idTask,detailTask,deleteTask}) => {
  return (
    <Popover placement='left' >
    {({ onClose }) => (
      <>
        <PopoverTrigger>
          <Box _focusVisible={{borderColor:'none'}} cursor='pointer'><FaTrash /></Box>
        </PopoverTrigger>
        <PopoverContent rounded='md'  bg='todoBgHeader' arrowShadowColor='todoRed'
                  color='todoLight' borderColor='todoRed'_focusVisible={{outline:'none'}}>
          <PopoverArrow  bg='todoRed'/>
          <PopoverBody p='0'>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Text ps={2} >¿Eliminar {detailTask}?</Text>
              <Box cursor='pointer' bg='todoRed' 
                    onClick={() => {onClose();deleteTask(idTask)}}
                    color='todoLight' p={3}>Eliminar</Box>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </>
    )}
  </Popover>
  )
}

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
  // REVISAR ESTE HOOK
  const ref = useRef(null);

  const [tasks,setTasks ] = useState([]);
  const [taskLength,setTaskLength] = useState(0);
  const [inputTask,setInputTask] = useState('aaaa');
  // task existente en el listado, para mostrar y darle foco

  // cambiar de estado cuando se elimina la tarea y volver a cambiar en el useEfect
  const [deletingTask,setDeletingTask] = useState(false); 

  

  useEffect(() => {
    console.log('useEfect task')
    setTasks(taskList)
    setTaskLength(taskList.length);
    

  },[])
  
  const motionTask = useAnimation();
  
  useEffect(() => {
    
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

  const [ changeStatus,setChangeStatus ] = useState({})
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
        <DateTime />

        <Box pb={6}>
          <AnimatePresence mode='sync'>
          {tasks.map((task,i) => (
            
            <motion.div layout animate={{opacity: [0, 1],y: [300, 0]}}
                        style={{margin: '1.5rem 0'}}
                        key={task.id}
                        transition={{ 
                          ype: "spring",damping: 30,
                          duration:0.5, delay:i/8 
                        }} 
                        exit={{
                          opacity: [1, 0.5],
                          y: [0, 300],
                          transition:{duration:.1}
                        }}
                          >
            <Grid templateColumns='repeat(6,1fr)' border='1px solid #6e6d6e' 
                  bg='todoDark' borderRadius='1rem'>
              <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' bg='blu-e' py={4} onClick={() => changeStatusTask(task.id)} _hover={{cursor:'pointer'}} 
              color={(task.complete) ? 'todoGreen' : 'todoRed'}>
                  <FaCircle />
              </GridItem>
              
              <GridItem colSpan={4} textAlign='center' bg='orang-e' 
                        py={4} onClick={() => changeStatusTask(task.id)} _hover={{cursor:'pointer'}}>
                <Text color='todoGray'>{task.detail}</Text>
              </GridItem>
              <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' bg='r-ed' py={4} 
              // onClick={() => deleteTask(task.id)}
              color="todoGreen">
                <DeletePopover idTask={task.id} detailTask={task.detail} deleteTask={deleteTask} />
                {/* <FaTrash /> */}
              </GridItem>
            </Grid>
            </motion.div>
            
          ))}
          </AnimatePresence>
        </Box>

        <Box position='fixed' bottom='0' left='0' 
             w='full' bg='todoDark' zIndex={12}>
          {/* FORMULARIO */}
          <Formik 
                  initialValues={{inputTask: ''}}
                  validate={ (values) => {
                    const errors = {};
                    if(!values.inputTask){
                      errors.inputTask = 'required'
                    }
                    return errors;
                  }}
                  onSubmit={(values,{setSubmitting,resetForm}) => {
                    setTimeout(() => {
                      if(tasks.every(t => t.detail != values.inputTask)){
                        const newTask = {id:taskLength+1,complete:false,detail:values.inputTask}
                        setTaskLength(taskLength+1)
                        setTasks([newTask,...tasks])
                        setSubmitting(false)
                        resetForm({inputTask:''})
                      } 
                      
                    }, 500);
                  }}
                  >
            {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
              
              <form style={{width:'100%'}} onSubmit={handleSubmit} noValidate>
                <Box display='flex' justifyContent='center'>
                  <Input type="text" name="inputTask" isDisabled={isSubmitting} placeholder="Nueva tarea" 
                  bg='todoLight' 
                  p={7} rounded='none' focusBorderColor="transparent" maxW='md' onChange={handleChange} value={values.inputTask} />
                  
                  <Button type='submit' isLoading={isSubmitting} isDisabled={isSubmitting} color='todoDark'
                    textDecoration='none' bg='todoGreen' rounded='none' 
                    _hover={{textDecoration:'none',color: 'todoDark'}}
                    px={4} h='auto' onClick={handleSubmit}>Agregar</Button>
                </Box>
              </form>
              
            )}

          </Formik>
          
          {/* FORMULARIO */}
        </Box>
      </Container>
    </Box>
  )
}

export { Main }