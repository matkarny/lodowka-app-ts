import * as React from 'react';
import './RoleSelectorStep.scss';
import { connect } from 'react-redux';
import StoreType from '../../../common/types/StoreType';
import roleList from '../../../common/constants/RoleConstants'
import RoleComponent from '../../../common/components/RoleComponent/RoleComponent';

export interface RoleSelectorStepProps extends Pick<StoreType, 'users'> {
    onSelect: any,
    onBack: any,
}

export interface RoleSelectorStepState {
    selectedRole: number,
    isChildBlocked: boolean,
}

const mapStateToProps = state => ({ users: state.users })

class RoleSelectorStep extends React.Component<RoleSelectorStepProps, RoleSelectorStepState> {
    state = {
        selectedRole: null,
        isChildBlocked: false,
    }
    handleSelectRole = e => {
        this.setState({ selectedRole: parseInt(e.currentTarget.dataset.id) })
    }
    checkRegisteredUsersCount = () => {
        // const data = store.getState();
        const usersListLength = this.props.users.length;
        if (!usersListLength) {
            this.setState({ isChildBlocked: true })
        }
    }
    componentDidMount() {
        this.checkRegisteredUsersCount();
    }
    render() {
        return (
            <div className="login-role__container">

                <p className='login-role__title'>What is your role?</p>
                <p className='login-role__subtitle'>Are you child or parent?</p>

                <div className="login-role__items-wrapper">

                    {roleList.map((role, index) => {

                        if (!this.state.isChildBlocked) {

                            if (role.id === this.state.selectedRole || this.state.selectedRole === null) {
                                return <RoleComponent
                                    role={role.name}
                                    isActive={true}
                                    key={index}
                                    id={role.id}
                                    src={role.src}
                                    click={this.handleSelectRole}
                                />
                            }
                            else {
                                return <RoleComponent
                                    role={role.name}
                                    isActive={false}
                                    key={index}
                                    id={role.id}
                                    src={role.src}
                                    click={this.handleSelectRole}
                                />
                            }
                        }
                        else if (role.name === 'child') {
                            return <RoleComponent
                                role={role.name}
                                isActive={false}
                                key={index}
                                id={role.id}
                                src={role.src}
                                click={null}
                            />
                        }
                        else {
                            return <RoleComponent
                                role={role.name}
                                isActive={true}
                                key={index}
                                id={role.id}
                                src={role.src}
                                click={this.handleSelectRole}
                            />
                        }
                    }
                    )
                    }

                </div>
                <div className="login-role__btn-container">
                    <button
                        className="login-role__button login-role__button--cancel"
                        onClick={this.props.onBack}>Back</button>
                    <button
                        className={`login-role__button ${this.state.selectedRole !== null ? 'login-role__button--select' : 'login-role__button--disabled'}`}
                        disabled={this.state.selectedRole !== null ? false : true}
                        onClick={() => this.props.onSelect(this.state.selectedRole)}>
                        Select
                    </button>

                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps)(RoleSelectorStep);
