import React from "react"
import s from "./users.module.css"

import * as axios from "axios"
import usersAvatar from "../../../assets/users/4766477.12632792.1200x1200o.0aca46f64627.png"
 
let Users = (props) => {


    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users", {
                headers: {
                    "API-KEY": "2155b059-8a62-4ecb-8fa4-7380df512d07"
                }

            }).then(response => {

                props.setUsers(response.data.items)
            })
        }
    }
    return <div className={s.content}>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img className={s.avatar} src={u.photos.small != null ? u.photos.small : usersAvatar} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>

            </div>)
        }
    </div>
}

export default Users