import React from "react";
import s from "../profileInfo.module.css";
import {createField, Input, Textarea} from "../../../../../utils/FormsControls/FormContorls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit, profile,error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <div>
                <button onClick={() => {
                }}>save
                </button>
            </div>

            <div className={s.name}>
                Name : {createField("Full name", "fullName", [], Input)}
            </div>

            <div>
                <div>
                    <b>Looking for a job </b>: {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
                </div>
                <div>
                    <b>My professional skills</b>
                    {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
                </div>
                <div>
                    <b>About me</b>
                    {createField("About Me", "AboutMe", [], Textarea)}
                </div>
                <div>
                    <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
                    return <div><b>{key}: {createField(key, "contacts." + key, [], Input)}</b></div>
                })}
                </div>
            </div>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm)
export default ProfileDataFormReduxForm