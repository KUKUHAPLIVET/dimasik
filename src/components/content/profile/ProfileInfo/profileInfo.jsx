import React, {useState} from "react"
import s from "./profileInfo.module.css"
import Preloader from "../../../preloader/preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import usersAvatar from "../../../../assets/users/4766477.12632792.1200x1200o.0aca46f64627.png"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import ProfileDataFormReduxForm from "./ProfileDataForm/ProfileDataForm";

const ProfileInfo = ({profile, isOwner, ...props}) => {


    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={s.item}>
            <div>
                <div>
                    <img className={s.avatar1} src={profile.photos.large || usersAvatar}/>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                    <div className={s.status}>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    </div>

                    {editMode ? <ProfileDataFormReduxForm profile={profile}/> :
                        <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}

                </div>

            </div>
        </div>
    )
}
const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}

            <div className={s.name}>
                Name : {profile.fullName}
            </div>

            <div>
                <div>
                    <b>Looking for a job </b>: {profile.lookingForAJob ? "yes" : "no"}
                </div>
                {profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
                }
                <div>
                    <b>About me</b> :{profile.aboutMe}
                </div>
                <div>
                    <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
                    return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
            </div>
        </div>
    )
}



const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>:{contactValue}</div>
}

export default ProfileInfo