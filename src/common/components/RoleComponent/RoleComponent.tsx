import * as React from 'react';
import "./RoleComponent.scss";

export interface RoleComponentProps {
    role: string
    isActive: boolean
    id: number
    src: string
    click: any
}

const RoleComponent: React.SFC<RoleComponentProps> = props => {
    return (
        <div className={`login-role__item-container ${props.isActive ? 'login-role__item-container--active' : ''}`} onClick={props.click} data-id={props.id}>
            <img className='login-role__item ' src={props.src} alt={props.role} />
        </div >);
}

export default RoleComponent;