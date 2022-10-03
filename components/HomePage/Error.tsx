import styled from '@emotion/styled';
import { Stack, Alert, AlertTitle } from '@mui/material';

const ErrorHandling = () => {
    return (
        <MuiStack sx={{ width: '80%' }} spacing={2}>
            <MuiAlert severity="error">
                <AlertTitle>Error</AlertTitle>
                Something went wrong <strong>can't be loaded</strong>
            </MuiAlert>
        </MuiStack>
    )
}

const MuiStack = styled(Stack)`
    width: 60%;
    margin: auto;
    padding-top: 30vh;
`
const MuiAlert = styled(Alert)`
    background: #E8EAED;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px
`

export default ErrorHandling