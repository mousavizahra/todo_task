 import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//  Todo type
interface ITodoItem {
  id: number;
  text: string;
  completed: boolean;
  username: string
}

//  todos state type
interface TodosItemsState {
  todos: ITodoItem[];
}

// state for the todos slice
const initialState: TodosItemsState = {
  todos: [],
};

//  todos slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoItem>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

 
export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoSlice.actions;

 
export default todoSlice.reducer;
