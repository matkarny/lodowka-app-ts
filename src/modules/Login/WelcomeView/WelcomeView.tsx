import * as React from 'react';
import './WelcomeView.scss';
import UserComponent from '../../../common/components/UserComponent/UserComponent';
import NewUserComponent from '../../../common/components/NewUserComponent/NewUserComponent';
export interface WelcomeViewProps {
  isParentLogged: boolean,
  getUsersData: any,
  userClick: any,
  newMemberClick: any,
  // checkIsParentLogged: any,
}

export interface WelcomeViewState {
  users: any,
}

class WelcomeView extends React.Component<WelcomeViewProps, WelcomeViewState> {
  state = { users: null }

  renderUsers = () => {
    const usersData = this.props.getUsersData();
    const currentUsers = usersData.map((user, index) => <UserComponent
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
    // this.props.checkIsParentLogged();
  }
  render() {
    return (
      <>
        <div className="login__text-container">
          <p className="login__welcome-view-title login__welcome-view-title--bigger">Welcome to Lodówkapp</p>
          <p className="login__welcome-view-subtitle login__welcome-view-subtitle--bigger">Start by adding members of your family for a more personalised experience.</p>
        </div>
        <p className="login__welcome-view-title">Family members</p>
        <p className="login__welcome-view-subtitle">Tap an avatar to log in as a family member.</p>
        <div className="login__welcome-view-container">{this.state.users}{this.props.isParentLogged ? <NewUserComponent
          onSelect={this.props.newMemberClick}
        /> : null}</div>
      </>
    );
  }
}

export default WelcomeView;
