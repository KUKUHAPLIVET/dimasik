import React, {useState} from "react"
import usersAvatar from "../../../assets/users/4766477.12632792.1200x1200o.0aca46f64627.png"
import s from "./users.module.css"
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../../api/api";
import Paginator from "../../Common/Paginator/Paginator";
import User from "./user";



let Users = ({users, ...props}) => {

    return <div className={s.content}>
        <Paginator totalItemsCount={props.totalUsersCount} {...props}/>
        <div>
            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     {...props}/>)
            }
        </div>
    </div>
}

export default Users