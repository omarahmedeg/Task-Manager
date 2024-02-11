import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDICATIONS': 
      return {
        tasks: action.payload
      }
    case 'CREATE_MEDICATION':
      return {
        tasks: [action.payload, ...state.tasks]
      }
    case 'DELETE_MEDICATION':
      return {
        tasks: state.tasks.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null
  })

  return (
    <TasksContext.Provider value={{...state, dispatch}}>
      { children }
    </TasksContext.Provider>
  )
}