import React from "react";
import s from "./navBar.module.css"
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.buttons}>
                <div className={s.profileBtn}>
                    <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
                </div>
                <div className={s.messageBtn}>
                    <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
                </div>
                <div className={s.newsBtn}>
                    <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
                </div>
                <div className={s.mscBtn}>
                    <NavLink to ="/music" activeClassName={s.activeLink}>Music</NavLink>
                </div>
                <div className={s.settingBtn}>
                    <NavLink to ="/setting" activeClassName={s.activeLink}>Setting</NavLink>
                </div>
                <div className={s.settingBtn}>
                    <NavLink to ="/users" activeClassName={s.activeLink}>Users</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default NavBar