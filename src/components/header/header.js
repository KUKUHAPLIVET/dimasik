import React from "react";
import s from "./header.module.css"
import logo from "../../assets/header/177095755.png"
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router-dom"
import photoExit from "./png-transparent-computer-icons-essex-school-entrance-angle-child-company.png"
import defaultAvatar from "../../assets/users/4766477.12632792.1200x1200o.0aca46f64627.png"
const Header = (props) => {
    // const history = useHistory()
    //
    // const RedirectToLogin = async () => {
    //     await props.logout()
    // }
    return <header className={s.Header}>
        <img className={s.logoMain} src={logo} alt=""/>

        <div className={s.nameSite}>
            D&S
        </div>

        <div className={s.loginBlock}>
            {props.isAuth

                ?
                <div >

                    <div className={s.profileBlock}>
                        {props.profilePage.myProfile?.photos.small ?<img className={s.avatar}
                                                                       src={props.profilePage.myProfile?.photos.small}/>
                        :<img src={defaultAvatar} className={s.avatar} />}
                    {props.login}

                   <img src={photoExit} className={s.logOutBtn} onClick={props.logout}/></div>
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header