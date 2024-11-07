import axios from "axios";
import swl from 'sweetalert2';

// This file creates an instance of Axios with predefined settings such as base URL and headers.
// It also includes an interceptor to handle responses and errors.
// SweetAlert2 is used to display error messages in a user-friendly manner.
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // קרא מהמשתנה הסביבתי
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    response => response,  // handle successful response
    error => {// handle errors response
        let text = error?.response?.data;
        if (error.status == 401)
            text = "Session expired. Please log in again.";

        if (error.status == 500)
            text = "An unexpected error occurred. Please try again later.";
        // alert error
        swl.fire({
            icon: "error",
            title: 'Error',
            text,
        });
        // if unauthorized, redirect to login page
        if (error.status == 401){
            localStorage.removeItem('token');
        }

        return Promise.reject(error); // לא לשכוח להחזיר את השגיאה כדי שהקוד יוכל לתפוס אותה
    }
);

export default axiosInstance;