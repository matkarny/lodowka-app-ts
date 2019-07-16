import * as React from 'react';
import "./ColorComponent.scss"

export interface ColorComponentProps {
    color: string
    isActive: boolean
    id: number
    click: any
}

const ColorComponent: React.SFC<ColorComponentProps> = props => {

    return (
        <div className={`login-color__item ${props.isActive ? 'login-color__item--active' : ''}`} onClick={props.click} data-id={props.id} style={{ backgroundColor: props.color }}>
        </div >);
}

export default ColorComponent;