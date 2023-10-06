'use client';

import InputField from '@/components/InputField';
import { Form, Formik } from 'formik';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ButtonVariant from '@/components/ui/ButtonVariant';
import { authSchema } from '@/lib/validators/auth';
import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '@/lib/redux/services/comment';
import { useCheckAuth } from '@/utils/useCheckAuth';
import LoadingCircular from '@/components/ui/loading/LoadingCircular';

type InitialValueProps = {
    username: string;
    email: string;
    password: string;
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const page = () => {
    // const router = useRouter();
    // const [signup, {}] = useSignUpMutation();
    // const { data, isLoading } = useCheckAuth();

    // const initialValues: InitialValueProps = {
    //     username: '',
    //     email: '',
    //     password: '',
    // };

    // const handleFormSubmit = async (values: InitialValueProps) => {
    //     await signup({
    //         ...values,
    //     });

    //     router.push('/');
    // };

    return (
        <>
            {/* {isLoading || (!isLoading && data) ? (
                <LoadingCircular />
            ) : (
                <ThemeProvider theme={defaultTheme}>
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>

                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={handleFormSubmit}
                                    validationSchema={authSchema}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <InputField name="username" label="Username" type="text" />
                                            <InputField name="email" label="Email" type="text" />
                                            <InputField name="password" label="Password" type="password" />

                                            <ButtonVariant type="submit" isLoading={isSubmitting} />
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            )} */}
        </>
    );
};

export default page;
