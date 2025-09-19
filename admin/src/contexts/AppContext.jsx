import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };
    case 'SET_MODAL':
      return { ...state, modal: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, modal: null };
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  notification: null,
  modal: null
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const showNotification = (message, type = 'info') => {
    dispatch({ 
      type: 'SET_NOTIFICATION', 
      payload: { message, type } 
    });
    
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  const showModal = (modalContent) => {
    dispatch({ type: 'SET_MODAL', payload: modalContent });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const value = {
    ...state,
    setLoading,
    showNotification,
    showModal,
    closeModal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;