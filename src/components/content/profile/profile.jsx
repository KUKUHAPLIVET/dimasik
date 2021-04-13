import React from "react";
import s from "./profile.module.css"
import ProfileInfo from "./ProfileInfo/profileInfo";
import MyPostContainer from "./MyPost/MyPostContainer";

const Profile = (props) => {
    return (
        <div>
            <div className={s.content}>
                <div className={s.profInfo}>

                    <ProfileInfo savePhoto={props.savePhoto}
                                 isOwner={props.isOwner}
                                 profile={props.profile}
                                 status={props.status}
                                 saveProfile={props.saveProfile}
                                 updateStatus={props.updateStatus}
                    />
                </div>
                <div className={s.posts}>
                    <MyPostContainer/>
                </div>
            </div>
        </div>
    )
}


export default Profile