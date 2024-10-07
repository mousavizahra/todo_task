// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
   username: string, 
   email?: string | null
  }

interface UserState {
  user: IUser | null;
  users: IUser[];
}

const initialState: UserState = {
  user: null,
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<{ username: string, email:string }>) => {
      
      if(!state.users?.some((user: IUser)=> user.email === action.payload.email)){
        state.users.push(action.payload)
      }

      state.user = action.payload;
    },
    login: (state, action: PayloadAction<{ username: string }>) => {
      const _user = state.users.find((user)=> user.username === action.payload.username)
      if(_user){
        state.user = _user;
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
