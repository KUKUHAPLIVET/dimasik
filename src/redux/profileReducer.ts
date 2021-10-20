import {profileAPI, usersAPI} from "../api/api";
import {act} from "@testing-library/react";
import {stopSubmit} from "redux-form";
import authReducer from "./authReducer";
import {getCurrentUserId} from "./authSelectors";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "ADD_POST"
// const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const SET_MY_PROFILE = "SET_MY_PROFILE"


let initialState = {
    postsData: [
        {id: 1, message: "Hihihihiihh", likes: 20},
        {id: 2, message: "aahahahhaha", likes: 25},
        {id: 3, message: "my pist epta", likes: 50},
        {id: 4, message: "Hihihihiihh", likes: 60},
        {id: 5, message: "PIDARAS povesilsa", likes: 770},
    ] as Array<PostType>,
    // newPostText: "dmitrySas.com",
    profile: null as ProfileType | null,
    status: "",
    myProfile: null as ProfileType|null,
    newPostText:""
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action:any):InitialStateType => {

    switch (action.type) {

        case ADD_POST:
            let newPost:PostType = {
                id: 5,
                message: action.newPostText,                                   //state.newPostText,
                likes: 0,
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
                profile: action.profile,
            }
        }
        case SET_MY_PROFILE:{
            return {
                ...state,
                myProfile: action.myProfile,
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
        case SAVE_PHOTO_SUCCESS : {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType,
                    myProfile: {...state.myProfile, photos : action.photos} as ProfileType
            }
        }
        default:
            return state
    }
}

type AddPostActionCreatorActionType = {
    type : typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText})
type SetUserProfileActionType ={
    type : typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetMyProfileActionType ={
    type : typeof SET_MY_PROFILE
    myProfile: ProfileType
}
const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
const setMyProfile = (myProfile:ProfileType):SetMyProfileActionType => ({type: SET_MY_PROFILE, myProfile})
type SetStatusActionType = {
    type : typeof SET_STATUS
    status: string
}

export const setStatus = (status:string):SetStatusActionType => ({type: SET_STATUS, status})
type DeletePostActionType={
    type:typeof DELETE_POST,
    postId:number
}

export const deletePost = (postId:number):DeletePostActionType => ({type: DELETE_POST, postId})
type SavePhotoSuccessActionType ={
    type : typeof SAVE_PHOTO_SUCCESS
    photos:PhotosType
}

export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId:number) => async (dispatch:any) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))

}
export const getMyProfile = (id:number) => async (dispatch:any) =>{
    const response = await usersAPI.getProfile(id)
    dispatch(setMyProfile(response.data))
}


export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}


export const updateStatus = (status:string) => async (dispatch:any) => {

        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
}

export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

// export const updateNewPostTextActionCreator = (text) =>
//     ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default profileReducer