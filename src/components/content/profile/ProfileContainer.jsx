import React from "react";
import Profile from "./profile";
// import {setUserProfile} from "../../../redux/profileReducer";
import {getStatus, getUserProfile, savePhoto, updateStatus} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import Redirect from "react-router-dom/es/Redirect";
import {withAuthRedirect} from "../../../hoc/withAuthRedirec";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)

    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshProfile()
    }


    render() {
        return (
            <div>
                <Profile{...this.props}
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto }/>
            </div>
        )
    }
}

let mapStateToProps = (state) => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
)


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {getUserProfile})    //setUserProfile})
//     (WithUrlDataContainerComponent)