import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";
import Login from "../Manager/Login";
import Signup from "../Manager/Signup";
import Employees from "../Employee/Employees";
import Search from "../Employee/Search";
import EmployeeAdd from "../Employee/EmployeeAdd";
import ProtectedRoute from "./ProtectedRoute";
// Routes is the main router for the app. It defines all the routes that the app has.
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "Signup",
                element: <Signup />,
            }
            ,
            {
                path: "add-employee",
                element: <ProtectedRoute><EmployeeAdd /></ProtectedRoute>,
            },
            {
                path: 'employees',
                element: <ProtectedRoute><Employees /></ProtectedRoute>
            },
            {
                path: 'employee',
                element:<ProtectedRoute><Search /></ProtectedRoute> 
            },
            {
                path: '',
                element:<Navigate to="/login" /> 
            },
        ],
    },
]);

export default router;
