import { Box, Button, CloseButton, Input, Text, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { motion} from 'framer-motion'
import { useRef } from 'react';

const CustomToast = ({bg,error,toastIdRef,toast}) => {
  return (
    <Box position='fixed' left='0' bottom='4rem' w='full' 
          display='flex' justifyContent='center'>

    <Box maxW='lg' color='white' p={3} w='full' bg={bg} 
        display='flex' alignItems='center' justifyContent='space-between'>
      <Text>{error}</Text>
      <CloseButton onClick={() => toastIdRef.current ? toast.close(toastIdRef.current) : null}  />
    </Box>
    </Box>
  )
}

const FormAddTask = ({tasks,setTasks,setUpdateTaskList}) => {

  const inputRef = useRef();
  const toastIdRef = useRef();

  const toast = useToast({
    position: 'bottom',
    isClosable:true,
    duration:2000,
  })
  
  
  const validate = (values) => {
    
    const errors = {};
    toast.closeAll();
    
    if(values.inputTask.length < 2){
      errors.message= 'Por favor ingrese al menos 2 letras';
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg='todoRed' error={errors.message}
                      toastIdRef={toastIdRef} toast={toast}/>
        )
      })
    }

    const indexTask = tasks.findIndex(t => t.detail.toLowerCase() === values.inputTask.toLowerCase())
    if(indexTask != -1){
      errors.message = 'La tarea se encuentra en el listado';
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg='orange.400' error={errors.message}
                      toastIdRef={toastIdRef} toast={toast}/>
        )

      })
    }

    if(errors.message){
      inputRef.current.focus();
    }

    return errors;
  };

  const submit = (values,{setSubmitting,resetForm}) => {
    console.log('onsubmit')
    setTimeout(() => {
      
      const id = tasks.sort((t1,t2) => t2.id - t1.id)[0]?.id ?? 0;
      
      const newTask = {id:id+1,complete:false,detail:values.inputTask}
      window.scrollTo({top:0,left: 0,behavior:'smooth'})
      setTasks([newTask,...tasks])
      setUpdateTaskList(true);
      setSubmitting(false)
      resetForm()
      
    }, 500);
  };

  const bgForm=useColorModeValue('todoLight','todoDark')
  const borderColor = useColorModeValue('gray.200','transparent')

  return(
    <Box 
          position='fixed' bottom='0' left='0'  w='full' bg='todo-Dark'>
      
      <Formik
        initialValues={{inputTask: ''}}
        validate={validate}
        onSubmit={submit}
        validateOnChange={false}
        >
        {({values,handleChange,handleSubmit,isSubmitting}) => (
                
          <form 
          style={{width:'100%'}} 
          onSubmit={handleSubmit} noValidate>
            <Box display='flex' flexDirection='column' alignItems='center' >
              
              <Box maxW='lg' w='full' display='flex' justifyContent='center' 
                    bg={bgForm} border={borderColor}>
                    
                <Input as='input' type="text" name="inputTask" isDisabled={isSubmitting} 
                      placeholder="Nueva tarea" bg='todoLight'
                      fontWeight='400' p={7} rounded='none'  maxW='md' ref={inputRef}
                      _placeholder={{ color:'gray.400' }}
                      _focusVisible={{ boxShadow: 'none'}}
                      color='blackAlpha.800'
                      onChange={handleChange} value={values.inputTask} />
                <Box display='flex'>
                  <motion.div whileTap={{scale:0.9}}>
                    <Button type='submit' isLoading={isSubmitting} isDisabled={isSubmitting} 
                            borderWidth='1px 1px 1px 0px' textTransform='uppercase'
                            color='todoDark' textDecoration='none' bg='todoGreen' rounded='none' 
                            fontWeight='400' _active={{color: 'todoDark'}} _hover={{color: 'todoDark'}}
                            px={2} h='full'onClick={handleSubmit}>Agregar</Button>
                  </motion.div>
                </Box>
              </Box>
            </Box>
          </form>
        )}

      </Formik>
    </Box>
  )
}

export { FormAddTask }