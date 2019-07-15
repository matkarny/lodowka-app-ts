import * as React from 'react';
import './AvatarSelectorStep.scss';
export interface AvatarSelectorProps {

}

export interface AvatarSelectorState {
    selectedAvatar: number
}

class AvatarSelector extends React.Component<AvatarSelectorProps, AvatarSelectorState> {
    state = {
        selectedAvatar: null
    }
    render() {
        return (
            <div className="login-avatar__container">

                <p className='login-avatar__title'>Add a family member</p>
                <p className='login-avatar__subtitle'>What is your favorite avatar?</p>

                <div className="login-avatar__items-wrapper">


                </div>
                <div className="login-avatar__btn-container">
                    <button className="login-avatar__button login-avatar__button--cancel">Back</button>
                    <button className="login-avatar__button login-avatar__button--select">Select</button>
                </div>
            </div>
        )
    }
}

export default AvatarSelector;