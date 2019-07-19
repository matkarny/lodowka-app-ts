import * as React from 'react';
import './UserComponent.scss';

export interface UserComponentProps {
    chosenAvatar: object,
    chosenColor: object,
    username: string,
    bigger: boolean
}

const UserComponent: React.SFC<UserComponentProps> = props => {
    const { chosenColor, chosenAvatar, bigger, username } = props;
    return (
        <div className="user-component__items-wrapper">
            <div className={`user-component__color user-component__color--${chosenColor.name} ${bigger ? 'user-component__color' : ''}`}>
                <div className={`user-component__avatar-container ${bigger ? 'user-component__avatar-container--bigger' : ''}`}>
                    <img src={`${bigger ? chosenAvatar.srcHigh : chosenAvatar.src}`} className="user-component__avatar" />
                </div>
                <p className={`user-component__username ${bigger ? 'user-component__username' : ''}`}>{username}</p>
            </div>
        </div >

    );
}
UserComponent.defaultProps = {
    bigger: false,
}

export default UserComponent;