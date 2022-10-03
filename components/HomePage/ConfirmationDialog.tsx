import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import styled from '@emotion/styled';

const ConfirmationDialog = ({
    openDeleteConfDialog, handleCloseDeleteConfDialog, handleDelete }: any) => {
    return (
        <Dialog
            open={openDeleteConfDialog}
            onClose={handleCloseDeleteConfDialog}
        >
            <DialogContent>
                <MuiDialogContentText >Are you sure you want to delete the article?</MuiDialogContentText>
            </DialogContent>
            <MuiDialogActions>
                <MuiCloseButton onClick={handleCloseDeleteConfDialog}>Close</MuiCloseButton>
                <MuiDeleteButton onClick={handleDelete} autoFocus> Delete</MuiDeleteButton>
            </MuiDialogActions>
        </Dialog>
    )
}

const MuiDialogContentText = styled(DialogContentText)`
      color: black;
      font-size: 19px
`
const MuiDialogActions = styled(DialogActions)`
      justify-content: center
`
const MuiCloseButton = styled(Button)`
      background-color: #CBCBCB;
      color: black;
      text-transform: capitalize;

      &:hover {
        color: black;
        background-color: green
    }
`
const MuiDeleteButton = styled(Button)`
    background-color: #D32F3F;
    color: white;
    text-transform: capitalize;

    &:hover {
        color: black;
        background-color: green
    }
`

export default ConfirmationDialog