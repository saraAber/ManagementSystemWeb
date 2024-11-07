import swl from 'sweetalert2';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { Box, Button, Link, TextField } from "@mui/material";
import { useContext } from "react";
import { ManagerContext } from "../../Store/ManagerStore";
import { postManager } from '../../Service/Manager';
import { ManagerCreateDTO } from '../../Modoles/ManagerCreateDTO';
import {  useNavigate } from 'react-router-dom';

const schema = yup.object({
    name: yup.string().required().test('len', 'Must be min 2 and max 30 characters', val => val.length >= 2 && val.length <= 30),
    password: yup.string().required().test('len', 'Must be min 8 and max 15 characters', val => val.length >= 8 && val.length <= 15),
    email: yup.string().email().required().test('len', 'Must be min 2 and max 30 characters', val => val.length <= 30),
    fullName: yup.string().required().test('len', 'Must be  max 30 characters', val => val.length >= 2 && val.length <= 30),
}).required();

/**
 * Signup component - a form for a new manager to signup
 * @returns {JSX.Element}
 */
const Signup = () => {
    const { setLogin } = useContext(ManagerContext);
    const { handleSubmit, control, formState: { errors } } = useForm<ManagerCreateDTO>({
        values: {
            name: "",
            password: "",
            email: "",
            fullName: "",
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()
    /**
     * Submit the signup form
     * @param {SignupData} data The data to be sent to the server
     */

    const submit = async (data: ManagerCreateDTO) => {
        try {
            let res = await postManager(data)
            swl.fire({
                icon: "success",
                titleText: 'Signup success',
            })
            console.log(res.data)
            setLogin(res.data.manager, res.data.token)
        } catch (e) {
        }
    }


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

            <Button type="submit" variant="contained"  >Signup</Button>
            <Link  onClick={() => navigate('/signup')}>
                 login
            </Link>
        </Box>
    </form>)
}
export default Signup;
