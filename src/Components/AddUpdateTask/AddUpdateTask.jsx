import { Box, Button, CloseButton, Input, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { motion} from 'framer-motion'
import { useRef } from 'react';
import { useFunctionContext } from '../../Providers/TaskProvider';

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

const AddUpdateTask = () => {
  
  const {task,formAddTaskModal,setTask,updateTask,addTask,
        lengthValidation,dateValidation,inArrayValidation} = useFunctionContext();
  const borderColor = useColorModeValue('gray.200','transparent')
  const fontColor = useColorModeValue('todoDark','todoLight')
  const toastIdRef = useRef();
  const toast = useToast({
    position: 'top',
    isClosable:true,
    duration:3000,
    
  })
  const validate = (values) => {
    toast.closeAll();
    const errors = lengthValidation(values.detail) ||
              dateValidation(values.date) ||
              inArrayValidation(values)

    if(errors){
      toastIdRef.current = toast({
        render: () => (
          <CustomToast bg={errors.bg} error={errors.message}
                      toastIdRef={toastIdRef} toast={toast}/>
        )
      })
    }

    return errors;
  };

  const submit = (values,{setSubmitting,resetForm}) => {
    setTimeout(() => {
      if(task){
        setTask(task);
        updateTask(values)
      } else {
        addTask(values);
      }
      window.scrollTo({top:0,left: 0,behavior:'smooth'})
      setSubmitting(false)
      formAddTaskModal.onClose();
    }, 500);
  };
  const dateToInput = () => {
    const now = new Date();
    const date = `${now.getFullYear()}-${('0'+(now.getMonth()+1)).slice(-2)}-${('0'+now.getDate()).slice(-2)}`;
    const time = `${('0'+now.getHours()).slice(-2)}:${('0'+now.getMinutes()).slice(-2)}`;
    
    return `${date}T${time}`;
  }
  
  const initialValues = {
    detail: task ? task.detail : '' ,
    date: task ? task.date : dateToInput()
  }
  
  return(
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submit}
      validateOnChange={false}>
      {({values,handleChange,handleSubmit,isSubmitting}) => (
        <form style={{width:'100%'}} onSubmit={handleSubmit} noValidate>
          <Box display='flex' flexDirection='column' alignItems='center' >
            <Box maxW='lg' w='full' display='flex' justifyContent='center' border={borderColor}>
              <Box>
                <Input as='input' type="text" name="detail" isDisabled={isSubmitting} 
                      placeholder="Nueva tarea" fontWeight='400' py={7} px={4} rounded='none'  
                      maxW='md' _placeholder={{ color:'gray.400' }} _focusVisible={{ boxShadow: 'none'}}
                      color={fontColor} onChange={handleChange} value={values.detail} />
                <Input as='input' type="datetime-local" name="date" isDisabled={isSubmitting} 
                      fontWeight='400' py={7} px={4} rounded='none' maxW='md'
                      _placeholder={{ color:'gray.400' }} _focusVisible={{ boxShadow: 'none'}}
                      color={fontColor} onChange={handleChange} value={values.date} />
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
  )
}

export { AddUpdateTask }