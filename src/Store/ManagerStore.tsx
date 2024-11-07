import { createContext, PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagerDTO } from "../Modoles/ManagerDTO";

type ManagerContext = {
    // The currently logged in user
    Manager?: ManagerDTO | null,
    // Set the currently logged in user
    setLogin: (user: ManagerDTO,token:string) => void,
    // Log out the current user
    setLogout: () => void
}
/**
 * The context for the manager state
 */
export const ManagerContext = createContext<ManagerContext>({
    // The initial state of the manager is null
    setLogin: (_: ManagerDTO, __: string) => { },
    // The initial state of the logout function is to do nothing
    setLogout: () => { }
})
/**
 * The component that wraps the app and manages the state of the manager
 * @param children The child elements of the manager provider
 */
const ManagerProvider = ({ children }: PropsWithChildren) => {

    // Get the navigate function from react-router-dom
    const navigate = useNavigate();

    // Initialize the manager state to null
    const [Manager, setManager] = useState<ManagerDTO | null>(null);

    /**
     * Set the currently logged in user
     * @param user The user to set as the currently logged in user
     */
    const setLogin = (user: ManagerDTO,token:string) => {
        // Set the manager state to the user
        setManager(user);
        // Set the token in local storage
        localStorage.setItem('token', token);
        // Navigate to the employee page
        navigate('employees');
    }

    /**
     * Log out the current user
     */
    const setLogout = () => {
        // Set the manager state to null
        setManager(null);
        // Remove the token from local storage
        localStorage.removeItem('token');
        // Navigate to the login page
        navigate('login');

    }
    // Create the data object with the setLogin and setLogout functions and the Manager state
    const data = {
        setLogin,
        setLogout,
        Manager
    }

    // Return the ManagerContext provider with the data object as the value
    return <ManagerContext.Provider value={data}>
        {children}
    </ManagerContext.Provider>
}

// Export the manager provider as the default export
export default ManagerProvider;
