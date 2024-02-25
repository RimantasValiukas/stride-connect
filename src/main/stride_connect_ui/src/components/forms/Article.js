import {Button, Container, FormControl, Stack} from "react-bootstrap";
import {useState} from "react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import FormField from "./FormField";
import {useSelector} from "react-redux";
import {createArticle} from "../../api/articleApi";
import {useNavigate} from "react-router-dom";

const Article = () => {
    const user = useSelector(state => state.user.user);
    const navigation = useNavigate();
    const [article, setArticle] = useState({
        title: '',
        text: '',
        photoUrl: ''
    });

    const articleValidationScheme = Yup.object().shape(
        {
            title: Yup.string().required("Privalomas laukas").min(2, "Per trumpas pavadinmas").max(255, "Per ilgas pavadinimas"),
            text: Yup.string().required("Privalomas laukas").min(100, "Per trumpas straipsnis").max(5000, "Per ilgas straipsnis"),
            photoUrl: Yup.string().min(10, "Per trumpa nuoroda").max(255, "Per ilga nuoroda")
        }
    );

    const CustomTextarea = ({field, form, ...props}) => (
        <FormControl
            as="textarea"
            rows={10}
            placeholder="Įveskite balsavimo aprašymą"
            {...field}
            {...props}
        />
    );

    const handleChange = (value, field, form) => {
        form.setFieldValue(field.name, value);
    };

    const onCreateArticle = (values, helper) => {
        const updatedArticle = {
            ...values,
            userId: user.id,
            userFullName: user.fullName,
            date: Date.now()
        }

        createArticle(updatedArticle)
            .then(() => navigation("/articles"))
            .catch((error) => console.log(error))
            .finally(() => helper.setSubmitting(false))
    }

    return (
        <Formik initialValues={article}
                onSubmit={onCreateArticle}
                validationSchema={articleValidationScheme}>
            {
                props => (
                    <Container>
                        <Stack spacing={2} direction="column">
                            <Form>
                                <FormField
                                    name="title"
                                    label="Straipsnio pavadinimas"
                                    placeholder="Įveskite straipsnio pavadinimą"
                                    error={props.errors.title}
                                    touched={props.touched.title}
                                    value={props.values.title}
                                    onChange={props.handleChange}/>
                                <FormField name="text"
                                           label="Straipsnio tekstas"
                                           error={props.errors.text}
                                           touched={props.touched.text}
                                           value={props.values.text}
                                           component={CustomTextarea}/>
                                <FormField
                                    name="photoUrl"
                                    label="Nuotraukos nuoroda"
                                    placeholder="Įveskite nuotraukos nuorodą"
                                    error={props.errors.photoUrl}
                                    touched={props.touched.photoUrl}
                                    value={props.values.photoUrl}
                                    onChange={props.handleChange}/>
                                <Button type="submit"
                                        style={{backgroundColor: '#435f49', borderColor: '#435f49', marginTop: '20px'}}>
                                    Sukurti Straipsnį
                                </Button>
                            </Form>
                        </Stack>
                    </Container>
                )
            }
        </Formik>
    );
}

export default Article;