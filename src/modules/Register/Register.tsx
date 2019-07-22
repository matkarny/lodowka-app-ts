import * as React from 'react';
import './Register.scss';
import RoleSelectorStep from './RoleSelectorStep/RoleSelectorStep';
import NameSelectorStep from './NameSelectorStep/NameSelectorStep';
import AvatarSelectorStep from './AvatarSelectorStep/AvatarSelectorStep';
import ColorSelectorStep from './ColorSelectorStep/ColorSelectorStep';
import PinSelectorStep from './PinSelectorStep/PinSelectorStep';
import ConfirmationStep from './ConfirmationStep/ConfirmationStep';
import { dispatchAddUser, getCurrentStore } from '../../store/UserStore';

export enum ActiveStep {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
    SixthStep,
};

const StepComponent = {
    [ActiveStep.FirstStep]: RoleSelectorStep,
    [ActiveStep.SecondStep]: NameSelectorStep,
    [ActiveStep.ThirdStep]: AvatarSelectorStep,
    [ActiveStep.FourthStep]: ColorSelectorStep,
    [ActiveStep.FifthStep]: PinSelectorStep,
    [ActiveStep.SixthStep]: ConfirmationStep,
};
const StepDescription = {
    [ActiveStep.FirstStep]: 'role',
    [ActiveStep.SecondStep]: 'username',
    [ActiveStep.ThirdStep]: 'avatarIndex',
    [ActiveStep.FourthStep]: 'colorIndex',
    [ActiveStep.FifthStep]: 'pin',
};

export interface RegistrationViewProps {
}

export interface RegistrationViewState {
    registrationStep: number,
    newUser: {
        id: number,
        role: string,
        username: string,
        avatarIndex: number,
        colorIndex: number,
        pin: string,
    }
}

class RegistrationView extends React.Component<RegistrationViewProps, RegistrationViewState> {
    state = {
        users: [],
        registrationStep: ActiveStep.FirstStep,
        newUser: {
            id: null,
            role: '',
            username: '',
            avatarIndex: null,
            colorIndex: null,
            pin: '',
        }
    }

    handleSelectBtnClick = result => {

        if (this.state.registrationStep === ActiveStep.FirstStep) {
            const currentData = getCurrentStore();
            let userId = currentData.users.id;
            const newUserID = userId + 1;

            this.setState(prevState => {
                let newUser = { ...prevState.newUser }
                newUser.id = newUserID
                return {
                    newUser
                }

            })
        }
        this.setState(prevState => {
            let newUser = { ...prevState.newUser }
            const activeStepDescription = StepDescription[prevState.registrationStep]
            newUser[activeStepDescription] = result

            return {
                newUser,
                registrationStep: prevState.registrationStep + 1
            }
        })
    }

    handleConfirmBtnClick = () => {
        dispatchAddUser(this.state.newUser)
    }
    handleBackBtnClick = () => {
        this.setState(prevState => ({
            registrationStep: prevState.registrationStep - 1
        })
        )
    }

    render() {
        const ActiveStepComponent: React.ReactType = StepComponent[this.state.registrationStep];
        return (
            <div className={`registration__container registration__container--step-${this.state.registrationStep}`}>
                <div className="registration__text-container">
                    <p className="registration__title">Add a family member</p>
                    <p className="registration__subtitle">Start by adding members of your family for a more personalised experience.</p>
                </div>
                {this.state.registrationStep < ActiveStep.SixthStep ?
                    < ActiveStepComponent
                        onSelect={this.handleSelectBtnClick}
                        onBack={this.handleBackBtnClick} />
                    :
                    < ActiveStepComponent
                        onSelect={this.handleConfirmBtnClick}
                        onBack={this.handleBackBtnClick}
                        colorId={this.state.newUser.colorIndex}
                        avatarId={this.state.newUser.avatarIndex}
                        username={this.state.newUser.username}
                        id={this.state.newUser.id}
                    />}
            </div>
        );
    }
}

export default RegistrationView;