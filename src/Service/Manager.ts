import axios from "../Components/Continer/Axios"
import { LoginData } from "../Modoles/LoginData"
import { ManagerCreateDTO } from "../Modoles/ManagerCreateDTO";
import { ManagerDTO } from "../Modoles/ManagerDTO";

/**
 * Get all employees
 * @returns {Promise<AxiosResponse<Employee>>}
 */
export const postManager = (data: ManagerCreateDTO) => {
    data.password = btoa(data.password);
    // Send a POST request to the /manager endpoint with the signup data
    return axios.post<{ token: string, manager: ManagerDTO }>("/manager", data);
};

// Function to handle manager login
export const loginManager = (data: LoginData) => {
    data.password = btoa(data.password);
    // Send a POST request to the /manager/login endpoint with the login data
    return axios.post<{ token: string, manager : ManagerDTO }>("/manager/login", data);
};
