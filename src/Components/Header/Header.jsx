import { Box, Container, Heading } from "@chakra-ui/react"
import '@fontsource/roboto';
const Header = () => {
  return(
    <Box as="header" bg='todoBgHeader' h='64px' 
          display='flex' alignItems='center'
          boxShadow='xl'>
      <Container display='flex' justifyContent='center'>
      <Heading 
          fontFamily='Roboto,sans-serif' 
          fontWeight='300'
          fontSize='md'
          letterSpacing='.5rem'
          textTransform='uppercase' 
          color='todoGreen'
          
          >Just to do it</Heading>

      </Container>
    </Box>
  )
}

export { Header }