import  Stack from "@mui/material/Stack"
import ResetPassowrdCard from "./ResetPasswordCard"
import Navigation from "../../Navigation";

const ResetPassword = () => {
    return (
        <>
            <Navigation />
            <Stack 
                direction="column" 
                component="main"
                sx={{
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), #1B1F1C)',
                    padding: '1rem'
                }}>
                    <ResetPassowrdCard />
             </Stack>
        </>
      );
}

export default ResetPassword