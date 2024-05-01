import React, { createContext, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  RESET_AUTH_STATE: 'RESET_AUTH_STATE',
  DESTROY: 'DESTROY', // Define a new action type for destroying/resetting the auth state
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case actionTypes.LOGOUT:
    case actionTypes.RESET_AUTH_STATE:
    case actionTypes.DESTROY: // Handle the DESTROY action type to reset the authentication state
      return initialState; // Reset the state to the initial state
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    navigate('/');
  };

  const destroy = () => {
    dispatch({ type: actionTypes.DESTROY });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, logout, destroy }}> {/* Include destroy in the context value */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
