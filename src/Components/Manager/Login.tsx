import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup'
import { LoginData } from "../../Modoles/LoginData";
import { loginManager } from "../../Service/Manager";
import { ManagerContext } from "../../Store/ManagerStore"
import { useContext } from 'react'
import { Box, Button, FormControl, Link, TextField } from "@mui/material";
import swl from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
}).required();


const Login = () => {
    // useContext hook to access setLogin function from ManagerContext
    const { setLogin } = useContext(ManagerContext);
    const navigate = useNavigate();
    // useForm hook to manage form state and validation
    const { handleSubmit, control, formState: { errors } } = useForm<LoginData>({
        // Initial values for form fields
        values: {
            email: "",
            password: ""
        },
        // Resolver for form validation using Yup schema
        resolver: yupResolver(schema)
    });

    // Function to handle form submission
    const submit = async (data: LoginData) => {
        try {
            // Call loginManager function with form data
            const response = await loginManager(data);
            // Display success message on successful login
            swl.fire({
                icon: "success",
                titleText: 'login success',
            });
            // Update login state with response data
            setLogin(response.data.manager, response.data.token);
        } catch {
            // Handle errors
            navigate('/signup');
        }
    }

    // Return JSX for the login form
    return (
        <FormControl>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 400,
                    margin: '0 auto',
                    padding: 3,
                    gap: "20px",
                    borderRadius: "15px",
                    backgroundColor: "#19d1"
                }}
            >
                {/* Email input field with validation */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField {...field}
                        error={errors.email != null}
                        helperText={errors.email?.message}
                        type="email"
                        label="email" />}
                />

                {/* Password input field with validation */}
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField
                        error={errors.password != null}
                        helperText={errors.password?.message}
                        {...field}
                        type="password"
                        label="password" />}
                />

                {/* Submit button to trigger form submission */}
                <Button type="submit" variant="contained" onClick={handleSubmit(submit)}>
                    Login
                </Button>
                 <Link  type="button" onClick={() => navigate('/signup')}>
                  signup
                </Link>
            </Box>
        </FormControl>
    );
}
export default Login;