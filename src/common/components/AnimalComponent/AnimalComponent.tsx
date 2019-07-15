import * as React from 'react';
import "./AnimalComponent.scss"
import animalList from '../../constants/AnimalConstants';

export interface AnimalComponentProps {
    animal: string
    isActive: boolean
}

const AnimalComponent: React.SFC<AnimalComponentProps> = props => {
    const animalParams = animalList.filter(animal => {
        if (animal.name == props.animal) { return animal.src }

    })
    const animalSRC = animalParams[0].src;
    console.log(animalSRC)
    return (
        <div className="login-animal__item-container">
            <img className={`${'login-animal__item' props.isActive ? 'login-animal__item--active': ''}`} src={animalSRC} alt="" />
        </div>);
}

export default AnimalComponent;