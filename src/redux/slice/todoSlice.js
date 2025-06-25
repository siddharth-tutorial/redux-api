import {  createSlice } from "@reduxjs/toolkit";
import { addTodos, deleteTodos, fetchTodos, updateTodos } from "../api/todoThunk";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    isLoading: false,
    error:null
  },
  reducers:{},
  extraReducers: (builder) => {
    // GET 
    builder.addCase(fetchTodos.pending, (state,action) =>{
        state.isLoading=true
        state.error= null
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
      builder.addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false
      console.log('Error',action.payload)
      state.error = action.error.message
    });

    //create  add 
    builder.addCase(addTodos.fulfilled, (state,action)=>{
      state.data.push(action.payload)
    })
    // delete todo
    builder.addCase(deleteTodos.fulfilled,(state,action)=>{
      state.data = state.data.filter((todo)=>todo.id !== action.payload)
    })
    // update todo
    builder.addCase(updateTodos.fulfilled,(state,action)=>{
      const index = state.data.findIndex((t)=>t.id===action.payload.id)
      if(index !== -1){
        state.data[index] =action.payload
      }
    })
  },
});

export default todoSlice.reducer;
