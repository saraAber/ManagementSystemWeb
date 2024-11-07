import { useEffect, useState } from "react"
import { GetEmployees } from "../../Service/Employee"
import EmployeeCard from "./EmployeeCard";
import { Box, Button } from "@mui/material";
import { EmployeeDTO } from "../../Modoles/EmployeeDTO";
import { useNavigate } from "react-router-dom";

const Employees = () => {
    const navigate = useNavigate();
    const [list, setList] = useState<EmployeeDTO[]>([]);

    const deleteItem = (id: number) => {
        setList(list.filter(x => x.id !== id));
    }

    // fetch employees on mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await GetEmployees();
            setList(response.data);
        }
        fetchData()
    }, []);

    return <>
        <Box sx={{
            display: "flex",
            gap: "10px"
        }}>
            {list.map(employee => <EmployeeCard
                key={employee.id}
                deleteFunc={() => deleteItem(employee.id)}{...employee} />)}
        </Box>
        {list.length === 0 && <p>No employees found</p>}
        <Button variant="text" onClick={() => navigate('/add-employee')}>to add employee</Button>
    </>

}

export default Employees