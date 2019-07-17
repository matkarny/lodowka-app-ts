import * as React from 'react';
import './PinSelectorStep.scss'
export interface PinSelectorStepProps {
    onSelect: any,
    onBack: any,
}

export interface PinSelectorStepState {
    inputValue: string,
    isValid: boolean,
}

class PinSelectorStep extends React.Component<PinSelectorStepProps, PinSelectorStepState> {
    state = {
        inputValue: '',
        isValid: false
    }

    inputChangeHandler = e => {
        let targetValue = e.target.value
        const lastChar = targetValue.charAt(targetValue.length - 1)
        const parsedLastChar = parseInt(lastChar)

        if (!isNaN(parsedLastChar) || !targetValue.length) {
            this.setState({
                inputValue: e.target.value
            })
        }
        else {
            targetValue = this.state.inputValue
        }

        if (targetValue.length === 4) {
            this.setState({
                isValid: true
            })
        }
        else {
            this.setState({
                isValid: false
            })
        }
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
                    onChange={this.inputChangeHandler}
                    pattern="[0-9]{4}"
                    maxLength={4}
                    minLength={4}
                />

                <div className="login-pin__btn-container">
                    <button className="login-pin__button login-pin__button--cancel" onClick={this.props.onBack}>
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