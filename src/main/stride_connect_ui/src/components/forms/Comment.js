import {Button, Container, FormControl, Stack} from "react-bootstrap";
import {Form, Formik} from "formik";
import {useState} from "react";
import FormField from "./FormField";
import * as Yup from "yup";
import {useSelector} from "react-redux";

const Comment = () => {
    const [comment, setComment] = useState({
        comment: ''
    });
    const user = useSelector(state => state.user.user);

    const commentValidationScheme = Yup.object().shape(
        {
            comment: Yup.string().required("Privalomas laukas").min(2, "Per trumpas komentaras").max(1000, "Per ilgas komentaras"),
        }
    );
    const CustomTextarea = ({field, form, ...props}) => (
        <FormControl
            as="textarea"
            rows={5}
            placeholder="Įveskite balsavimo aprašymą"
            {...field}
            {...props}
        />
    );

    const handleChange = (value, field, form) => {
        form.setFieldValue(field.name, value);
    };

    const onSubmit = (values, helper) => {
        console.log(values);
        helper.resetForm();
    }

    return(
        <Formik initialValues={comment}
                onSubmit={onSubmit}
                validationSchema={commentValidationScheme}>
            {
                props => (
                    <Container>
                        <Stack spacing={2} direction="column">
                            <Form>
                                <FormField name="comment"
                                           label="Komentaras"
                                           error={props.errors.comment}
                                           touched={props.touched.comment}
                                           value={props.values.comment}
                                           component={CustomTextarea}/>
                                <Button type="submit"
                                        style={{
                                            backgroundColor: '#435f49',
                                            borderColor: '#435f49',
                                            marginTop: '20px'
                                        }}>
                                    Komentuoti
                                </Button>
                            </Form>
                        </Stack>
                    </Container>
                )
            }
        </Formik>
    );
}

export default Comment;