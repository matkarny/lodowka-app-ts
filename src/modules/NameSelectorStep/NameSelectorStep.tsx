import * as React from 'react';
import './NameSelectorStep.scss';

export interface NameSelectorStepProps {
    // onSelect: any,
    // onBack: any,
}

export interface NameSelectorStepState {
    inputValue: string
}

class NameSelectorStep extends React.Component<NameSelectorStepProps, NameSelectorStepState> {
    state = {
        inputValue: '',
    }

    inputChangeHandler = e => {
        this.setState({ inputValue: e.target.value })


    }
    render() {
        return (
            <div className="login-username__container">

                <p className="login-username__title">What is your name?</p>
                <p className="login-username__subtitle">How should the fridge address you?</p>
                <input
                    type="text"
                    className="login-username__input"
                    value={this.state.inputValue}
                    onChange={this.inputChangeHandler} />
            </div>
        );
    }
}

export default NameSelectorStep;