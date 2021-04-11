import React from "react"
import s from "./profileInfo.module.css"
import Preloader from "../../../preloader/preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={s.item}>
            <div>
                <div>
                    <img className={s.avatar1} src={props.profile.photos.large}/>
                    <div className={s.status}>
                        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    </div>
                </div>
                <div className={s.name}>
                    {props.profile.fullName}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo