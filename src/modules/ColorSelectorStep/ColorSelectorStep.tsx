import * as React from 'react';
import './ColorSelectorStep.scss';
import { COLORS } from '../../common/constants/ColorConstants';
import ColorComponent from '../../common/components/ColorComponent/ColorComponent';
export interface ColorSelectorProps {
    onSelect: any,
    onBack: any,
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
            <div className="login-color__container">

                <p className='login-color__title'>What is your favorite Color?</p>
                <p className='login-color__subtitle'>You will be able to log in by tapping your avatar.</p>

                <div className="login-color__items-wrapper">

                    {COLORS.map((color, index) => {
                        if (index == this.state.selectedColor || this.state.selectedColor === null) {
                            return <ColorComponent
                                colorName={color.name}
                                isActive={true}
                                key={index}
                                id={index}
                                click={this.handleSelectColor}
                            />
                        }
                        else {
                            return <ColorComponent
                                colorName={color.name}
                                isActive={false}
                                key={index}
                                id={index}
                                click={this.handleSelectColor}
                            />
                        }
                    })
                    }

                </div>
                <div className="login-color__btn-container">
                    <button className="login-color__button login-color__button--cancel" onClick={this.props.onBack}>Back</button>
                    <button
                        className={`login-color__button ${this.state.selectedColor ? 'login-color__button--select' : 'login-color__button--disabled'}`}
                        disabled={this.state.selectedColor ? false : true} onClick={() => this.props.onSelect(this.state.selectedColor)}>Select</button>
                </div>
            </div >
        )
    }
}

export default ColorSelector;