import * as React from 'react';
import AvatarSelectorStep from '../AvatarSelectorStep/AvatarSelectorStep'
import ColorSelectorStep from '../ColorSelectorStep/ColorSelectorStep'

export enum ActiveStep {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep
};

const StepComponent = {
    [ActiveStep.FirstStep]: AvatarSelectorStep,
    [ActiveStep.SecondStep]: AvatarSelectorStep,
    [ActiveStep.ThirdStep]: AvatarSelectorStep,
    [ActiveStep.FourthStep]: ColorSelectorStep,
};
const StepDescription = {
    [ActiveStep.FirstStep]: 'role',
    [ActiveStep.SecondStep]: 'username',
    [ActiveStep.ThirdStep]: 'avatarIndex',
    [ActiveStep.FourthStep]: 'colorIndex',
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
    }
}

class LoginView extends React.Component<LoginViewProps, LoginViewState> {
    state = {
        users: [],
        loginStep: ActiveStep.ThirdStep,
        newUser: {
            role: 'parent',
            username: 'Janusz',
            avatarIndex: null,
            colorIndex: null,
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
        const ActiveStepComponent = StepComponent[this.state.loginStep];
        return (
            <ActiveStepComponent
                onSelect={this.handleSelectBtnClick}
                onBack={this.handleBackBtnClick} />
        );
    }
}

export default LoginView;