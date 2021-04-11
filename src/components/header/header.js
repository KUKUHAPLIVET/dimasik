import React from "react";
import s from "./header.module.css"
import logo from "../../assets/header/177095755.png"
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router-dom"


const Header = (props) => {

    // const history = useHistory()
    //
    // const RedirectToLogin = async () => {
    //     await props.logout()
    // }
    return <header className={s.Header}>
        <img className={s.logoMain} src={logo} alt=""/>

        <div className={s.nameSite}>
            XXX.Chats 1+++
        </div>

        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>
                    <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    <div>{props.email}</div>
                    <div className={s.text}>VIP</div>
                </div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header