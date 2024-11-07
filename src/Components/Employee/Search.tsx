import { useEffect, useState } from "react";
import { GetEmployees } from "../../Service/Employee";
import { EmployeeDTO } from "../../Modoles/EmployeeDTO";
import { Autocomplete, TextField } from "@mui/material";
import EmployeeCard from "./EmployeeCard";

const Search = () => {

    const [list, setList] = useState<EmployeeDTO[]>([]);
    const [value, setValue] = useState<EmployeeDTO | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetEmployees();
            setList(response.data);
        }
        fetchData();
    }, [])

    const deleteItem = () => {
        setList(list.filter(x => x.id !== value?.id));
        setValue(null)
    }

    const handleChange = async (newValue: EmployeeDTO | null) => {
        setValue(newValue);
    };

    return <>
        <Autocomplete
            value={value}
            onChange={(_, data) => handleChange(data)}
            id="user-autocomplete"
            options={list}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            disablePortal
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label="Select a employee" variant="outlined" />
            )} />

        {value && <EmployeeCard deleteFunc={deleteItem} {...value} />}
    </>
}


export default Search;