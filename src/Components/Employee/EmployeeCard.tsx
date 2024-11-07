import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { EmployeeDTO } from "../../Modoles/EmployeeDTO"
import DeleteDialog from "./Dialog"
import { useState } from "react"
import { DeleteEmployee } from "../../Service/Employee";
import swl from 'sweetalert2';


interface EmployeeCard extends EmployeeDTO {
    deleteFunc: () => void
}

const EmployeeCard = ({ name, fullName, email, id, createdDate, deleteFunc }: EmployeeCard) => {
    const [delet, setDelete] = useState<boolean>(false); //  state to control delete dialog

    const sendDelete = async () => {
        try {
            await DeleteEmployee(id)
            deleteFunc()
            swl.fire({
                icon: "success",
                titleText: 'Delited success',
            });
            setDelete(false)
        } catch {
            // Handle errors
        }
    }


    return <Card >

        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {fullName}
            </Typography>
            <Typography variant="h4" component="div">
                {name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                {new Date(createdDate).toDateString()}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                {email}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => setDelete(true)}>delete</Button>
        </CardActions>
        {
            delet && <DeleteDialog
                handleClose={() => setDelete(false)}
                handleSubmit={sendDelete} />
        }
    </Card >

}

export default EmployeeCard