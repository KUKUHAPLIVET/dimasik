// rerenderEntireTree = () => {}  //NEPLOXO PEREDALI
// let state = {
//     profilePage: {
//         postsData: [
//             {id: 1, message: "Hihihihiihh", likes: 20},
//             {id: 2, message: "aahahahhaha", likes: 25},
//             {id: 3, message: "my pist epta", likes: 50},
//             {id: 4, message: "Hihihihiihh", likes: 60},
//             {id: 5, message: "PIDARAS povesilsa", likes: 770},
//         ],
//         newPostText: "dmitrySas.com"
//     },
//     messagesPage: {
//         dialogsData: [
//             {id: 1, name: "Dmitr"},
//             {id: 2, name: "Danil"},
//             {id: 3, name: "Alex"},
//             {id: 4, name: "Sveta"},
//             {id: 5, name: "Ivan"},
//         ],
//         messagesData: [
//             {id: 1, message: "Hihihihiihh"},
//             {id: 2, message: "Pidarasssss"},
//             {id: 3, message: "Huilo"},
//             {id: 4, message: "Sam huilo"},
//             {id: 5, message: "Ivan"},
//         ],
//     },
//     sidebar: {}
// }
//
// export const addPost = () => {
//
//     let newPost = {
//         id: 5,
//         message: state.profilePage.newPostText,
//         likes: 0
//     }
//
//     state.profilePage.postsData.push(newPost)
//     state.profilePage.newPostText=""
//     rerenderEntireTree(state)
// }
//
// export const updateNewPostText = (newText) => {
//     state.profilePage.newPostText = newText
//     rerenderEntireTree(state)
// }
// export const subscribe = (observer) => {
//     rerenderEntireTree= observer   // observer//  addEventListener
//
// }
import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
//




let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: "Hihihihiihh", likes: 20},
                {id: 2, message: "aahahahhaha", likes: 25},
                {id: 3, message: "my pist epta", likes: 50},
                {id: 4, message: "Hihihihiihh", likes: 60},
                {id: 5, message: "PIDARAS povesilsa", likes: 770},
            ],
            newPostText: "dmitrySas.com"
        },
        messagesPage: {
            dialogsData: [
                {id: 1, name: "Dmitr"},
                {id: 2, name: "Danil"},
                {id: 3, name: "Alex"},
                {id: 4, name: "Sveta"},
                {id: 5, name: "Ivan"},
            ],
            messagesData: [
                {id: 1, message: "Hihihihiihh"},
                {id: 2, message: "Pidarasssss"},
                {id: 3, message: "Huilo"},
                {id: 4, message: "Sam huilo"},
                {id: 5, message: "Ivan"},
            ],
            newMessageText: "Введите своё сообщение!"
        },
        sidebar: {}
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
    },
    subscribe(observer) {

        this._callSubscriber = observer   // observer//  addEventListener
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messageReducer(this._state.messagesPage, action)

        this._callSubscriber(this._state)// { type: 'ADD-POST'  } action это объект
    }

}




// export default store
//store OOP