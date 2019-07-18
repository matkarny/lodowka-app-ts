import * as React from 'react';
import "./FullView.scss"
import * as Routes from "../../constants/Routes"


export interface FullViewProps {
    startAtFirst: boolean,
    labelName: string,
    firstButtonName: string,
    secondButtonName: string,
    firstComponent: React.ReactNode,
    secondComponent: React.ReactNode,
}


export default class FullView extends React.Component<FullViewProps> {
    constructor(props) {
        super(props);
    }
    state = {
        isReverse: false,
        firstButtonClass: "full-list__buttons-list-container full-list__buttons-list-container-nonactive",
        secondButtonClass: "full-list__buttons-list-container full-list__buttons-list-container-active",
        injectedComponent: this.props.firstComponent,
    }

    handleChangeButton = (change) => {
        if (change) {

            this.setState(() => {return {
                isReverse: true,
                firstButtonClass: "full-list__buttons-list-container full-list__buttons-list-container-nonactive full-list__buttons-list-container-nonactive--reverse",
                secondButtonClass: "full-list__buttons-list-container full-list__buttons-list-container-active full-list__buttons-list-container-active--reverse",
                injectedComponent: this.props.firstComponent,
            }});
        } else {

            this.setState(() => {return {
                isReverse: false,
                firstButtonClass: "full-list__buttons-list-container full-list__buttons-list-container-nonactive",
                secondButtonClass: "full-list__buttons-list-container full-list__buttons-list-container-active",
                injectedComponent: this.props.secondComponent,
            }});
        };
    }

    componentDidMount() {
        this.handleChangeButton(this.props.startAtFirst)
    };


    public render() {
        return (
            <div className="full-list">
                <header className="full-list__header">
                    <a href={Routes.DASHBOARD} className="full-list__link"><div className="full-list__header full-list__arrow">🡠</div> </a>
                    <div className="full-list__middle-container">
                        <div className="full-list__middle-container-text">{this.props.labelName}</div>
                        <div className="full-list__buttons-list-container">
                            <button onClick={() => this.handleChangeButton(true)} className={this.state.firstButtonClass}>{this.props.firstButtonName}</button>
                            <button onClick={() => this.handleChangeButton(false)} className={this.state.secondButtonClass}>{this.props.secondButtonName}</button>
                        </div>
                    </div>
                    <div></div>
                </header>
                <div>
                    {this.state.injectedComponent}
                </div>
            </div>
        );
    }
}
