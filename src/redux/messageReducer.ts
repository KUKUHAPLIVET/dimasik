const SEND_MESSAGE = "SEND_MESSAGE"
// const UPDATE_NEW_MESSAGE = "UPDATE_NEW_MESSAGE"
type DialogType = {
    id: number
    name: string
}

type MessageType ={
    id : number
    message :string
}
let initialState = {

    dialogsData: [
        { id: 1, name: "Dmitr" },
        { id: 2, name: "Danil" },
        { id: 3, name: "Alex" },
        { id: 4, name: "Sveta" },
        { id: 5, name: "Ivan" },
    ] as Array<DialogType>,
    messagesData: [
        { id: 1, message: "😢💖" },
        { id: 2, message: "Pidarasssss" },
        { id: 3, message: "Huilo" },
        { id: 4, message: "💖💖💖💖" },
        { id: 5, message: "Ivan" },
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

const messageReducer = (state = initialState, action:any):InitialStateType => {


    switch (action.type) {

        case SEND_MESSAGE:
            let newMessage = {
                id: 5,
                message: action.newMessageBody
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        // case UPDATE_NEW_MESSAGE:
        //     return {
        //         ...state,
        //         newMessageText: action.message
        //     }
        default:
            return state
    }
}

export default messageReducer

type SendMessageCreatorActionType = {
    type : typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody:string): SendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody})
// export const updateNewMessage = (message) =>
//     ({ type: UPDATE_NEW_MESSAGE, newMessage: message })
