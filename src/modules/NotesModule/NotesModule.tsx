import * as React from 'react';
import Popup from "reactjs-popup";


import ListBtn from "../../common/components/ListBtn/ListBtn"
import ListLabel from "../../common/components/ListLabel/ListLabel"

export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div>
          <div className="product-list-widget">
                <ListLabel labelCount={9} labelTxt={"Products"}>
                    <a href="#"><ListBtn>VIEW ALL</ListBtn></a>
                    <Popup trigger={<ListBtn>+</ListBtn>} position="top center">
{close => (
  <div>
    Content here
    <a className="close" onClick={close}>
      &times;
    </a>
  </div>
)}
</Popup>
                </ListLabel>
            
            </div>
      </div>
    );
  }
}

