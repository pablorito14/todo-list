// rojo de pelotitas: #fc524c
// verde de pelotitas y del resto: #00f9b6
// fondo claro: #fdfdfd
// fondo oscuro: #2f313a
// hora en thema claro: #5b5d64 (?)

import { extendTheme } from "@chakra-ui/react";

const colors = {
  'todoRed': '#fc524c',
  'todoGreen':'#00f9b6',
  'todoGreenLight':'#00f9d6',
  'todoGray':'#6e6d6e',
  'todoLight':'#fdfdfd',
  'todoDark':'#2f313a',
  'clockfontDark':'#00f9b6',
  'clockfontLight':'#5b5d64',
  'todoBgHeader':'#262831',
  'todoBorderLight':'#6e6d6e30',
  'todoBorderDark':'#6e6d6e'
}

const shadows = {
  'todoShadow':'0px 10px 15px -2px rgba(0,0,0,0.3)'
}

const theme = extendTheme({colors,shadows})

export default theme;