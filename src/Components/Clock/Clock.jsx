import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Clock = () => {

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

export { Clock }