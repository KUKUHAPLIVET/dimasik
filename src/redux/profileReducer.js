import {profileAPI, usersAPI} from "../api/api";
import {act} from "@testing-library/react";

const ADD_POST = "ADD_POST"
// const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"


let initialState = {
    postsData: [
        {id: 1, message: "Hihihihiihh", likes: 20},
        {id: 2, message: "aahahahhaha", likes: 25},
        {id: 3, message: "my pist epta", likes: 50},
        {id: 4, message: "Hihihihiihh", likes: 60},
        {id: 5, message: "PIDARAS povesilsa", likes: 770},
    ],
    // newPostText: "dmitrySas.com",
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,                                   //state.newPostText,
                likes: 0
            }
            return {
                ...state,
                newPostText: "",
                postsData: [...state.postsData, newPost]
            }

        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     }
        // }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {...state, postsData: state.postsData.filter(p => p.id != action.postId)}
        }
        default:
            return state
    }
}


export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}


export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}


export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}


// export const updateNewPostTextActionCreator = (text) =>
//     ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default profileReducer