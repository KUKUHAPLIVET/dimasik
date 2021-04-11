import React from "react";
import s from "../profileInfo.module.css";
import {createField, Input, Textarea} from "../../../../../utils/FormsControls/FormContorls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit, profile}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <div>
                <button onClick={()=>{}}>edit</button>
            </div>

            <div className={s.name}>
                Name : {createField("Full name","fullName",[],Input)}
            </div>

            <div>
                <div>
                    <b>Looking for a job </b>: {createField("","lookingForAJob",[],Input,{type:"checkbox"})}
                </div>
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                    {createField("My professional skills","lookingForAJobDescription",[],Textarea)}
                </div>
                <div>
                    <b>About me</b> :{profile.aboutMe}
                    {createField("About Me","About Me",[],Textarea)}
                </div>
                {/*<div>*/}
                {/*    <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {*/}
                {/*    return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>*/}
                {/*})}*/}
                {/*</div>*/}
            </div>
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form:"edit-profile"})(ProfileDataForm)
export default ProfileDataFormReduxForm