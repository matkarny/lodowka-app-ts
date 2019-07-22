import * as React from 'react';
import './LoginPanel.scss';
export interface LoginPanelProps {
    clickedUserId: number,
    getUsersData: any,
}

export interface LoginPanelState {
    inputValue: string,
    isErrorVisible: boolean,
    clickedUserData: object,
}

class LoginPanel extends React.Component<LoginPanelProps, LoginPanelState> {
    state = {
        inputValue: '',
        isErrorVisible: false,
        clickedUserData: null,
    }
    inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let targetValue = e.target.value;
        const lastChar = targetValue.charAt(targetValue.length - 1);
        const parsedLastChar = parseInt(lastChar);

        if (!isNaN(parsedLastChar) || (!targetValue))
            this.setState({
                inputValue: targetValue,
                isErrorVisible: false,
            })
        else {
            targetValue = this.state.inputValue
        }
        if (targetValue.length === 4) {
            if (targetValue === this.state.clickedUserData.pin) {
                this.setState({
                    isErrorVisible: false,
                })
                console.log('ACCESS GRANTED');
            }
            else {
                this.setState({
                    isErrorVisible: true,
                })
            }
        }

    }
    componentDidMount() {
        const usersData = this.props.getUsersData();
        const clickedUserList = usersData.usersList.filter(user => user.id === +this.props.clickedUserId)
        const clickedUser = clickedUserList[0]
        this.setState({ clickedUserData: clickedUser })
        console.log(clickedUser);
    }
    render() {
        return (

            <div className="login-pin__container">
                <p className="login-pin__title">PIN</p>

                <input
                    type='password'
                    className="login-pin__input"
                    value={this.state.inputValue}
                    onChange={e => { this.inputChangeHandler(e) }}
                    pattern="[0-9]{4}"
                    maxLength={4}
                    minLength={4}
                />
                <p className={`login-pin__error-label ${this.state.isErrorVisible ? 'login-pin__error-label--active' : ''}`}>PIN is invalid</p>
            </div>
        );
    }
}

export default LoginPanel;