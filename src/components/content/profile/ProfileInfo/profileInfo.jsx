import React, {useState} from "react"
import s from "./profileInfo.module.css"
import Preloader from "../../../preloader/preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import usersAvatar from "../../../../assets/users/4766477.12632792.1200x1200o.0aca46f64627.png"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import ProfileDataFormReduxForm from "./ProfileDataForm/ProfileDataForm";
import photoLoad from "../../../../assets/Img/png-transparent-computer-icons-android-android-blue-triangle-android.png"
import cn from "classnames"


const   ProfileInfo = ({profile, isOwner, saveProfile, ...props}) => {

    const [editMode, setEditMode] = useState(false)
    const [photo, setPhoto] = useState(null)
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {

        if (e.target.files.length) {
            setPhoto(e.currentTarget.files[0])
            e.target.value=null
            // props.savePhoto(e.target.files[0])
        }
    }

    const setNullPhoto =(e) =>{
        e.preventDefault()
        setPhoto(null)
    }
    const photoLoader = (e) =>{
        e.preventDefault()
        props.savePhoto(photo)
        setPhoto(null)
    }
    // const letsGo =()=> {
    //     props.savePhoto(photo)
    // }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
            setEditMode(false)
        })
    }




    return (

        <div className={s.item}>

            <div>
                <div >
                    <div className={s.photoBorder}>
                    <img className={s.avatar1} src={profile.photos.large || usersAvatar}/>
                    {isOwner && <div className={s.input__wrapper}>
                        <input name="file" onChange={onMainPhotoSelected} type="file" id="input__file" className={cn(s.input,s.input__file)}
                               multiple/>
                        <label htmlFor={!photo &&"input__file"} className={s.input__file_button}>
                                <label htmlFor="input__file" className={s.input__file_icon_wrapper}>
                                    <img className={s.input__file_icon}
                                         src={photoLoad} alt="Выбрать файл" width="25"/>
                                    </label>
                                {photo? (<div>
                                    <div  className={cn(s.buttonDelete,s.buttonsPhoto)} onClick={setNullPhoto}>УДАЛИТЬ</div>
                                    {photo.name}
                                    <div  className={cn(s.buttonSubmit,s.buttonsPhoto)} onClick={photoLoader}>ОТПРАВИТЬ</div>
                                </div>) : <span className={s.input__file_button_text}>Загрузить файл</span>}
                            </label>
                    </div>


                    }</div>


                        {/*// <input className={s.photoUp} type={"file"} onChange={onMainPhotoSelected}/>*/}


                        <div className={s.status}>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    </div>

                    {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
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
                <div className={s.infoUsers}>
                    <b >Looking for a job </b>: {profile.lookingForAJob ? "yes" : "no"}
                </div>
                {profile.lookingForAJob &&
                <div className={s.infoUsers}>
                    <b >My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
                }
                <div className={s.infoUsers}>
                    <b >About me</b> :{profile.aboutMe}
                </div>
                <div className={s.infoUsers}>
                    <b >Contacts</b> : {Object.keys(profile.contacts).map(key => {
                    return <Contact contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
            </div>
        </div>
    )
}


const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.infoUsers}><b className={s.infoUsers} >{contactTitle}</b>:{contactValue}</div>
}

export default ProfileInfo