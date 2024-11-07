import { AppBar,  Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ManagerContext } from "../../Store/ManagerStore";

const navItems = [
    { name: "Add employee", key: "add-employee", securt: true },
    { name: "Employee", key: "Employee", securt: true },
    { name: "Employees", key: "Employees", securt: true },
    { name: "Login", key: "Login", securt: false },
    { name: "Signup", key: "Signup", securt: false }

];
/**
 * The header component
 * @returns {JSX.Element} The header component
 */
const Header = () => {
    const { Manager, setLogout } = useContext(ManagerContext)
    const navigate = useNavigate();

    // Filter the navigation items based on the user's state (logged in or not)
    const filteredNavItems = navItems.filter(item => {
        // If the user is logged in, show items with securt set to true
        // If the user is not logged in, show items with securt set to false
        return Manager ? item.securt : !item.securt;
    });

    return <AppBar >
        <Toolbar>

            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: 'start' }}
            >
                Manager system
            </Typography>
            <Typography></Typography>

            {/* Map over the filtered navigation items and render a button for each one */}
            {filteredNavItems.map(item => (
                <Button key={item.key} sx={{ color: '#fff' }} onClick={() => navigate(item.key)}>
                    {item.name}
                </Button>
            ))}

            {/* If the user is logged in, show a logout button */}
            {Manager && <Button sx={{ color: '#fff' }} onClick={setLogout}>
                Logout
            </Button>}
        </Toolbar>
    </AppBar>


}

export default Header;

