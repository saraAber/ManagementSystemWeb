import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DeleteDialog = {

    handleClose: () => void,
    handleSubmit: () => void
}
const DeleteDialog = ({ handleClose, handleSubmit }: DeleteDialog) => {
    return <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Delete this item
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                you sure you wants delete this item?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleSubmit} autoFocus>
                Agree
            </Button>
        </DialogActions>
    </Dialog>

}

export default DeleteDialog;