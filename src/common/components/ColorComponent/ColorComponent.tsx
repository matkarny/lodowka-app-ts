import * as React from 'react';
import "./ColorComponent.scss"

export interface ColorComponentProps {
    colorName: string
    isActive: boolean
    id: number
    click: any
}

const ColorComponent: React.SFC<ColorComponentProps> = props => {

    return (
        <div
            className={`login-color__item ${props.isActive ? 'login-color__item--active' : ''} login-color__item--${props.colorName}`}
            data-id={props.id}
            onClick={props.click}>
        </div >);
}

export default ColorComponent;