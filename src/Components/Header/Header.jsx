import { Box, Container, Heading, Link } from "@chakra-ui/react"
import '@fontsource/roboto';
import { FaMugHot } from "react-icons/fa6";

const Header = () => {
  return(
    <Box as="header" bg='todoBgHeader' h='64px' 
          display='flex' position='sticky' alignItems='center'
          boxShadow='todoShadow'>
      <Container>
        <Heading fontFamily='Roboto,sans-serif' textAlign='center' fontWeight='300'
                fontSize='md' letterSpacing='.5rem' textTransform='uppercase' 
                color='todoGreen'>Just to do it</Heading>
        
        <Box display='flex' justifyContent='end'>
          <Box top={4} p={2} position='absolute' color='todoGray' rounded='50%'>
            <Link href="https://cafecito.app/pablorito" target="_blank">
              <FaMugHot />
            </Link>
          </Box>
        </Box>
        
      </Container>
    </Box>
  )
}

export { Header }