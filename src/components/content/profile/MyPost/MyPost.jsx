import React from "react";
import s from "./MyPost.module.css"
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../../utils/Validators/validators";
import {Textarea} from "../../../../utils/FormsControls/FormContorls";

// shouldComponentUpdate(nextProps, nextState, nextContext) {
//     return nextProps != this.props || nextState  !=this.state                             //убираем лишнюю перерисовку компоненты
// }
//PureComponent делают shouldComponentUpdate УБРАЛИ ВМЕСТЕ С КЛАССОВОЙ
const maxLength100 = maxLengthCreator(100)


const AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field className={s.postInput} name={"newPostText"} component={Textarea}
               placeholder={"Введите сообщение своего поста"}
               cols={"20"}
               rows={"5"}
               validate={[requiredField, maxLength100]}/>
        <div>
            <button>Add post</button>
            <button>remove post</button>
        </div>
    </form>
}


const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)
const MyPost = React.memo(props => {

    console.log("yoykyRENDER ")

    let postElements =
        props.posts.map(p => <Post message={p.message} likes={p.likes}/>)

    let addPost = (values) => {
        props.addPost(values.newPostText)
        // props.dispatch(addPostActionCreator())
    }

    //
    // let onPostChange = (e) => {                         НЕ НАДО Т.К. ЮЗАЕМ redux-form
    //     let text = e.target.value
    //     props.updateNewPostText(text)
    //     // let action = updateNewPostTextActionCreator(text)
    //     // props.dispatch(action)
    // }
    return (
        <div className={s.main}>
            My posts
            <AddNewPostFormRedux onSubmit={addPost}/>
            {postElements}
        </div>

    )
})



export default MyPost