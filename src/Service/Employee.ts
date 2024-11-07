import axios from "../Components/Continer/Axios"
import { EmployeeDTO } from "../Modoles/EmployeeDTO";
import { EmployeeCreateDTO } from "../Modoles/EmployeeCreateDTO";

/**
 * Get all employees
 * @returns {Promise<AxiosResponse<Employee[]>>}
 */
export const GetEmployees = () => {
    const token = GetToken();
    return axios.get<EmployeeDTO[]>(`/Employee`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

/**
 * Add a new employee
 * @param {EmployeeCreateDTO} data
 * @returns {Promise<AxiosResponse<Employee>>}
 */
export const PostEmployee = (data: EmployeeCreateDTO) => {
    const token = GetToken();
    data.password=btoa(data.password);
    return axios.post<EmployeeDTO>(`/Employee`, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

/**
 * Delete an employee
 * @param number id
 * @returns {Promise<AxiosResponse<boolean>>}
 */
export const DeleteEmployee = (id: number) => {
    const token = GetToken();
    return axios.delete(`/Employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

/**
 * Get the token from local storage
 * @returns {string | null}
 */
const GetToken = () => {
    return localStorage.getItem('token')
}
