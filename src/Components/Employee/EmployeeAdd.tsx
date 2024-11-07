import { PostEmployee } from "../../Service/Employee";
import swl from 'sweetalert2';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { Box, Button, TextField } from "@mui/material";
import { EmployeeCreateDTO } from "../../Modoles/EmployeeCreateDTO";


const schema = yup.object({
    name: yup.string().required().test('len', 'Must be min 2 and max 30 characters', val => val.length >= 2 && val.length <= 30),
    password: yup.string().required().test('len', 'Must be min 8 and max 15 characters', val => val.length >= 8 && val.length <= 15),
    email: yup.string().email().required().test('len', 'Must be min 2 and max 30 characters', val => val.length <= 30),
    fullName: yup.string().required().test('len', 'Must be  max 30 characters', val => val.length >= 2 && val.length <= 30),
}).required();


const EmployeeAdd = () => {



    const submit = async (data: EmployeeCreateDTO) => {
        try {
            await PostEmployee(data)
            swl.fire({
                icon: "success",
                titleText: 'Employee add success',
            })
            reset();
        } catch (e) {
        }
    }

    const { handleSubmit, control, formState: { errors }, reset } = useForm<EmployeeCreateDTO>({
        values: {
            name: "",
            password: "",
            email: "",
            fullName: "",
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    return (<form onSubmit={handleSubmit(submit)}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 400, // הגדרת רוחב מקסימלי
                margin: '0 auto',
                padding: 3,
                gap: "20px",
                borderRadius: "15px",
                backgroundColor: "#19d1"
            }}
        >
            <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField
                    helperText={errors.name?.message}
                    error={errors.name != null}
                    {...field} label="name" />
                }
            ></Controller>
            <Controller

                name="password"
                control={control}
                render={({ field }) => <TextField
                    error={errors.password != null}
                    helperText={errors.password?.message}
                    {...field} type="password" label="password" />
                }
            ></Controller>
            <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField {...field}
                    helperText={errors.email?.message}
                    error={errors.email != null}
                    type="email" label="email" />
                }
            ></Controller>

            <Controller
                name="fullName"
                control={control}
                render={({ field }) => <TextField
                    error={errors.fullName != null}
                    helperText={errors.fullName?.message}
                    {...field} label="fullName" />
                }
            ></Controller>

            <Button type="submit" variant="contained"  >Add Employee</Button>
        </Box>
    </form>)
}
export default EmployeeAdd;