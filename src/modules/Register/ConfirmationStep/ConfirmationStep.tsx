import * as React from 'react';
import './ConfirmationStep.scss'
import UserComponent from '../../../common/components/UserComponent/UserComponent';
export interface ConfirmationStepProps {
    colorId: number,
    avatarId: number,
    username: string,
    id: number,
    onBack: any,
    onSelect: any,
}

const ConfirmationStep: React.SFC<ConfirmationStepProps> = props => {

    return (
        <div className="login-confirmation__container">

            <p className='login-confirmation__title'>Does that sound alright?</p>
            <p className='login-confirmation__subtitle'>Check if everything is in order and confirm to create an account or go back to make changes.</p>

            <UserComponent
                colorId={props.colorId}
                avatarId={props.avatarId}
                username={props.username}
                id={props.id}
                onSelect={null}
                bigger={true}
            />

            <div className="login-confirmation__btn-container">
                <button
                    className="login-confirmation__button login-confirmation__button--cancel"
                    onClick={props.onBack}>Back</button>
                <button
                    className='login-confirmation__button login-confirmation__button--select'
                    onClick={props.onSelect}
                >
                    Confirm and add family member
            </button>

            </div>
        </div>
    );
}

export default ConfirmationStep;