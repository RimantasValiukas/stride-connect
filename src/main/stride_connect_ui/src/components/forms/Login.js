import {Form, Formik} from "formik";
import {Alert, Button, Container, FormText, Stack} from "react-bootstrap";
import FormField from "./FormField";
import * as Yup from 'yup';
import {useEffect, useState} from "react";
import {login} from "../../api/userApi";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {addUser} from "../../store/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state;
    const [message, setMessage] = useState({show: false});

    const loginValidationSchema = Yup.object().shape(
        {
            username: Yup.string().required("Vartotojo vardas privalomas"),
            password: Yup.string().required("Slaptažodis privalomas")
        }
    );

    useEffect(() => {
        if (successMessage) {
            setMessage({show: true, variant: 'success', message: 'Registracija sėkminga, dabar galite prisijungti'})
        }
    }, []);

    const onLogin = (values, helpers) => {
        login(values)
            .then(({data, headers}) => {
                dispatch(addUser({
                    user: data,
                    jwtToken: headers.authorization
                }));
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
                setMessage({show: true, variant: 'warning', message: 'Blogi prisijungimo duomenys, bandykite dar kartą'})
            })
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik initialValues={{username: '', password: ''}}
                onSubmit={onLogin}
                validationSchema={loginValidationSchema}>
            {
                props => (
                    <Container>
                        <Stack spacing={2} direction="column">
                            <Form>
                                <FormText style={{fontSize: '25px', marginBottom: '30px'}}>Prisijungti</FormText>
                                <FormField name="username"
                                           placeholder="Įveskite elektroninį paštą"
                                           label="Elektroninis paštas"
                                           error={props.errors.username}
                                           touched={props.touched.username}
                                           value={props.values.username}
                                />
                                <FormField name="password"
                                           placeholder="Įveskite slaptažodį"
                                           type="password"
                                           label="Slaptažodis"
                                           error={props.errors.password}
                                           touched={props.touched.password}
                                           value={props.values.password}
                                />
                                <Button type="submit"
                                        style={{backgroundColor: '#435f49', borderColor: '#435f49', marginTop: '20px'}}>
                                    Prisijungti
                                </Button>
                                {message.show && <Container  className="d-flex flex-column align-items-center justify-content-center" >
                                    <Alert variant={message.variant} style={{marginTop: "20px"}}>
                                        {message.message}
                                    </Alert>
                                </Container>}

                            </Form>
                        </Stack>
                    </Container>
                )
            }
        </Formik>
    );
}

export default Login;