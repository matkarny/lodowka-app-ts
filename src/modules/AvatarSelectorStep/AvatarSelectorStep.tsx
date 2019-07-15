import * as React from 'react';
import './AvatarSelectorStep.scss';
import animalList from '../../common/constants/AnimalConstants';
import AnimalComponent from '../../common/components/AnimalComponent/AnimalComponent';
export interface AvatarSelectorProps {

}

export interface AvatarSelectorState {
    selectedAvatar: number
}

class AvatarSelector extends React.Component<AvatarSelectorProps, AvatarSelectorState> {
    state = {
        selectedAvatar: null
    }

    handleSelectAvatar = e => {
        this.setState({ selectedAvatar: e.currentTarget.dataset.id })
    }

    render() {
        return (
            <div className="login-avatar__container">

                <p className='login-avatar__title'>Add a family member</p>
                <p className='login-avatar__subtitle'>What is your favorite avatar?</p>

                <div className="login-avatar__items-wrapper">

                    {animalList.map((animal, index) => {
                        if (animal.id == this.state.selectedAvatar || this.state.selectedAvatar === null) {
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
                    <button className="login-avatar__button login-avatar__button--cancel">Back</button>
                    <button className="login-avatar__button login-avatar__button--select">Select</button>
                </div>
            </div>
        )
    }
}

export default AvatarSelector;