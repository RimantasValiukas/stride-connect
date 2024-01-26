import {Field, FieldArray, Form, Formik} from "formik";
import {useState} from "react";
import {Button, Container, FormControl, FormGroup, FormLabel, FormText, Stack} from "react-bootstrap";
import {createPoll} from "../../api/pollApi";
import Datetime from 'react-datetime';


function DateTime() {
    return null;
}

const Poll = () => {

    const [poll, setPoll] = useState(
        {
            name: '',
            description: '',
            variants: [],
            expirationDate: null
        }
    );

    const CustomTextarea = ({field, form, ...props}) => (
        <FormControl
            as="textarea"
            rows={3}
            placeholder="Įveskite balsavimo aprašymą"
            {...field}
            {...props}
        />
    );

    const handleChange = (value, field, form) => {
        form.setFieldValue(field.name, value);
    };


    const onCreatePoll = (values, helper) => {
        const date = Date.now();
        const timestamp = values.expirationDate.valueOf();
        const updatedPoll = {
            ...values,
            date: date,
            votedUsers: [],
            expirationDate: timestamp,
            active: true

        }

        console.log(updatedPoll);

        createPoll(updatedPoll)
            .then(() => helper.resetForm())
            .catch((error) => console.log(error))
            .finally(() => helper.setSubmitting(false))
    }

    return (
        <Formik initialValues={poll} onSubmit={onCreatePoll}>
            {
                props => (
                    <Container>
                        <Stack spacing={2} direction="column">
                            <FormText style={{fontSize: '25px', marginBottom: '30px'}}>Sukurti balsavimą</FormText>
                            <Form>
                                <FormGroup className="mb-3 mx-auto text-start" style={{maxWidth: '500px'}}>
                                    <FormLabel>Balsavimo pavadinimas</FormLabel>
                                    <Field
                                        type="text"
                                        name="name"
                                        as={FormControl}
                                        placeholder="Įveskite balsavimo pavadinimą"
                                        style={{backgroundColor: ' #fcfbf9'}}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3 mx-auto text-start" style={{maxWidth: '500px'}}>
                                    <FormLabel>Balsavimo aprašymas</FormLabel>
                                    <Field
                                        component={CustomTextarea}
                                        name="description"
                                        style={{backgroundColor: ' #fcfbf9'}}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3 mx-auto text-start" style={{maxWidth: '500px'}}>
                                    <FormLabel>Galiojimo data</FormLabel>
                                    <Field name="expirationDate">
                                        {({field, form}) => (
                                            <Datetime
                                                {...field}
                                                inputProps={{placeholder: 'Pasirinkite galiojimo datą'}}
                                                dateFormat="YYYY-MM-DD"
                                                timeFormat="HH:mm:ss"
                                                onChange={(value) => handleChange(value, field, form)}
                                                style={{backgroundColor: ' #fcfbf9'}}
                                            />
                                        )}
                                    </Field>
                                </FormGroup>

                                <FieldArray name="variants">
                                    {(arrayHelpers) => (
                                        <div>
                                            {props.values.variants.map((variant, index) => (
                                                <FormGroup key={index} className="mb-3 mx-auto"
                                                           style={{maxWidth: '500px'}}>
                                                    <FormLabel>Variantas {index + 1}</FormLabel>
                                                    <Field
                                                        as={FormControl}
                                                        name={`variants[${index}]`}
                                                        type="text"
                                                        placeholder={`Įveskite variantą ${index + 1}`}
                                                        style={{backgroundColor: ' #fcfbf9', maxWidth: '500px'}}
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        variant="danger"
                                                        className="ml-2 d-flex justify-content-start text-left"
                                                        size="sm"
                                                        style={{marginTop: '5px'}}
                                                    >
                                                        Pašalinti
                                                    </Button>
                                                </FormGroup>
                                            ))}
                                            <Button
                                                className="ml-2"
                                                type="button"
                                                onClick={() => arrayHelpers.push('')}
                                                style={{
                                                    backgroundColor: '#43535f',
                                                    borderColor: '#43535f',
                                                    marginBottom: '5px'
                                                }}
                                                size="sm"
                                            >
                                                Pridėti variantą
                                            </Button>
                                        </div>
                                    )}
                                </FieldArray>

                                <Button type="submit"
                                        style={{backgroundColor: '#435f49', borderColor: '#435f49', marginTop: '20px'}}>
                                    Sukurti balsavimą
                                </Button>
                            </Form>

                        </Stack>
                    </Container>
                )
            }
        </Formik>
    );
}

export default Poll;