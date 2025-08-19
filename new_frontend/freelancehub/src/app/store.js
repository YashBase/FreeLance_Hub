import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage

import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/admin/adminSlice';
import clientDashboardReducer from '../features/client/dashboardSlice';
import requirementReducer from '../features/client/requirementSlice';
import proposalReducer from "../features/client/proposalSlice";
import taskReducer from "../features/client/taskSlice";
import paymentReducer from "../features/client/paymentSlice";
import vendorFeedbackReducer from "../features/client/vendorfeedbackSlice";
//vendor 
import vendorDashboardReducer from "../features/vendor/dashboardSlice";
import vendorRequirementsReducer from "../features/vendor/requirementSlice";
import vendorProposalReducer from "../features/vendor/proposalSlice";
import vendorTaskReducer from "../features/vendor/taskSlice";
import vendorpaymentReducer from "../features/vendor/paymentSlice";
import FeedbackReducer from "../features/vendor/feedbackSlice";

// Persist config for auth slice only
const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'roleId'], // only persist these fields
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  admin: adminReducer,
  clientDashboard: clientDashboardReducer,
  requirement: requirementReducer,
  proposals: proposalReducer,
  tasks: taskReducer,
  payment: paymentReducer, 
  vendorFeedback: vendorFeedbackReducer,
  vendorDashboard: vendorDashboardReducer,
  vendorRequirements: vendorRequirementsReducer,
  vendorProposals: vendorProposalReducer,
  vendorTasks: vendorTaskReducer,
  vendorPayments: vendorpaymentReducer,
  Feedback: FeedbackReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
