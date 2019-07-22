import * as React from 'react';
import './ListLabel.scss';

export interface ListLabelProps {
    labelTxt: string,
    labelCount?: number

}

export interface ListLabelState {
    itemsCount: number
}

class ListLabel extends React.Component<ListLabelProps, ListLabelState> {
    state = { itemsCount: this.props.labelCount }
    render() {
        return (<div className="list-label">
            <span className='list-label__title'>
                {this.state.itemsCount} {this.props.labelTxt}
            </span>
            <div className="list-label__btn-container">
            {this.props.children}
            </div>
        </div>);
    }
}

export default ListLabel;