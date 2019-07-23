import * as React from 'react';
import './UserComponent.scss';
import avatarList from '../../constants/AnimalConstants';
import { COLORS } from '../../constants/ColorConstants';

export interface UserComponentProps {
    avatarId: number,
    colorId: number,
    username: string,
    id: number,
    bigger: boolean,
    onSelect: any,
}
export interface UserProps {
    onSelect: null,
}

const UserComponent: React.SFC<UserComponentProps> = props => {

    const { colorId, avatarId, bigger, username, onSelect } = props;

    const chosenAvatar = avatarList.find(avatar => avatar.id === avatarId)
    const chosenColor = COLORS.find(color => color.id === colorId)
    return (
        <div className={`user-component__items-wrapper ${bigger ? 'user-component__items-wrapper' : ''}`} data-id={props.id} onClick={bigger ? null : onSelect}>
            <div className={`user-component__color user-component__color--${chosenColor.name} ${bigger ? 'user-component__color--bigger' : ''}`}>
                <div className={`user-component__avatar-container ${bigger ? 'user-component__avatar-container--bigger' : ''}`}>
                    <img src={chosenAvatar.srcHigh} alt={chosenAvatar.name} className="user-component__avatar" />
                </div>
                <p className={`user-component__username ${bigger ? 'user-component__username--bigger' : ''}`}>{username}</p>
            </div>
        </div >

    );
}

export default UserComponent;