import * as React from 'react';
import './AvatarSelector.scss';
import owl from './img/eagle-owl-raptor-falconry-owl-53977.png'
import eagle from './img/pexels-photo-145962.png'
import raccoon from './img/pexels-photo-148359.png'
import parrot from './img/pexels-photo-1661179.png'
import cat from './img/pexels-photo-2355519.png'
export interface AvatarSelectorProps {

}

export interface AvatarSelectorState {
    users: Array<object>,
}

class AvatarSelector extends React.Component<AvatarSelectorProps, AvatarSelectorState> {
    state = {
        users: [],
        newUser: {
            isParent: true,
            name: 'Janusz',
            avatar: 0,
            colorIndex: 0
        }
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