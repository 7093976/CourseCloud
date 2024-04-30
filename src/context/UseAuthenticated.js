// import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Update the path as needed

// export const useAuthenticated = () => {
//   const { state } = useAuth();
//   const { isAuthenticated, user } = state;

//   useEffect(() => {
//     // Redirect to "/" if user is not authenticated or user is null
//     if (!isAuthenticated || !user) {
//       return <Navigate to="/" />;
//     }
//   }, [isAuthenticated, user]);

//   return { isAuthenticated, user };
// };
