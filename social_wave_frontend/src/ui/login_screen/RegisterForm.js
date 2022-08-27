import axios from "axios";
import { Formik,Field,Form } from "formik";
const RegisterForm = ({handleChange}) => {

    const handleSubmit = (values) => {
        axios
        .post('http://localhost:5000/user/register',{...values})
        .then(res=>{console.log(res)})
        .catch(err=>{console.log(err)})
    }
    return (
            <Formik className
                initialValues={{
                    firstName:"",
                    lastName:"",
                    username:"",
                    password:"",
                }}
                onSubmit={(values) => handleSubmit(values)}>
                <Form className="register">
                    <Field name="firstName" placeholder="Name"/>
                    <Field name="lastName" placeholder="Surname"/>
                    <Field name="username" placeholder="Username"/>
                    <Field  type="password" name="password" placeholder="Password"/>     
                    <div className="buttons-box">
                    <button onClick={handleChange}>Return</button>
                    <button type="submit">Register</button>
                    </div>
                </Form>
            </Formik>
    )
}
export default RegisterForm;