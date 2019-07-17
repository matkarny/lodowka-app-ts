import * as React from 'react';
import "./AnimalComponent.scss"

export interface AnimalComponentProps {
    animal: string
    isActive: boolean
    id: number
    src: string
    click: any
}

const AnimalComponent: React.SFC<AnimalComponentProps> = props => {

    return (
        <div className={`login-animal__item-container ${props.isActive ? 'login-animal__item-container--active' : ''}`} onClick={props.click} data-id={props.id}>
            <img className='login-animal__item ' src={props.src} alt={props.animal} />
        </div >);
}

export default AnimalComponent;