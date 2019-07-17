import * as React from 'react';
import "./FullView.scss"
import * as Routes from "../../constants/Routes"

export interface FullViewProps {
    
}

export default class FullView extends React.Component<FullViewProps> {



    public render() {
        return (
            <div className="full-list">
                <header className="full-list__header">
                    <a href={Routes.DASHBOARD} className="full-list__link"><div className="full-list__header full-list__arrow">🡠</div> </a>
                    <div className="full-list__middle-container">
                        <div className="full-list__middle-container-text">Your Products </div>
                        <div className="full-list__buttons-list-container">
                            <button className="full-list__buttons-list-container full-list__buttons-list-container-nonactive">buttons</button>
                            <button className="full-list__buttons-list-container full-list__buttons-list-container-active">List</button>
                        </div>
                    </div>
                    <div></div>
                </header>
                <div className="full-list__input">
                </div>
            </div>
        );
    }
}
