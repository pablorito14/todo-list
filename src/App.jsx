import './App.css'
import { Header } from './Components/Header/Header'
import { Main } from './Components/Main/Main'
import { Footer } from './Components/Footer/Footer'
import theme from './Theme'

import {ChakraProvider, createLocalStorageManager} from '@chakra-ui/react'

function App() {
  const manager = createLocalStorageManager('color_mode_g')
  return (
      <ChakraProvider theme={theme} colorModeManager={manager}>
        <Header />
        <Main />
        {/* <Footer /> */}
      </ChakraProvider>
  )
}

export default App
