import { Box,Container, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { AddDelButtons } from '../AddDelButtons/AddDelButtons'
import { TodoList } from "../TodoList/TodoList";
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { Clock } from "../Clock/Clock";
import { IoMoon,IoSunny } from "react-icons/io5";
import { useFunctionContext } from "../../Providers/TaskProvider";
import { FormModal } from "../FormModal/FormModal";

const ButtonColorMode = () => {
  const { toggleColorMode } = useColorMode();
  const bgToggleTheme = useColorModeValue('#6e6d6e30','todoGreen');
  const iconTheme = useColorModeValue(<IoMoon />,<IoSunny />)
  return (
    <Box display='flex' justifyContent='end' >
      <Box mt={5} p={2} position='absolute' color='todoDark'
          bg={bgToggleTheme} rounded='50%' onClick={toggleColorMode}>
        {iconTheme}
      </Box>
    </Box>
  )
}

const Main = () => {

  const {formAddTaskModal,confirmModal} = useFunctionContext();
  const bgMain = useColorModeValue('todoLight','todoDark')

  return(
    <Box bg={bgMain} minH='calc(100dvh - 64px)'>
      <Container pb={10}>
        <ButtonColorMode />
        <Clock />
        <TodoList/>
        <AddDelButtons />
        
        {confirmModal.isOpen && <ConfirmModal/>}
        {formAddTaskModal.isOpen && <FormModal />}

      </Container>
    </Box>
  )
}

export { Main }