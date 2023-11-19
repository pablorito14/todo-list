import { Box,Button,Container,Flex,Grid,GridItem,Input,Link,Text } from "@chakra-ui/react"
import { FaTrash,FaCircle } from 'react-icons/fa6';

// rojo de pelotitas: #fc524c
// verde de pelotitas y del resto: #00f9b6
// fondo claro: #fdfdfd
// fondo oscuro: #2f313a
// hora en thema claro: #5b5d64 (?)
const DateTime = () =>{
  
  const date = Intl.DateTimeFormat('es',{year:'numeric',month:'long',day:'numeric'}).format(new Date());
  const time = Intl.DateTimeFormat('es', { hour: 'numeric',minute:'numeric' }).format(new Date());
  return(
    <Box display='flex' flexDirection='column' alignItems='center'
          py={10} bg='r-ed'>
      <Text bg='or-ange' fontSize='6xl' fontWeight='300' color='#00f9b6'>{time}</Text>
      <Text bg='bla-ck' color='#6e6d6e' fontSize='16px'>{date}</Text>
    </Box>
  )
}

const Main = () => {
  const taskList = [
    {
      id:1,
      status:'complete',
      detail:'Ut hendrerit, felis vel ornare',
    },
    {
      id:2,
      status:'pending',
      detail:'Vestibulum hendrerit, augue eget bibendum',
    },
    {
      id:3,
      status:'pending',
      detail:'Pellentesque blandit suscipit massa, at',
    },
    {
      id:4,
      status:'pending',
      detail:'Praesent non eros justo. Duis',
    },
    {
      id:5,
      status:'complete',
      detail:'Sed interdum finibus urna quis',
    },
    {
      id:6,
      status:'complete',
      detail:'Donec eget gravida sapien, ut',
    },
    {
      id:7,
      status:'pending',
      detail:'Maecenas blandit nibh vitae nulla',
    }
  ]

  const deleteTask = (e,id) => {
    console.log('eliminar tarea')
  }

  const addTask = () => {
    console.log('agregar tarea')
  }

  const changeStatusTast = () => {
    console.log('cambiar tarea completada o pendiente')
  }
  
  return(
    <Box bg='#2f313a' minH='calc(100dvh - 64px)'>
      <Container pb={10}>
        <DateTime />

        <Box pb={6} bg='bl-ue'>
          {taskList.map((task,i) => (

            <Grid key={task.id} templateColumns='repeat(6,1fr)' my={6}
                border='1px solid #6e6d6e' borderRadius='1rem'>
              <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' bg='blu-e' py={4} onClick={changeStatusTast} _hover={{cursor:'pointer'}}>
              <FaCircle color={(task.status === 'complete' ? '#00f9b6' : '#fc524c')}/>
              {/* <FaCircle color={(task.status === 'complete' ? 'todoGreen' : 'todoRed')}/> */}
              </GridItem>
              <GridItem colSpan={4} textAlign='center' bg='orang-e' 
                        py={4} onClick={changeStatusTast} _hover={{cursor:'pointer'}}>
                <Text color='#6e6d6e'>{task.detail}</Text>
              </GridItem>
              <GridItem colSpan={1} display='flex' justifyContent='center' alignItems='center' bg='r-ed' py={4} onClick={deleteTask}>
                <FaTrash color="#00f9b6"/>
                {/* <FaTrash color="black"/> */}
              </GridItem>
            </Grid>
          ))}
          
        </Box>

        
      </Container>
      <Flex bg='#fdfdfd' position='fixed' bottom='0' w='full'>
        {/* FORMULARIO */}
        
          <Input placeholder="Nueva tarea" p={8} rounded='none' focusBorderColor="transparent"></Input>
          <Button variant='link' color='#2f313a' 
                  textDecoration='none' bg='#00f9b6' rounded='none'
                  _hover={{textDecoration:'none',color: '#2f313a'}}
                  px={4} h='auto' onClick={addTask}>Agregar</Button>

        
        {/* FORMULARIO */}
      </Flex>
    </Box>
  )
}

export { Main }