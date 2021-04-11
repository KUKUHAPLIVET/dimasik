import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";
let state = {
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

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("DimasikSas")

    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect (newState.postsData.length).toBe(6)
    expect (newState.postsData[5].message).toBe("DimasikSas")
})


it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(10001)

    // 2. action
    let newState = profileReducer(state, action)
    // 3. expectation
    expect (newState.postsData.length).toBe(5)
})
