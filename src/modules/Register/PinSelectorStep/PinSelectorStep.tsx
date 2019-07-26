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
    isErrorVisible: boolean,
}

class PinSelectorStep extends React.Component<PinSelectorStepProps, PinSelectorStepState> {
    state = {
        inputValue: '',
        inputValidatorValue: '',
        isValid: false,
        isErrorVisible: false,
    }

    inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, inputType: string) => {
        let targetValue = e.target.value;
        const lastChar = targetValue.charAt(targetValue.length - 1);
        const parsedLastChar = parseInt(lastChar);
        this.setState({
            isErrorVisible: false
        })

        if (!isNaN(parsedLastChar) || !targetValue.length) {
            switch (inputType) {
                case 'main':
                    this.setState({
                        inputValue: e.target.value
                    })
                    if (targetValue.length === 4 && targetValue === this.state.inputValidatorValue) {
                        this.setState({
                            isValid: true,
                            isErrorVisible: false,
                        })
                    }
                    else {
                        if ((targetValue.length === 4 && targetValue.length === this.state.inputValidatorValue.length)) {
                            this.setState({
                                isErrorVisible: true,
                            })
                        }
                        this.setState({
                            isValid: false,
                        })
                    }
                    break;

                default:
                    this.setState({
                        inputValidatorValue: e.target.value
                    })
                    if (targetValue.length === 4 && targetValue === this.state.inputValue) {
                        this.setState({
                            isValid: true,
                            isErrorVisible: false,
                        })
                    }
                    else {

                        if ((targetValue.length === 4 && targetValue.length === this.state.inputValue.length)) {
                            this.setState({
                                isErrorVisible: true,
                            })
                        }

                        this.setState({
                            isValid: false,
                        })
                    }
                    break;
            }
        }
        else {
            targetValue = this.state.inputValue
        }
    }
    render() {
        return (

            <div className="login-pin__container">
                <div className="login-pin__wrapper">

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
                    <p className="login-pin__subtitle">Confirm your PIN.</p>
                    <input
                        type='password'
                        className="login-pin__input login-pin__input--validate"
                        value={this.state.inputValidatorValue}
                        onChange={e => { this.inputChangeHandler(e, 'validator') }}
                        pattern="[0-9]{4}"
                        maxLength={4}
                        minLength={4}
                    />
                    <p className={`login-pin__error-label ${this.state.isErrorVisible ? 'login-pin__error-label--active' : ''}`}>PINS are different</p>

                </div>
                <div className="login-pin__btn-container">
                    <button className="login-pin__button login-pin__button--cancel"
                        onClick={this.props.onBack}>
                        Back
                    </button>
                    <button
                        className={`login-pin__button ${this.state.isValid ? 'login-pin__button--select' : 'login-pin__button--disabled'}`}
                        disabled={this.state.isValid ? false : true}
                        onClick={() => this.props.onSelect(this.state.inputValue)}>
                        Select
                    </button>
                </div>
            </div >
        );
    }
}

export default PinSelectorStep;