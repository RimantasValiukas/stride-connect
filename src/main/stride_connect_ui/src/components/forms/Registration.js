import {Alert, Button, Container, FormText, Stack} from "react-bootstrap";
import {Form, Formik} from "formik";
import FormField from "./FormField";
import {useState} from "react";
import * as Yup from 'yup';
import {registration} from "../../api/userApi";
import {useNavigate} from "react-router-dom";

const Registration = () => {

    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [message, setMessage] = useState({show: false});
    const navigation = useNavigate();

    const userValidationSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(3, "Per trumas vardas")
                .required("Šis laukas privalomas"),
            surname: Yup.string()
                .min(2, "Per trumpa pavardė")
                .required("Šis laukas privalomas"),
            email: Yup.string()
                .email("Netinkamas formatas")
                .required("Šis laukas privalomas"),
            password: Yup.string()
                .min(5, "Per trumpas slaptažodis")
                .required("Šis laukas privalomas"),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], "Slaptažodžiai turi sutapti")
                .required("Šis laukas privalomas")
        }
    )
    const onSubmit = (values, helper) => {
        const userCopy = {
            ...values,
            username: values.email
        }

        registration(userCopy)
            .then(() => {
                const successMessage = true;
                navigation('/login', {state: successMessage});
            })
            .catch((error) => {
                console.log(error);
                setMessage({show: true, variant: 'warning', message: 'Problemos su serveriu, bandykite dar kartą'})
            })
            .finally(() => helper.setSubmitting(false))
    }

    return(
        <Formik initialValues={user}
                onSubmit={onSubmit}
                validationSchema={userValidationSchema}>
            {
                props => (
                    <Container>
                        <Stack spacing={2} direction="column">
                            <Form>
                                <FormText style={{fontSize: '25px', marginBottom: '30px'}}>Registracijos forma</FormText>
                                <FormField name="name"
                                           placeholder="Įveskite savo vardą"
                                           label="Vardas"
                                           error={props.errors.name}
                                           touched={props.touched.name}
                                />
                                <FormField name="surname"
                                           placeholder="Įveskite savo pavardę"
                                           label="Pavardė"
                                           error={props.errors.surname}
                                           touched={props.touched.surname}
                                />
                                <FormField name="email"
                                           placeholder="Įveskite elektroninį paštą"
                                           label="Elektroninis paštas"
                                           error={props.errors.email}
                                           touched={props.touched.email}
                                />
                                <FormField name="password"
                                           placeholder="Įveskite slaptažodį"
                                           type="password"
                                           label="Slaptažodis"
                                           error={props.errors.password}
                                           touched={props.touched.password}
                                />
                                <FormField name="repeatPassword"
                                           placeholder="Įveskite slaptažodį"
                                           type="password"
                                           label="Pakartokite slaptažodį"
                                           error={props.errors.repeatPassword}
                                           touched={props.touched.repeatPassword}
                                />
                                <Button type="submit"
                                        style={{backgroundColor: '#435f49', borderColor: '#435f49', marginTop: '20px'}}>
                                    Registruotis
                                </Button>
                                {message.show && <Container  className="d-flex flex-column align-items-center justify-content-center" >
                                    <Alert className="mx-auto" show={message.show} variant={message.variant}
                                           style={{maxWidth: '400px', marginTop: '20px'}}>
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

export default Registration;