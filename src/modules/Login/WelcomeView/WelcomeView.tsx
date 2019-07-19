import * as React from 'react';
import UserComponent from '../../../common/components/UserComponent/UserComponent';
import { getCurrentStore } from '../../../store/UserStore';
export interface WelcomeViewProps {

}

export interface WelcomeViewState {

}

class WelcomeView extends React.Component<WelcomeViewProps, WelcomeViewState> {
    state = { users: null }

    getUsers = () => {

        const data = getCurrentStore()
        const usersArray = data.users
        const currentUsers = usersArray.map((user, index) => <UserComponent
            avatarId={user.avatarIndex}
            colorId={user.colorIndex}
            username={user.username}
            bigger={true}
            key={index} />)
        this.setState({ users: currentUsers })
    }
    componentDidMount() { this.getUsers() }
    render() {
        return (
            <>
                <p className="login__welcome-view-title">Family members</p>
                <p className="login__welcome-view-subtitle">Tap an avatar to log in as a family member.</p>
                <div className="login__welcome-view-container">{this.state.users}</div>
            </>
        );
    }
}

export default WelcomeView;