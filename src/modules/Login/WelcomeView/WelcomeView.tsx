import * as React from 'react';
import avatarList from '../../../common/constants/AnimalConstants';
import { COLORS } from '../../../common/constants/ColorConstants';
export interface WelcomeViewProps {

}

export interface WelcomeViewState {

}

class WelcomeView extends React.Component<WelcomeViewProps, WelcomeViewState> {
    state = { dab: 1 }


    render() {
        return (
            <>
                <p className="login__welcome-view-title">Family members</p>
                <p className="login__welcome-view-subtitle">Tap an avatar to log in as a family member.</p>
            </>
        );
    }
}

export default WelcomeView;