import  Stack from "@mui/material/Stack"
import ResetPassowrdCard from "./ResetPasswordCard"

const ResetPassword = () => {
    return (
        <>
          <Stack direction="column" component="main"
            sx={[
              {
                justifyContent: 'center',
                minHeight: '100vh',
              },
              (theme) => ({
                  backgroundImage:
                    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                  backgroundRepeat: 'no-repeat',
                  ...theme.applyStyles('dark', {
                    backgroundImage:
                      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), #1B1F1C)',
                  }),
              }),
            ]}
          >
            <Stack
              direction={{ xs: 'column-reverse', md: 'row' }}
              sx={{
                justifyContent: 'center',
                gap: { xs: 6, sm: 12 },
                p: 2,
                mx: 'auto',
              }}
            >
              <Stack
                direction={{ xs: 'column-reverse', md: 'row' }}
                sx={{
                  justifyContent: 'center',
                  gap: { xs: 6, sm: 12 },
                  p: { xs: 2, sm: 4 },
                  m: 'auto',
                }}
              >
                <ResetPassowrdCard />
              </Stack>
            </Stack>
          </Stack>
        </>
      );
}

export default ResetPassword