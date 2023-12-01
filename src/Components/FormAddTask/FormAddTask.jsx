import { Box, Button, CloseButton, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { motion} from 'framer-motion'
import { useRef } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import '@fontsource/roboto';

const CustomToast = ({bg,error,toastIdRef,toast}) => {
  return (
    <Box position='fixed' top='1rem' px={4} left={0}  w='full' 
          display='flex' justifyContent='center'>

      <Box maxW='lg' color='white' p={3} w='full' bg={bg}  borderColor={bg} borderWidth='1px'
        display='flex' alignItems='center' justifyContent='space-between'>
        <Text>{error}</Text>
        <CloseButton onClick={() => toastIdRef.current ? toast.close(toastIdRef.current) : null}  />
      </Box>
    </Box>
  )
}

const ButtonFormAddTask = ({formAddTaskModal,confirmModal,setTask,hasTasksComplete}) => {
  const handleAddTask = () => {
    setTask(null);
    formAddTaskModal.onOpen();
  }
  const handleDeleteAll = () => {
    if(hasTasksComplete){
      setTask(null);
      confirmModal.onOpen();
    }
  }

  return (
    <Box position='fixed' bottom='0' left='0'  w='full' bg='todo-Dark'>
      <Box display='flex' justifyContent='center' gap={6} >
        <motion.div whileTap={{scale:0.9}} whileHover={{scale: [1,1.1]}}>
          <Box mb={6} p={3} color='todoDark' boxShadow='todoShadow'
              bg='todoGreen' rounded='50%' 
              // onClick={() => {setTask(null);formAddTaskModal.onOpen()}}
              onClick={handleAddTask}
              >
            <FaPlus size={25}/>
          </Box>
        </motion.div>
        
        <motion.div whileTap={{scale:0.9}} whileHover={{scale: [1,1.1]}}>
          <Box mb={6} p={3} color='todoLight' boxShadow='todoShadow'
              bg={(hasTasksComplete) ? 'todoRed' : 'todoGray'} rounded='50%' 
              // onClick={() => {setTask(null);confirmModal.onOpen()}}
              onClick={handleDeleteAll}
              >
            <FaTrash size={25}/>
          </Box>
        </motion.div>
      </Box>
    </Box>
  )
}

const FormAddTask = ({tasks,setTasks,setUpdateTaskList,formAddTaskModal,task}) => {
  console.log(task)
  const toastIdRef = useRef();
  // const [error,setError] = useState(null)

  const toast = useToast({
    position: 'top',
    isClosable:true,
    duration:30000000,
    
  })
  
  
  const validate = (values) => {
    // console.log(values)
    console.log(isNaN(new Date(values.date)))
    // console.log(!!task)
    let errors = {};
    toast.closeAll();
    
    if(values.detail.length < 2){
      errors = {
        message: 'Por favor ingrese al menos 2 letras',
        bg: 'todoRed'
      };
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg='todoRed' error={errors.message}
                      toastIdRef={toastIdRef} toast={toast}/>
        )
      })
    }

    if(isNaN(new Date(values.date))){
      errors = {
        message: 'Por favor ingrese una fecha valida',
        bg: 'todoRed'
      }
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg='todoRed' error={errors.message}
                      toastIdRef={toastIdRef} toast={toast}/>
        )
      })
    }

    const indexTask = tasks.findIndex(t => {
        if(task){
          return t.detail.toLowerCase() === values.detail.toLowerCase() && 
                  t.date === values.date && t.id != task.id
        } else {
          return t.detail.toLowerCase() === values.detail.toLowerCase() && 
                  t.date === values.date
        }
      }
    )
    // console.log(indexTask)
    if(indexTask != -1){
      errors = {
        message: 'La tarea se encuentra en el listado',
        bg: 'orange.400'
      }
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg='orange.400' error={errors.message}
                      toastIdRef={toastIdRef} toast={toast}/>
        )

      })
    }

    // if(errors.message){
    //   // inputRef.current.focus();
    //   // setError(errors)
    // }


    return errors;
  };

  

  const submit = (values,{setSubmitting,resetForm}) => {

    setTimeout(() => {
      
      let updatedTasks = [];
      if(task){
        updatedTasks = tasks.map(t => {
          if(t.id == task.id){
            const newTask = {...t,detail:values.detail,date:values.date};
            return newTask;
          }
          return t
        })
      } else {
        const id = tasks.sort((t1,t2) => t2.id - t1.id)[0]?.id ?? 0;
        const newTask = {id:id+1,complete:false,detail:values.detail,date:values.date}
        updatedTasks = [newTask,...tasks];
      }

      updatedTasks.sort((t1,t2) => {
        if(t1.date < t2.date){
          return -1;
        } else if(t1.date > t2.date){
          return 1;
        }

        return 0;
      })
      setTasks(updatedTasks);

      window.scrollTo({top:0,left: 0,behavior:'smooth'})
      setUpdateTaskList(true);
      setSubmitting(false)
    
      formAddTaskModal.onClose();
    }, 500);
  };

  // const bgForm=useColorModeValue('todoLight','todoDark')
  const borderColor = useColorModeValue('gray.200','transparent')

  // const [showForm, setShowForm] = useState(false)

  const bgOverlay = useColorModeValue('blackAlpha.200','blackAlpha.600')
  const bgModal = useColorModeValue('todoLight','todoDark')
  const fontColorModal = useColorModeValue('todoDark','todoLight')
  
  const dateToInput = () => {
    const now = new Date();
    const date = `${now.getFullYear()}-${('0'+(now.getMonth()+1)).slice(-2)}-${('0'+now.getDate()).slice(-2)}`;
    const time = `${('0'+now.getHours()).slice(-2)}:${('0'+now.getMinutes()).slice(-2)}`;
    
    // setDate(`${date}T${time}`)
    return `${date}T${time}`;
  }
  
  const initialValues = {
    detail: task ? task.detail : '' ,
    date: task ? task.date : dateToInput()
  }

  return(
  <>
    {/* <Box position='fix-ed' bottom='0' left='0'  w='full' bg='todo-Dark'> */}
      {/* icono */}
      {/* <ButtonFormAddTask onOpen={onOpen}/> */}

      {/* NEW FORM IN MODAL */}
      {formAddTaskModal.isOpen  && <>
        
        <Modal onClose={formAddTaskModal.onClose} isOpen={formAddTaskModal.isOpen} isCentered->
          <ModalOverlay backdropFilter='blur(3px)' bg={bgOverlay}/>
          
          <ModalContent mx={4} rounded='none' mt={20}>
            <ModalBody p={0}  borderWidth='1px' borderColor='todoGreen' bg={bgModal} color={fontColorModal}>
            
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={submit}
                validateOnChange={false}
                
                >
                {({values,errors,handleChange,handleSubmit,isSubmitting}) => (
                        
                  <form style={{width:'100%'}} onSubmit={handleSubmit} noValidate>
                    
                    <Box display='flex' flexDirection='column' alignItems='center' >
                      
                      <Box maxW='lg' w='full' display='flex' justifyContent='center' 
                          // bg={bgForm} 
                          border={borderColor}>
                        <Box>

                          <Input as='input' type="text" name="detail" isDisabled={isSubmitting} 
                            placeholder="Nueva tarea" 
                            // bg='todoLight'
                            fontWeight='400' 
                            py={7}
                            px={4}
                            rounded='none'  maxW='md' 
                            _placeholder={{ color:'gray.400' }}
                            _focusVisible={{ boxShadow: 'none'}}
                            // color='todoLight'
                            color={fontColorModal} 
                            onChange={handleChange} value={values.detail} />
                      
                          <Input as='input' type="datetime-local" name="date" isDisabled={isSubmitting} 
                            // placeholder="Fecha nueva tarea" 
                            // bg='todoLight'
                            fontWeight='400' 
                            py={7}
                            px={4} 
                            rounded='none' 
                            
                            maxW='md'
                            // color={}
                            _placeholder={{ color:'gray.400' }}
                            _focusVisible={{ boxShadow: 'none'}}
                            // color='blackAlpha.800'
                            color={fontColorModal} // cambiar color con el tema
                            
                            // textColor='blue'
                            onChange={handleChange} value={values.date} />
                        </Box>
                      
                        <Box display='flex'>
                          <motion.div whileTap={{scale:0.9}}>
                            <Button type='submit' isLoading={isSubmitting} isDisabled={isSubmitting} 
                                    borderWidth='1px 1px 1px 0px' textTransform='uppercase'
                                    color='todoDark' textDecoration='none' bg='todoGreen' rounded='none' 
                                    fontWeight='400' _active={{color: 'todoDark'}} _hover={{color: 'todoDark'}}
                                    px={task ? 4 : 2} h='full'onClick={handleSubmit}>{task ? 'Editar' : 'Agregar'}</Button>
                          </motion.div>
                        </Box>
                      </Box>
                    </Box>
                    
                  </form>
                  
                )}

              </Formik>
                      
            </ModalBody>
            
          </ModalContent>
          
        </Modal>
        </>
      }
    {/* </Box> */}
  </>
  )
}



export { FormAddTask,ButtonFormAddTask }