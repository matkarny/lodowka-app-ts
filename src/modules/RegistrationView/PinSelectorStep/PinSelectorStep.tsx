import * as React from 'react';
import './PinSelectorStep.scss'
export interface PinSelectorStepProps {
    onSelect: any,
    onBack: any,
}

export interface PinSelectorStepState {
    inputValue: string,
    inputValidatorValue: string,
    isValid: boolean,
    isInputFilled: boolean,
    isInputValidatorfilled: boolean,
}

class PinSelectorStep extends React.Component<PinSelectorStepProps, PinSelectorStepState> {
    state = {
        inputValue: '',
        inputValidatorValue: '',
        isInputFilled: false,
        isInputValidatorfilled: false,
        isValid: false
    }

    inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, inputType: string) => {
        let targetValue = e.target.value;
        const lastChar = targetValue.charAt(targetValue.length - 1);
        const parsedLastChar = parseInt(lastChar);

        if (!isNaN(parsedLastChar) || !targetValue.length) {
            switch (inputType) {
                case 'main':
                    this.setState({
                        inputValue: e.target.value
                    })
                    if (e.target.value.length === 4) {
                        this.setState({
                            isInputFilled: true,
                        })
                        if (this.state.isInputValidatorfilled) {
                            this.setState({
                                isValid: true,
                            })
                        }
                    }
                    else {
                        this.setState({
                            isInputFilled: false,
                            isValid: false,
                        })
                    }
                    break;

                default:
                    this.setState({
                        inputValidatorValue: e.target.value
                    })
                    if (e.target.value.length === 4) {
                        this.setState({
                            isInputValidatorfilled: true,
                        })
                        if (this.state.isInputFilled) {
                            this.setState({
                                isValid: true,
                            })
                        }

                    }
                    else {
                        this.setState({
                            isInputValidatorfilled: false,
                            isValid: false,
                        })
                    }
                    break;
            }
        }
        else {
            targetValue = this.state.inputValue
        }

        // if (this.state.isInputFilled && this.state.isInputValidatorfilled) {
        //     this.setState({
        //         isValid: true
        //     })
        // }
        // else {
        //     this.setState({
        //         isValid: false
        //     })
        // }
    }
    render() {
        return (

            <div className="login-pin__container">

                <p className="login-pin__title">What is your PIN?</p>
                <p className="login-pin__subtitle">Set your 4-digit PIN.</p>

                <input
                    type='password'
                    className="login-pin__input"
                    value={this.state.inputValue}
                    onChange={e => { this.inputChangeHandler(e, 'main') }}
                    pattern="[0-9]{4}"
                    maxLength={4}
                    minLength={4}
                />
                <input
                    type='password'
                    className="login-pin__input login-pin__input--validate"
                    value={this.state.inputValidatorValue}
                    onChange={e => { this.inputChangeHandler(e, 'validator') }}
                    pattern="[0-9]{4}"
                    maxLength={4}
                    minLength={4}
                />

                <div className="login-pin__btn-container">
                    <button className="login-pin__button login-pin__button--cancel"
                        onClick={this.props.onBack}>
                        Back
                    </button>
                    <button
                        className={`login-pin__button ${this.state.isValid ? 'login-pin__button--select' : 'login-pin__button--disabled'}`}
                        disabled={this.state.inputValue ? false : true}
                        onClick={() => this.props.onSelect(this.state.inputValue)}>
                        Select
                    </button>
                </div>
            </div>
        );
    }
}

export default PinSelectorStep;