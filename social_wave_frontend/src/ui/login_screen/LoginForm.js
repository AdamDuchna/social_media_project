import axios from "axios";
import { Formik,Field,Form } from "formik";
const LoginForm = ({handleChange,setUser,setError,loginSuccess}) => {
    const handleSuccesfulLogin = (res) => {
        if(res.status === 200){
            setError()
            setUser(res.data)
            loginSuccess()
        }
        else{ setError("Something went wrong...")}
    }

    const handleUnsuccesfulLogin = (err) => {setError(err.response.data)}

    const handleSubmit = (values) => {
        axios
        .post('http://localhost:5000/user/login',{...values})
        .then(res=>{handleSuccesfulLogin(res)})
        .catch(err=>{handleUnsuccesfulLogin(err)})
    }
    return (
        <>
            <Formik className
                initialValues={{
                    username:"",
                    password:"",
                }}
                onSubmit={(values) => handleSubmit(values)}>
                <Form className="login">
                    <Field name="username" placeholder="Username"/>
                    <Field  type="password" name="password" placeholder="Password"/>     
                    <button type="submit">Log In</button>
                    <div className="line"></div>
                    <button onClick={handleChange} className="register-button">Register new account</button>
                </Form>
            </Formik>
        </>
    )
}
export default LoginForm;