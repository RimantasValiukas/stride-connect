import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Field} from "formik";
import Feedback from "react-bootstrap/Feedback";

const FormField = ({label, name, placeholder, error, touched, value, ...props}) => (
    <FormGroup className="mb-3 mx-auto text-start" style={{maxWidth: '500px'}}>
        <FormLabel>{label}</FormLabel>
        <Field
            type="text"
            name={name}
            as={FormControl}
            placeholder={placeholder}
            style={{backgroundColor: ' #fcfbf9'}}
            isValid={touched && !error}
            isInvalid={touched && !!error}
            value={value}
            {...props}
        />
        <Feedback type="invalid">
            {error}
        </Feedback>
    </FormGroup>
);

export default FormField;