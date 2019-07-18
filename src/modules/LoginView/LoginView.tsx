import * as React from 'react';
import './LoginView.scss';
import ConfirmationStep from '../ConfirmationStep/ConfirmationStep'
import RoleSelectorStep from '../RoleSelectorStep/RoleSelectorStep';
import NameSelectorStep from '../NameSelectorStep/NameSelectorStep';
import AvatarSelectorStep from '../AvatarSelectorStep/AvatarSelectorStep';
import ColorSelectorStep from '../ColorSelectorStep/ColorSelectorStep';
import PinSelectorStep from '../PinSelectorStep/PinSelectorStep';

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

export interface LoginViewProps {
}

export interface LoginViewState {
    loginStep: number,
    newUser: {
        role: string,
        username: string,
        avatarIndex: number,
        colorIndex: number,
        pin: string,
    }
}

class LoginView extends React.Component<LoginViewProps, LoginViewState> {
    state = {
        users: [],
        loginStep: ActiveStep.FirstStep,
        newUser: {
            role: '',
            username: '',
            avatarIndex: null,
            colorIndex: null,
            pin: '',
        }
    }

    handleSelectBtnClick = result => {
        this.setState(prevState => {
            let newUser = { ...prevState.newUser }
            const activeStepDescription = StepDescription[prevState.loginStep]
            newUser[activeStepDescription] = result
            return {
                newUser,
                loginStep: prevState.loginStep + 1
            }
        })
    }
    handleBackBtnClick = () => {
        this.setState(prevState => ({
            loginStep: prevState.loginStep - 1
        })
        )
    }

    render() {
        const ActiveStepComponent: React.ReactType = StepComponent[this.state.loginStep];
        return (
            <div className={`login__container login__container--step-${this.state.loginStep}`}>
                <p className="login__title">Add a family member</p>
                <p className="login__subtitle">Start by adding members of your family for a more personalised experience.</p>
                {this.state.loginStep < ActiveStep.SixthStep ?
                    < ActiveStepComponent
                        onSelect={this.handleSelectBtnClick}
                        onBack={this.handleBackBtnClick} />
                    : < ActiveStepComponent
                        onSelect={this.handleSelectBtnClick}
                        onBack={this.handleBackBtnClick}
                        colorId={this.state.newUser.colorIndex}
                        avatarId={this.state.newUser.avatarIndex}
                        username={this.state.newUser.username}
                    />}
            </div>
        );
    }
}

export default LoginView;