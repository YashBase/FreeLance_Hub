import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import requirementsReducer from './requirementsSlice';
import proposalsReducer from './proposalsSlice';
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    requirements: requirementsReducer,
    proposals: proposalsReducer,
    tasks: taskReducer,
  },
});

export default store;
