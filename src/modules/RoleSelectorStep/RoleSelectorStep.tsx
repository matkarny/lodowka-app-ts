import * as React from 'react';
export interface RoleSelectorStepProps {
}

export interface RoleSelectorStepState {
    role: string
}

class RoleSelectorStep extends React.Component<RoleSelectorStepProps, RoleSelectorStepState> {
    state = {
        role: ''
    }
    render() {
        return (
            <div className="login-role__container">

                <p className='login-role__title'>What is your role?</p>
                <p className='login-role__subtitle'>Choose your role.</p>

                <div className="login-role__items-wrapper">

                    {roleList.map((role, index) => {
                        if (index == this.state.selectedRole || this.state.selectedRole === null) {
                            return <RoleComponent
                                role={role.name}
                                isActive={true}
                                key={index}
                                id={index}
                                src={role.src}
                                click={this.handleSelectRole}
                            />
                        }
                        else {
                            return <RoleComponent
                                role={role.name}
                                isActive={false}
                                key={index}
                                id={index}
                                src={role.src}
                                click={this.handleSelectRole}
                            />
                        }
                    })
                    }

                </div>
                {/* <div className="login-role__btn-container">
                    <button
                        className="login-role__button login-role__button--cancel"
                        onClick={this.props.onBack}>Back</button>
                    <button
                        className={`login-role__button ${this.state.selectedRole ? 'login-role__button--select' : 'login-role__button--disabled'}`}
                        disabled={this.state.selectedRole ? false : true}
                        onClick={() => this.props.onSelect(this.state.selectedRole)}>
                        Select
                    </button>

                </div> */}
            </div>
        )
    }
}

export default RoleSelectorStep;