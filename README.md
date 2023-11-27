# Trabajo Integrador Final - Desarrollo en React JS

## Descripción del Proyecto
Esta aplicación web desarrollada en React permite gestionar una lista de tareas de manera interactiva. La aplicación hace uso de componentes funcionales, el hook `useState`, el hook `useEffect`  y eventos para interactuar con el usuario.

## Componentes Funcionales Principales

### *Componente de Reloj (Clock)*
Muestra la fecha y hora actual con actualización automática.

### *Componente de Lista de Tareas (TodoList)*
Muestra la lista de tareas. Recibe la lista de tareas y funciones para gestionar eventos relacionados con las tareas, como marcar como completada o eliminar. Cada tarea se representa mediante un componente TodoItem.

### *Componente de Tarea (TodoItem)*
Representa individualmente una tarea. Muestra el nombre de la tarea y el estado y un botón para eliminarla. Utiliza el estado local para gestionar la apariencia de la tarea, como tacharla cuando está completada.

### *Componente de Formulario (FormAddTask)*
Contiene un formulario para agregar nuevas tareas. Utiliza el estado local para gestionar la entrada del usuario y envía la nueva tarea a la lista principal.

## Hooks de React

### *Hook `useState`*
Algunas de las utilizaciones del hook `useState`:
- Gestionar las tareas y para determinar cuando se debe actualizar la persistencia en `localstorage`.
- Generar la fecha actual para el reloj.

### *Hook `useEffect`*
Algunas de las utilizaciones del hook `useEffect`:
- Actualizar las tareas persistentes en el `localstorage`
- Generar el intervalo de actualización del reloj

## Interacción con el Usuario - Eventos

### *Eventos en Componente TodoItem*
Implementación de eventos que permiten al usuario interactuar con cada tarea, como marcar como completada o eliminar. 

### *Eventos en Componente FormAddTask*
Implementación de eventos para gestionar la entrada del usuario y agregar nuevas tareas a la lista.

## DEMO
![demo-integrador-dark-mobile](https://i.imgur.com/gFuhbkJ.jpg)
### [Link demo](https://pablorito14.github.io/todo-list/)

## Recursos
- [React v18.2.0](https://es.react.dev/)
- [React Icons v4.12](https://react-icons.github.io/react-icons/)
- [Chakra-UI v2.8.2](https://chakra-ui.com/)
- [Framer Motion v10.16.4](https://www.framer.com/motion/)
- [Formik v2.4.5](https://formik.org/)
