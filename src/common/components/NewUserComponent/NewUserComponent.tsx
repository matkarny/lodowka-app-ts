import * as React from 'react';
import './NewUserComponent.scss';
import { ReactComponent as AddMember } from '../../images/add-member.svg';
export interface NewUserComponentProps {

}

const NewUserComponent: React.SFC<NewUserComponentProps> = props => {
    return (
        <div className="new-user-component__items-wrapper">
            <AddMember />
            <p className="new-user-component__description">Add new<br />member</p>
        </div >

    );
}

export default NewUserComponent;