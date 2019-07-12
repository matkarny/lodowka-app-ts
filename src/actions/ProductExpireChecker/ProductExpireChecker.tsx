import React, { Component } from 'react'

type DateState = {
    date: Date
}

export default class ProductExpireChecker extends Component<{}, DateState> {

todayDate = new Date();
public currentDate = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate())
public productDate = new Date(2019,6,7);

daysBetween(currentDate, productDate):number  {
        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24;

        var date1 = currentDate.getTime();
        var date2 = productDate.getTime();

        return (date2 - date1)/ONE_DAY 
    }

expirationChecker () => {
    let daysBetween = this.daysBetween(this.currentDate, this.productDate)

    switch(daysBetween){

        default:
            console.log('Unknown mounth')

    }

}

    
render() {
    return <button onClick={() => console.log(this.daysBetween(this.currentDate, this.productDate))} > Click </button>
   } }