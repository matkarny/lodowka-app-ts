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

    handleBtnClick = direction => {
        if (direction) {
            this.setState(prevState => ({ loginStep: prevState.loginStep + 1 }))
        }
        else { this.setState(prevState => ({ loginStep: prevState.loginStep - 1 })) }
    }
    handleSelectBtnClick = (result) => {
        this.setState(prevState => {
            let newUser = { ...prevState.newUser }
            newUser[prevState.loginStep] = result
            return {
                newUser,
                loginStep: prevState.loginStep + 1
            }
        })
    }

    // LOGIN_STEPS = {
    //     [ActiveStep.FirstStep]: <AvatarSelectorStep onSelect={this.handleSelectBtnClick} />,
    //     3: <ColorSelectorStep onSelect={this.handleSelectBtnClick} />,
    // }



    render() {
        const ActiveStepComponent = StepComponent[this.state.loginStep];
        return (
            <ActiveStepComponent onSelect={this.handleSelectBtnClick} />
        );
    }
}

export default LoginView;