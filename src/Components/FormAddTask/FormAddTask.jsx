import { Box, Button, CloseButton, Input, Text, useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import {motion} from 'framer-motion'
import { useRef } from 'react';

const CustomToast = ({bg,error,toastIdRef,toast}) => {
  return (
    <Box color='white' p={3} bg={bg} display='flex' alignItems='center' justifyContent='space-between'>
      <Text>{error}</Text>
      <CloseButton onClick={() => toastIdRef.current ? toast.close(toastIdRef.current) : null}  />
    </Box>
  )
}

const FormAddTask = ({tasks,taskLength,taskRef,setTasks,setTaskLength}) => {
  
  const toast = useToast({
    position: 'top',
    isClosable:true,
    duration:2000,
  })
  const toastIdRef = useRef();
  
  const validate = (values) => {
    const errors = {};

    if(values.inputTask.length < 2){
      errors.inputTask = 'Mínimo 2 letras requeridas'
    }
    
    const indexTask = tasks.findIndex(t => t.detail === values.inputTask)
    if(indexTask != -1){
      taskRef.current[indexTask].style.borderColor = '#fc524c';
      taskRef.current[indexTask].scrollIntoView({ block: "center", behavior: "smooth" })
      errors.exists = 'Tarea en el listado'
    } else {
      taskRef.current.map(element => 
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
  };

  const submit = (values,{setSubmitting,resetForm}) => {
    console.log('onsubmit')
    setTimeout(() => {
      if(tasks.every(t => t.detail != values.inputTask)){
        const newTask = {id:taskLength+1,complete:false,detail:values.inputTask}
        setTaskLength(taskLength+1)
        setTasks([newTask,...tasks])
        setSubmitting(false)
        resetForm()
      } 
      
    }, 500);
  };

  return(
    <Box position='fixed' bottom='0' left='0' 
          w='full' bg='todoDark' zIndex={12}>

      <Formik 
        initialValues={{inputTask: ''}}
        validate={validate}
        onSubmit={submit}
        validateOnChange={false}
        >
        {({values,handleChange,handleSubmit,isSubmitting}) => (
                
          <form style={{width:'100%'}} onSubmit={handleSubmit} noValidate>
            <Box display='flex' justifyContent='center'>
              <Input type="text" name="inputTask" isDisabled={isSubmitting} 
                    placeholder="Nueva tarea" bg='todoLight' 
                    fontWeight='400' p={7} rounded='none' border='none' 
                    focusBorderColor="transparent" maxW='md' 
                    onChange={handleChange} value={values.inputTask} />
              <Box display='flex'>
                <motion.div 
                  whileTap={{scale:0.9}}
                  // whileHover={{opacity:0.9}}
                  >

                  <Button type='submit' isLoading={isSubmitting} isDisabled={isSubmitting} 
                          color='todoDark' textDecoration='none' bg='todoGreen' rounded='none' 
                          fontWeight='400' _active={{color: 'todoDark'}} _hover={{color: 'todoDark'}}
                          px={2} h='full' onClick={handleSubmit}>Agregar</Button>
                </motion.div>
              </Box>
            </Box>
          </form>
        )}

      </Formik>
    </Box>
  )
}

export { FormAddTask }