import React from "react";


class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        console.log(this)
        this.setState({
            editMode: true,

        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {

        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){   //условие для стейтов обязательно
        if (prevProps.status !== this.props.status) {                           // метод жизненного цикла
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || "---No status-----"}
                        </span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                           value={this.state.status}>
                    </input>
                </div>
                }
            </div>

        )
    }
}


export default ProfileStatus