import React from "react";
import {addPostActionCreator} from "../../../../redux/profileReducer"
import MyPost from "./MyPost";
import {connect} from "react-redux";
// const MyPostContainer = () => {
//
//     // let state = props.store.getState()
//     //
//     // let addPost = () => {
//     //     // props.addPost()
//     //     props.store.dispatch(addPostActionCreator())
//     // }
//     //
//     // let onPostChange = (text) => {
//     //     let action = updateNewPostTextActionCreator(text)
//     //     props.store.dispatch(action)
//     // }
//     return <StoreContext.Consumer>
//         {
//             (store) => {
//
//                 let addPost = () => {
//                     // props.addPost()
//                     store.dispatch(addPostActionCreator())
//                 }
//
//                 let onPostChange = (text) => {
//                     let action = updateNewPostTextActionCreator(text)
//                     store.dispatch(action)
//                 }
//                 return <MyPost updateNewPostText={onPostChange} addPost={addPost}
//                                posts={store.getState().profilePage.postsData}
//                                newPostText={store.getState().profilePage.newPostText}/>
//             }
//
//         }
//     </StoreContext.Consumer>
//
// }
const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.postsData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)

export default MyPostContainer