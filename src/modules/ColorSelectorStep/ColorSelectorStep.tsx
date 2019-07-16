import * as React from 'react';
import './ColorSelectorStep.scss';
import animalList from '../../common/constants/AnimalConstants';
import AnimalComponent from '../../common/components/AnimalComponent/AnimalComponent';
export interface ColorSelectorProps {

}

export interface ColorSelectorState {
    selectedColor: number
}

class ColorSelector extends React.Component<ColorSelectorProps, ColorSelectorState> {
    state = {
        selectedColor: null
    }

    handleSelectColor = e => {
        this.setState({ selectedColor: e.currentTarget.dataset.id })
    }

    render() {
        return (
            <div className="login-Color__container">

                <p className='login-Color__title'>Add a family member</p>
                <p className='login-Color__subtitle'>What is your favorite Color?</p>

                <div className="login-Color__items-wrapper">

                    {animalList.map((animal, index) => {
                        if (animal.id == this.state.selectedColor || this.state.selectedColor === null) {
                            return <AnimalComponent
                                animal={animal.name}
                                isActive={true}
                                key={index}
                                id={animal.id}
                                src={animal.src}
                                click={this.handleSelectColor}
                            />
                        }
                        else {
                            return <AnimalComponent
                                animal={animal.name}
                                isActive={false}
                                key={index}
                                id={animal.id}
                                src={animal.src}
                                click={this.handleSelectColor}
                            />
                        }
                    })
                    }

                </div>
                <div className="login-Color__btn-container">
                    <button className="login-Color__button login-Color__button--cancel">Back</button>
                    <button className="login-Color__button login-Color__button--select">Select</button>
                </div>
            </div>
        )
    }
}

export default ColorSelector;