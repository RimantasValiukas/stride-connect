import {Alert, Button, Container, FormText, Stack} from "react-bootstrap";
import {Form, Formik} from "formik";
import FormField from "./FormField";
import {useState} from "react";
import * as Yup from 'yup';
import {registration} from "../../api/userApi";

const Registration = () => {

    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [showError, setShowError] = useState(false);

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
            .then(() => helper.resetForm())
            .catch((error) => {
                console.log(error);
                setShowError(true);
            })
            .finally(() => helper.setSubmitting(false))
    }

    return(
        <Formik initialValues={{username: '', password: ''}}
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
                                           value={props.values.name}
                                />
                                <FormField name="surname"
                                           placeholder="Įveskite savo pavardę"
                                           label="Pavardė"
                                           error={props.errors.surname}
                                           touched={props.touched.surname}
                                           value={props.values.surname}
                                />
                                <FormField name="email"
                                           placeholder="Įveskite elektroninį paštą"
                                           label="Elektroninis paštas"
                                           error={props.errors.email}
                                           touched={props.touched.email}
                                           value={props.values.email}
                                />
                                <FormField name="password"
                                           placeholder="Įveskite slaptažodį"
                                           type="password"
                                           label="Slaptažodis"
                                           error={props.errors.password}
                                           touched={props.touched.password}
                                           value={props.values.password}
                                />
                                <FormField name="repeatPassword"
                                           placeholder="Įveskite slaptažodį"
                                           type="password"
                                           label="Slaptažodis"
                                           error={props.errors.repeatPassword}
                                           touched={props.touched.repeatPassword}
                                           value={props.values.repeatPassword}
                                />
                                <Button type="submit"
                                        style={{backgroundColor: '#435f49', borderColor: '#435f49', marginTop: '20px'}}>
                                    Registruotis
                                </Button>
                                {showError && <Container  className="d-flex flex-column align-items-center justify-content-center" >
                                    <Alert variant='warning' style={{marginTop: "20px"}}>
                                        Kažkas negerai, bandykite dar kartą
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