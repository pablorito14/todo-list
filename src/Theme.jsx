// rojo de pelotitas: #fc524c
// verde de pelotitas y del resto: #00f9b6
// fondo claro: #fdfdfd
// fondo oscuro: #2f313a

import { extendTheme } from "@chakra-ui/react";

// hora en thema claro: #5b5d64 (?)
// const colors = {
//   'todoRed': 'red',
//   'todoGreen':'green'
// }
const colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#00FF00",
  white: "#FFFFFF"
}

const theme = extendTheme({colors})

export default theme;