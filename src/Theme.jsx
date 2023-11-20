// rojo de pelotitas: #fc524c
// verde de pelotitas y del resto: #00f9b6
// fondo claro: #fdfdfd
// fondo oscuro: #2f313a
// hora en thema claro: #5b5d64 (?)

import { extendTheme } from "@chakra-ui/react";

const colors = {
  'todoRed': '#fc524c',
  'todoGreen':'#00f9b6',
  'todoGray':'#6e6d6e',
  'todoLight':'#fdfdfd',
  'todoDark':'#2f313a',
  'todofontColorDark':'#5b5d64',
  'todoBgHeader':'#262831'
}

const theme = extendTheme({colors})

export default theme;