import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../../../utils/FormsControls/FormContorls";
import {requiredField} from "../../../utils/Validators/validators";
import {connect} from "react-redux";
import {login} from "../../../redux/authReducer";
import {compose} from "redux";
import Redirect from "react-router-dom/es/Redirect";
import s from "../../../utils/FormsControls/FormContorls.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Login", "email", [requiredField], Input,)}
            {createField("Password", "password", [requiredField], Input, {type: "password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [requiredField], Input)}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default compose(
    connect(mapStateToProps, {login})
)
(Login)



