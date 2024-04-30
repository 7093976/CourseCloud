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
  DESTROY: 'DESTROY',
  RESET_AUTH_STATE: 'RESET_AUTH_STATE', // New action type for resetting auth state
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
      return initialState;
    case actionTypes.DESTROY:
      return {
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case actionTypes.RESET_AUTH_STATE: // Handle resetting authentication state
      return initialState;
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
    // Optionally, you can perform additional cleanup here if needed
  };

  // Check if the user is authenticated on component mount
  // React.useEffect(() => {
  //   if (!state.isAuthenticated) {
  //     navigate('/');
  //   }
  // }, [state.isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ state, dispatch, logout, destroy }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
