import {sendMessageCreator} from "../../../redux/messageReducer";
import Dialogs from "./Dialogs";


import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../../hoc/withAuthRedirec";
import {compose} from "redux";


// const DialogsContainer = () => {
//     //
//     // let state = props.store.getState()
//     //
//     //
//     // let addMessage = () => {
//     //     props.store.dispatch(addMessageActionCreator())
//     // }
//     // let onMessageChange = (body) => {
//     //     props.store.dispatch(updateNewMessage(body))
//     // }
//
//     return <StoreContext.Consumer>
//         {
//             (store) => {
//
//                 let addMessage = () => {
//                     store.dispatch(addMessageActionCreator())
//                 }
//                 let onMessageChange = (body) => {
//                     storestore.dispatch(addMessageActionCreator())
//                 }
//
//                 return <Dialogs/> //dialogsData={store.getState().messagesPage.dialogsData}
//                                 // messagesData={store.getState().messagesPage.messagesData}
//                                 // updateNewMessageBody={onMessageChange}
//                                 // addMessage1={addMessage}
//                                 // // newMessageText={store.getState().messagesPage.newMessageText}/>
//             }
//         }
//     </StoreContext.Consumer>
// }

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}


// let AuthRedirectComponent = withAuthRedirect(Dialogs)
//
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Dialogs)
