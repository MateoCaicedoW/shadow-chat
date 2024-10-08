import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUserSlice";
import authErrorsReducer from "./authErrors";
import usersReducer from "./usersSlice";
import chatSliceReducer from "./chatSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ 
    currentUser: currentUserReducer,
    authErrors: authErrorsReducer,
    users: usersReducer,
    chats: chatSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),

});

const persistor = persistStore(store);

export { store, persistor };
