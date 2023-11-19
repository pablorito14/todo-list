import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import './App.css'
import { Header } from './Components/Header/Header'
import { Main } from './Components/Main/Main'
import { Footer } from './Components/Footer/Footer'
import theme from './Theme'



function App() {

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Main />
      {/* <Footer /> */}
    </ChakraProvider>
  )
}

export default App
