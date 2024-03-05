import {Button, Container, FormControl, Stack} from "react-bootstrap";
import {Form, Formik} from "formik";
import {useState} from "react";
import FormField from "./FormField";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {createComment} from "../../api/articleApi";

const Comment = ({articleId}) => {
    const [comment, setComment] = useState({
        text: ''
    });
    const user = useSelector(state => state.user.user);

    const commentValidationScheme = Yup.object().shape(
        {
            text: Yup.string().required("Privalomas laukas").min(2, "Per trumpas komentaras").max(1000, "Per ilgas komentaras"),
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
        const updatedComment = {
            ...values,
            userId: user.id,
            userFullName: user.fullName,
            articleId: articleId,
            date: Date.now()
        }

        createComment(updatedComment)
            .then(() => helper.resetForm())
            .catch((error) => console.log(error))
            .finally(() => helper.setSubmitting(false))
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
                                <FormField name="text"
                                           label="Komentaras"
                                           error={props.errors.text}
                                           touched={props.touched.text}
                                           value={props.values.text}
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