import { Box,Button,CloseButton,Container,Flex,Grid,GridItem,Input,Link,Popover,PopoverArrow,PopoverBody,PopoverCloseButton,PopoverContent,PopoverFooter,PopoverHeader,PopoverTrigger,Portal,Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useState,useEffect, useRef, createRef } from "react";
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
        <PopoverContent rounded='10px'  bg='todoBgHeader' arrowShadowColor='todoRed'
                  color='todoLight' borderColor='todoRed'_focusVisible={{outline:'none'}}>
          <PopoverArrow  bg='todoRed'/>
          <PopoverBody p='0'>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Text ps={2} >¿Eliminar {detailTask}?</Text>
              <Box cursor='pointer' bg='todoRed' roundedEnd='8px' border='1px solid todoRed' 
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

const CustomToast = ({bg,error,toastIdRef,toast}) => {
  return (
    <Box color='white' p={3} bg={bg} display='flex' alignItems='center' justifyContent='space-between'>
      <Text>{error}</Text>
      <CloseButton onClick={() => toastIdRef.current ? toast.close(toastIdRef.current) : null}  />
    </Box>
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

  const [tasks,setTasks ] = useState([]);
  const [taskLength,setTaskLength] = useState(0);

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

  const validate = (values) => {
    const errors = {};

    if(values.inputTask.length < 2){
      errors.inputTask = 'Mínimo 2 letras requeridas'
    }
    
    const indexTask = tasks.findIndex(t => t.detail === values.inputTask)
    if(indexTask != -1){
      myRef.current[indexTask].style.borderColor = '#fc524c';
      myRef.current[indexTask].scrollIntoView({ block: "center", behavior: "smooth" })
      errors.exists = 'Tarea en el listado'
    } else {
      myRef.current.map(element => 
        element && (element.style.borderColor='#6e6d6e') );
    }

    toast.closeAll();
    if(errors.inputTask){
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg='todoRed' error={errors.inputTask}
                      toastIdRef={toastIdRef} toast={toast}/>
        )
      })
    }

    if(errors.exists){
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg='orange.400' error={errors.exists}
                      toastIdRef={toastIdRef} toast={toast}/>
        )

      })
    }

    
    return errors;
  }
  const toast = useToast({
    position: 'top',
    isClosable:true,
    duration:2000,
  })
  const toastIdRef = useRef();
  
  const myRef = useRef([]);
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
                        
                        // ref={el => myRef.current = [...myRef.current, el]}
                          >
            <Grid  templateColumns='repeat(6,1fr)' border='1px solid #6e6d6e' 
                  bg='todoDark' borderRadius='1rem'
                  ref={el => myRef.current[i] = el}
                  >
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
            
          ) )}
          </AnimatePresence>
        </Box>

        <Box position='fixed' bottom='0' left='0' 
             w='full' bg='todoDark' zIndex={12}>
          {/* FORMULARIO */}
          <Formik 
                  initialValues={{inputTask: ''}}
                  validate={validate}
                  onSubmit={(values,{setSubmitting,resetForm}) => {
                    console.log('onsubmit')
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
                  validateOnChange={false}
                  >
            {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
              
              <form style={{width:'100%'}} onSubmit={handleSubmit} noValidate>
                <Box display='flex' justifyContent='center'>
                  <Input type="text" name="inputTask" isDisabled={isSubmitting} placeholder="Nueva tarea" 
                  bg='todoLight' fontWeight='400'
                  p={7} rounded='none' border='none' focusBorderColor="transparent" maxW='md' onChange={handleChange} value={values.inputTask} />
                  <Box display='flex'>
                  <motion.div 
                    whileTap={{scale:0.9}}
                    // whileHover={{opacity:0.9}}
                    >

                  <Button type='submit' isLoading={isSubmitting} isDisabled={isSubmitting} color='todoDark'
                    textDecoration='none' bg='todoGreen' rounded='none' fontWeight='400'
                    _active={{color: 'todoDark'}}
                    _hover={{color: 'todoDark'}}
                    px={2} h='full' onClick={handleSubmit}>Agregar</Button>
                  </motion.div>
                  </Box>
                  {/* <Button type='submit' isLoading={isSubmitting} isDisabled={isSubmitting} color='todoDark'
                    textDecoration='none' bg='todoGreen' rounded='none' 
                    _hover={{textDecoration:'none',color: 'todoDark'}}
                    px={4} h='auto' onClick={handleSubmit}>Agregar</Button> */}
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