import './App.css';
import NavBar from "./components/navBar/navBar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from "./components/content/news/news";
import Music from "./components/content/music/music";
import Setting from "./components/content/setting/setting";
import React, {Component} from "react";
import UsersContainer from './components/content/users/usersContainer';
import ProfileContainer from "./components/content/profile/ProfileContainer";
import HeaderContainer from "./components/header/headerContainer";
import Login from "./components/content/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import Image from "./assets/backgrounds/Fantasy_Samurai_is_in_the_forest_096307_.jpg"
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/preloader/preloader";
import store from "./redux/reduxStore";
import {withSuspense} from "./hoc/withSuspence";
// import DialogsContainer from "./components/content/dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import("./components/content/dialogs/DialogsContainer"))

const backImg = {
    backgroundImage: `url(${Image})`,
    backgroundAttachment: "fixed", //позиционка бэкграунда нахуй

}

class App extends Component {

    // catchAllUnhandledErrors =(reason, promise)=>{
    //     alert("some error occured")
    // }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection",this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                < div style={backImg} className="app-layout">
                    <NavBar/>
                    <div className="app-wrapper-content">
                        <Switch>

                            <Route exact path="/"
                                   render={() => <Redirect to={"/profile"}/>}/>
                            <Route path="/dialogs"
                                   render={withSuspense(DialogsContainer)}/>
                            <Route path="/profile/:userId?"
                                   render={() => <ProfileContainer/>}/>
                            <Route path="/news"
                                   render={() => <News/>}/>
                            <Route path="/music"
                                   render={() => <Music/>}/>
                            <Route path="/setting"
                                   render={() => <Setting/>}/>
                            <Route path="/users"
                                   render={() => <UsersContainer/>}/>
                            <Route path="/login"
                                   render={() => <Login/>}/>
                            <Route path="/dimasik"
                                   render={() => <Login/>}/>
                            <Route exact path="*"
                                   render={() => <div>404 NOT FOUND</div>}/>

                        </Switch>
                    </div>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const DimasikJsApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default DimasikJsApp