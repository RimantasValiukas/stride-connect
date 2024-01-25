import {FieldArray, Form, Formik} from "formik";
import {useState} from "react";
import {Button, Container, FormControl, FormGroup, FormLabel, FormText, Stack} from "react-bootstrap";

const Poll = () => {

    const [poll, setPoll] = useState(
        {
            name: '',
            description: '',
            variants: []
        }
    );

    const onCreatePoll = {}

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
                                    <FormControl type="text" placeholder="Įveskite balsavimo pavadinimą"
                                                 style={{backgroundColor: ' #fcfbf9'}}/>
                                </FormGroup>

                                <FormGroup className="mb-3 mx-auto text-start" style={{maxWidth: '500px'}}>
                                    <FormLabel>Balsavimo aprašymas</FormLabel>
                                    <FormControl as="textarea" rows={3} placeholder="Įveskite balsavimo aprašymą"
                                                 style={{backgroundColor: ' #fcfbf9'}}/>
                                </FormGroup>

                                <FieldArray name="variants">
                                    {(arrayHelpers) => (
                                        <div>
                                            {props.values.variants.map((variant, index) => (
                                                <FormGroup key={index} className="mb-3 mx-auto"
                                                           style={{maxWidth: '500px'}}>
                                                    <FormLabel>Variantas {index + 1}</FormLabel>
                                                    <FormControl
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