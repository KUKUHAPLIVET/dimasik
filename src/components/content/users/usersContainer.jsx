import React from 'react'
import {connect} from 'react-redux'
import {
    follow,
    unfollow,
    setCurrentPage,
    // setTotalUsersCount
    toggleFollowingProgress,
    requestUsers, setPortionNumber
} from '../../../redux/usersReducer'
import Users from "./users"
import *as axios from "axios"
import Preloader from '../../preloader/preloader'
import {usersAPI} from "../../../api/api";
import {withAuthRedirect} from "../../../hoc/withAuthRedirec";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize, getPortionNumber, getPortionSize,
    getTotalUsersCount, getUsers
} from "../../../redux/usersSelectors";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
        // this.props.setCurrentPage(pageNumber)
        // this.props.toggleIsFetching(true)
        //
        // usersAPI.getUsers(pageNumber, this.props.pageSize)
        //     .then(data => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(data.items)
        //     })
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}
                portionSize={this.props.portionSize}
                portionNumber = {this.props.portionNumber}
                setPortionNumber={this.props.setPortionNumber}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
        portionNumber: getPortionNumber(state)
    }
}

// let withRedirect = withAuthRedirect(UsersContainer)
// export default connect(mapStateToProps,
//     {
//         follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers
//     })(withRedirect)

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress,  requestUsers, setPortionNumber}),
    withAuthRedirect,
)(UsersContainer)

// let mapDispatchToProps = (dispatch) => {
//     return
//     // {
//         // follow: (userId) => {
//         //     dispatch(followAc(userId))
//         // },
//         // unfollow: (userId) => {
//         //     dispatch(unfollowAC(userId))
//         // },
//         // setUsers: (users) => {
//         //     dispatch(setUsersAC(users))
//         // },
//         // setCurrentPage: (pageNumber) => [
//         //     dispatch(setCurrentPageAC(pageNumber))
//         // ],
//         // setTotalUsersCount: (count) => {
//         //     dispatch(setTotalUsersCountAC(count))
//         // },
//         // toggleIsFetching: (isFetching) => {
//         //     dispatch(toggleIsFetching(isFetching))
//         // }

//     // }

// }