import * as React from 'react';
import AvatarSelectorStep from '../AvatarSelectorStep/AvatarSelectorStep';
import ColorSelectorStep from '../ColorSelectorStep/ColorSelectorStep';
import NameSelectorStep from '../NameSelectorStep/NameSelectorStep';
import PinSelectorStep from '../PinSelectorStep/PinSelectorStep';

export enum ActiveStep {
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
};

const StepComponent = {
    [ActiveStep.FirstStep]: AvatarSelectorStep,
    [ActiveStep.SecondStep]: NameSelectorStep,
    [ActiveStep.ThirdStep]: AvatarSelectorStep,
    [ActiveStep.FourthStep]: ColorSelectorStep,
    [ActiveStep.FifthStep]: PinSelectorStep,
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
        loginStep: ActiveStep.SecondStep,
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
        const ActiveStepComponent = StepComponent[this.state.loginStep];
        return (
            <ActiveStepComponent
                onSelect={this.handleSelectBtnClick}
                onBack={this.handleBackBtnClick} />
        );
    }
}

export default LoginView;