import * as React from 'react';
import './ListBtn.scss'

const ListBtn: React.SFC = props => {
    return (
        <>
            <button className='list-btn'>
                {props.children}
            </button>
        </>
    );
}

export default ListBtn;