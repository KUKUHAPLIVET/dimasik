import React from "react"
import usersAvatar from "../../../assets/users/4766477.12632792.1200x1200o.0aca46f64627.png"
import s from "./users.module.css"
import {NavLink} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/withAuthRedirec";
import {compose} from "redux";
import {useSelector} from "react-redux";



let User = ({user, followingInProgress,follow, unfollow, ...props}) => {

    const value = useSelector(state=> state.auth)

    return (
        <div>
                <span>
                    <div>

                    <NavLink to={"/profile/" + user.id}>
                        <img className={s.avatar} src={user.photos.small != null
                            ? user.photos.small : usersAvatar}/>
                            </NavLink>
                    </div>
                    <div>

                        {user.followed ? <button className={s.buttonFollow} disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => { unfollow(user.id)}}>Unfollow</button>
                             :<button className={s.buttonFollow} disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {follow(user.id)}}>Follow</button>}
                                </div>
                </span>
            <span>
                            <span>
                                <div>
                                    {user.name}
                                </div>
                            <div>
                                {user.id}
                            </div>
                            </span>
                            <span>
                                <div>
                                </div>
                                <div>
                                </div>
                            </span>
                    </span>
        </div>
    )
}

export default compose(withAuthRedirect(User))