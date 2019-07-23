import * as React from 'react';
import './AvatarSelectorStep.scss';
import animalList from '../../../common/constants/AnimalConstants';
import AnimalComponent from '../../../common/components/AnimalComponent/AnimalComponent';
export interface AvatarSelectorProps {
    onSelect: any,
    onBack: any
}

export interface AvatarSelectorState {
    selectedAvatar: number
}

class AvatarSelector extends React.Component<AvatarSelectorProps, AvatarSelectorState> {
    state = {
        selectedAvatar: null
    }

    handleSelectAvatar = e => {
        this.setState({ selectedAvatar: parseInt(e.currentTarget.dataset.id) })
    }

    render() {
        return (
            <div className="login-avatar__container">

                <p className='login-avatar__title'>What is your favorite avatar?</p>
                <p className='login-avatar__subtitle'>You will be able to log in by tapping your avatar.</p>

                <div className="login-avatar__items-wrapper">

                    {animalList.map((animal, index) => {
                        if (animal.id === this.state.selectedAvatar || this.state.selectedAvatar === null) {
                            return <AnimalComponent
                                animal={animal.name}
                                isActive={true}
                                key={index}
                                id={animal.id}
                                src={animal.src}
                                click={this.handleSelectAvatar}
                            />
                        }
                        else {
                            return <AnimalComponent
                                animal={animal.name}
                                isActive={false}
                                key={index}
                                id={animal.id}
                                src={animal.src}
                                click={this.handleSelectAvatar}
                            />
                        }
                    })
                    }

                </div>
                <div className="login-avatar__btn-container">
                    <button
                        className="login-avatar__button login-avatar__button--cancel"
                        onClick={this.props.onBack}>Back</button>
                    <button
                        className={`login-avatar__button ${this.state.selectedAvatar !== null ? 'login-avatar__button--select' : 'login-avatar__button--disabled'}`}
                        disabled={this.state.selectedAvatar !== null ? false : true}
                        onClick={() => this.props.onSelect(this.state.selectedAvatar)}>
                        Select
                        </button>

                </div>
            </div>
        )
    }
}

export default AvatarSelector;