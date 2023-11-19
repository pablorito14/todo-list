import { Box, Container, Heading } from "@chakra-ui/react"
import '@fontsource/roboto';
const Header = () => {
  return(
    <Box as="header" bg='#262831' h='64px' 
          display='flex' alignItems='center'
          boxShadow='dark-lg'>
      <Container display='flex' justifyContent='center'>
      <Heading 
          fontFamily='Roboto,sans-serif' 
          fontWeight='300'
          fontSize='md'
          letterSpacing='.5rem'
          textTransform='uppercase' 
          color='#00f9b6'
          
          >Just to do it</Heading>

      </Container>
    </Box>
  )
}

export { Header }