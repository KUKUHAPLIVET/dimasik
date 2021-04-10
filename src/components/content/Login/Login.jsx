import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../../../utils/FormsControls/FormContorls";
import {requiredField} from "../../../utils/Validators/validators";
import {connect} from "react-redux";
import {login} from "../../../redux/authReducer";
import {compose} from "redux";
import Redirect from "react-router-dom/es/Redirect";
import s from "../../../utils/FormsControls/FormContorls.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Login", "email", [requiredField], Input,)}
            {createField("Password", "password", [requiredField], Input, {type: "password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default compose(
    connect(mapStateToProps, {login})
)
(Login)



