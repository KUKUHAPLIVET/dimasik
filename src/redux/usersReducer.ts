import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = " TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"
const SET_PORTION_NUMBER = "SET_PORTION_NUMBER"

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 4,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id's
    portionSize: 5,
    portionNumber: 1,
}

type InitialState = typeof initialState

const usersReducer = (state = initialState, action:any):InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,

                users: updateObjectInArray(state.users, action.usersId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {

                ...state,
                users: updateObjectInArray(state.users, action.usersId, "id", {followed: false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case  TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case SET_PORTION_NUMBER:{
            return{...state, portionNumber: action.page}
        }
        default:
            return state    }

}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    usersId: number
}
export const followSuccess = (usersId:number):FollowSuccessActionType => ({type: FOLLOW, usersId})
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    usersId: number
}
export const unfollowSuccess = (usersId:number):UnfollowSuccessActionType => ({type: UNFOLLOW, usersId})
type SetUsersActionType = {
    type: typeof SET_USERS
    users:Array<UserType>
}
export const setUsers = (users:Array<UserType>):SetUsersActionType => ({type: SET_USERS, users})
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage:number
}
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (count:number):SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count})
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})
type SetPortionNumberActionType = {
    type: typeof SET_PORTION_NUMBER
    page:number
}

export const setPortionNumber = (page:number):SetPortionNumberActionType => ({type:SET_PORTION_NUMBER, page })
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching:boolean
    userId:number
}


export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const requestUsers = (currentPage:number, pageSize:number) => {
    return async (dispatch:any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

const followUnfollowFLow = async (dispatch:any, userId:number, apiMethod:any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))

}

export const follow = (userId:number) => {
    return async (dispatch:any) => {
        followUnfollowFLow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId:number) => {
    return async (dispatch:any) => {
        followUnfollowFLow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer