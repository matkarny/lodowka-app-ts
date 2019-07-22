import * as React from 'react';
import './WelcomeView.scss';
import UserComponent from '../../../common/components/UserComponent/UserComponent';
import { getCurrentStore } from '../../../store/UserStore';
export interface WelcomeViewProps {
    isUserLoggedIn: boolean,
    isParent: boolean,
    getUsersData: any,
    userClick: any,
}

export interface WelcomeViewState {
    users: any,
}

class WelcomeView extends React.Component<WelcomeViewProps, WelcomeViewState> {
    state = { users: null }

    renderUsers = () => {
        const usersData = this.props.getUsersData();
        const currentUsers = usersData.usersList.map((user, index) => <UserComponent
            avatarId={user.avatarIndex}
            colorId={user.colorIndex}
            username={user.username}
            id={user.id}
            bigger={false}
            key={index}
            onSelect={this.props.userClick} />)
        this.setState({ users: currentUsers })

    }
    componentDidMount() {
        this.renderUsers();
    }
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