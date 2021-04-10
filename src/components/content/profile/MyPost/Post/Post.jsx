import React from "react";
import s from "./Post.module.css"

const Post = (props) => {

    return (
        <div className={s.post}>
            <img
                src="https://i.pinimg.com/736x/33/85/f2/3385f2e1ae928f80fda6304ce36c6165--avatar-makeup-film-avatar.jpg"/>
            <div>
                {props.message}
            </div>
            <div>
                <span className={s.likes}>Like {props.likes}</span>
            </div>
        </div>
    )
}

export default Post


