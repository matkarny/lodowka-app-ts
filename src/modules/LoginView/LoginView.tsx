import * as React from 'react';
import './LoginView.scss';
import owl from './img/eagle-owl-raptor-falconry-owl-53977.png'
import eagle from './img/pexels-photo-145962.png'
import raccoon from './img/pexels-photo-148359.png'
import parrot from './img/pexels-photo-1661179.png'
import cat from './img/pexels-photo-2355519.png'
export interface LoginViewProps {

}

export interface LoginViewState {
    users: Array<object>,
}

class LoginView extends React.Component<LoginViewProps, LoginViewState> {
    state = {
        users: [],
        newUser: {
            isParent: true,
            name: 'Janusz',
            animal: 0,
            colorIndex: 0
        }
    }
    render() {
        return (
            <div className="login-animal__container">

                <p className='login-animal__title'>Add a family member</p>
                <p className='login-animal__subtitle'>What is your favorite animal?</p>

                <div className="login-animal__items-wrapper">
                    <div className="login-animal__item-container" id="1">
                        <img className="login-animal__item login-animal__item--active" src={owl} alt="" />
                    </div>
                    <div className="login-animal__item-container" id="2">
                        <img className="login-animal__item login-animal__item--active" src={eagle} alt="" />
                    </div>
                    <div className="login-animal__item-container" id="3">
                        <img className="login-animal__item login-animal__item--active" src={raccoon} alt="" />
                    </div>
                    <div className="login-animal__item-container" id="4">
                        <img className="login-animal__item login-animal__item--active" src={parrot} alt="" />
                    </div>
                    <div className="login-animal__item-container" id="5">
                        <img className="login-animal__item login-animal__item--active" src={cat} alt="" />
                    </div>
                </div>
                <div className="login-animal__btn-container">
                    <button className="login-animal__button login-animal__button--cancel">Back</button>
                    <button className="login-animal__button login-animal__button--select">Select</button>
                </div>
            </div>
        )
    }
}

export default LoginView;