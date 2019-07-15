import * as React from 'react';
import "./AnimalComponent.scss"
import animalList from '../../constants/AnimalConstants';

export interface AnimalComponentProps {
    animal: string
}

const AnimalComponent: React.SFC<AnimalComponentProps> = props => {
    const animalParams = animalList.filter(animal => {
        if (animal.name == props.animal) { return animal.src }

    })
    const animalSRC = animalParams[0].src;
    console.log(animalSRC)
    return (
        <div className="login-animal__item-container">
            <img className='login-animal__item login-animal__item--active' src={animalSRC} alt="" />
        </div>);
}

export default AnimalComponent;