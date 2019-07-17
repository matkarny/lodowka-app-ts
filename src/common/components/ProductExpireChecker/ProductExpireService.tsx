import React from 'react'
import './ProductExpireChecker.scss'

export function countDaysLeft(countingFromDate, countingToDate): number {

    var oneDayInMilliseconds = 1000 * 60 * 60 * 24;

    var date2 = countingToDate.getTime();
    var date1 = countingFromDate.getTime();


    return (date2 - date1) / oneDayInMilliseconds
}


export function expirationChecker(productExpireDay, productExpireMonth, productExpireYear): any {

    let currentDate = new Date();
    let todayDay = currentDate.getDate();
    let todayMonth = currentDate.getMonth();
    let todayYear = currentDate.getFullYear();

    let todayDate = new Date(todayYear, todayMonth, todayDay);
    let productExpireDate = new Date(productExpireYear, productExpireMonth, productExpireDay)

    let days: number = countDaysLeft(todayDate, productExpireDate);

    switch (true) {
        case days < 0:
            return <div className="expiration-style expiration-style__expiered" >{`Expired`}</div>
            break;
        case days === 0:
            return <div className="expiration-style expiration-style__short-term" >{`Today`}</div>
            break;
        case days === 1:
            return <div className="expiration-style expiration-style__short-term">{`${days} DAY`}</div>
            break;
        case days < 4:
            return <div className="expiration-style expiration-style__short-term">{`${days} DAYS`}</div>
            break;
        case days < 10:
            return <div className="expiration-style" >{`${days} DAYS`}</div>
            break;
        default:
            return <div className="expiration-style">{`${String(productExpireDay).padStart(2, "0")}/${String(productExpireMonth).padStart(2, "0")}/${productExpireYear}`}</div>

    }
}

export default { countDaysLeft, expirationChecker }