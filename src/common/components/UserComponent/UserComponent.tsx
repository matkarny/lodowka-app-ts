import * as React from 'react';
import './UserComponent.scss';
import avatarList from '../../../common/constants/AnimalConstants';
import { COLORS } from '../../../common/constants/ColorConstants';

export interface UserComponentProps {
    avatarId: number,
    colorId: number,
    username: string,
    bigger: boolean
}

const UserComponent: React.SFC<UserComponentProps> = props => {
    const { colorId, avatarId, bigger, username } = props;

    const chosenAvatar = avatarList.find(avatar => avatar.id == avatarId)
    const chosenColor = COLORS.find(color => color.id == colorId)
    return (
        <div className="user-component__items-wrapper">
            <div className={`user-component__color user-component__color--${chosenColor.name} ${bigger ? 'user-component__color--bigger' : ''}`}>
                <div className={`user-component__avatar-container ${bigger ? 'user-component__avatar-container--bigger' : ''}`}>
                    <img src={`${bigger ? chosenAvatar.srcHigh : chosenAvatar.src}`} className="user-component__avatar" />
                </div>
                <p className={`user-component__username ${bigger ? 'user-component__username--bigger' : ''}`}>{username}</p>
            </div>
        </div >

    );
}

export default UserComponent;