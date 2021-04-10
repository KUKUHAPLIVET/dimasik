import React from "react"
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/dialogItem";
import Message from "./Messages/Messages";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../utils/FormsControls/FormContorls";
import {maxLengthCreator, requiredField} from "../../../utils/Validators/validators";

const Dialogs = (props) => {

    let dialogsElement = props.dialogsPage.dialogsData.map
    (d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElements = props.dialogsPage.messagesData.map
    (m => <Message value={m.message}/>)


    let addMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }
    // let onMessageChange = (e) => {   НЕ НАДО Т.К. ЮЗАЕМ redux-form
    //     let body = e.target.value
    //     props.updateNewMessageBody(body)
    //     // props.dispatch(action)
    // }
    // if (!props.isAuth) return <Redirect to={"/login"}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addMessage}/>
            </div>
        </div>
    )
}
const maxLength100 = maxLengthCreator(100)

const AddMessageForm = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <div >
                <Field className={s.textareams}
                       component={Textarea}
                       validate={[requiredField, maxLength100]}
                       name={"newMessageBody"}
                       placeholder={"Enter your message"}
                       cols={"20"}
                       rows={"5"}
                />
            </div>
            <div>
                <button >
                    <div className={s.btnText}>
                        SEND
                    </div>
                </button>
            </div>
        </form>)
}

const AddMessageFormRedux = reduxForm({form: "newMessageBody"})(AddMessageForm)

export default Dialogs