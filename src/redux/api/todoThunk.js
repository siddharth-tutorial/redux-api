import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodoAPI, deleteTodoAPI, fetchTodosAPI, updateTodoApi } from "../../services/todoServices";

export const fetchTodos =createAsyncThunk("todos/fetchTodos",fetchTodosAPI)
export const addTodos =createAsyncThunk("todos/addTodos",addTodoAPI)
export const deleteTodos = createAsyncThunk("todos/deleteTodos",deleteTodoAPI)
export const updateTodos = createAsyncThunk("todos/updateTodos",updateTodoApi)