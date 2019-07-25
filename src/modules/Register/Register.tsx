import * as React from 'react';
import './Register.scss';
import RoleSelectorStep from './RoleSelectorStep/RoleSelectorStep';
import NameSelectorStep from './NameSelectorStep/NameSelectorStep';
import AvatarSelectorStep from './AvatarSelectorStep/AvatarSelectorStep';
import ColorSelectorStep from './ColorSelectorStep/ColorSelectorStep';
import PinSelectorStep from './PinSelectorStep/PinSelectorStep';
import ConfirmationStep from './ConfirmationStep/ConfirmationStep';
import { IUser } from '../../common/interfaces/Users';
import { ADD_USER } from '../../store/actions/UsersActions';
import { connect } from 'react-redux';
import { addUser } from '../../store/storeConfigure';


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
    goToWelcomeView: any,
    selectClick: any,
    confirmClick: any,
    backClick: any,
    addUser
}

export interface RegistrationViewState {
    registrationStep: number,
    newUser: {
        id: number,
        role: number,
        username: string,
        avatarIndex: number,
        colorIndex: number,
        pin: string,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addUser: (user: IUser) => dispatch({ type: ADD_USER, payload: user }),
    }
}

class RegistrationView extends React.Component<RegistrationViewProps, RegistrationViewState> {
    state = {
        users: [],
        registrationStep: ActiveStep.FirstStep,
        newUser: {
            id: null,
            role: null,
            username: '',
            avatarIndex: null,
            colorIndex: null,
            pin: '',
        }
    }

    generateID = () => {
        const uuidv1 = require('uuid/v1');
        const newUserID = uuidv1();
        return newUserID;
    }

    handleSelectBtnClick = result => {

        if (this.state.registrationStep === ActiveStep.FirstStep) {

            const newUserID = this.generateID()
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
        this.props.selectClick()
    }

    handleConfirmBtnClick = () => {
        addUser(this.state.newUser)
        this.props.goToWelcomeView();
        this.props.confirmClick();
    }
    handleBackBtnClick = () => {
        if (this.state.registrationStep === ActiveStep.FirstStep) {
            this.props.goToWelcomeView()
        }
        else {
            this.setState(prevState => ({
                registrationStep: prevState.registrationStep - 1
            })
            )
            this.props.backClick();
        }
    }

    render() {
        const ActiveStepComponent: React.ReactType = StepComponent[this.state.registrationStep];
        return (
            <div className={`registration__container registration__container--step-${this.state.registrationStep}`}>
                <div className="registration__text-container">
                    <p className="registration__title">Add a family member</p>
                    <p className="registration__subtitle">Start by adding members of your family for a more personalised experience.</p>
                </div>
                {
                    this.state.registrationStep < ActiveStep.SixthStep ?
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
                        />
                }
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(RegistrationView);