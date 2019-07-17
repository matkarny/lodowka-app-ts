import * as React from 'react';
import './ConfirmationStep.scss'
import avatarList from '../../common/constants/AnimalConstants';
import avatar from '../../common/images/pexels-photo-148359@2x.png'
export interface ConfirmationStepProps {
    // color: number,
    avatarId: number,
    // username: string,
}

const ConfirmationStep: React.SFC<ConfirmationStepProps> = props => {

    // const chosenAvatar = avatarList.find(avatar => avatar.id === parseInt(props.avatarId))
    const chosenAvatar = avatarList.find(avatar => avatar.id === props.avatarId)

    return (
        <div className="login-confirmation__container">

            <p className='login-confirmation__title'>Does that sound alright?</p>
            <p className='login-confirmation__subtitle'>Check if everything is in order and confirm to create an account or go back to make changes.</p>

            <div className="login-confirmation__items-wrapper">
                <div className={`login-confirmation__color login-confirmation__color--`}>
                    <div className="login-confirmation__avatar-container">
                        <img src={chosenAvatar.srcHigh} className="login-confirmation__avatar" />
                    </div>
                    <p className="login-confirmation__username">Janusz</p>
                </div>

            </div>
            {/* <div className="login-confirmation__btn-container">
                <button
                    className="login-confirmation__button login-confirmation__button--cancel"
                    onClick={this.props.onBack}>Back</button>
                <button
                    className={`login-confirmation__button ${this.state.selectedconfirmation ? 'login-confirmation__button--select' : 'login-confirmation__button--disabled'}`}
                    disabled={this.state.selectedconfirmation ? false : true}
                    onClick={() => this.props.onSelect(this.state.selectedconfirmation)}>
                    Select
            </button>

            </div> */}
        </div>
    );
}

export default ConfirmationStep;