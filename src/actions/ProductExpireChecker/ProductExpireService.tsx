import React  from 'react'
import './ProductExpireChecker.scss'

export function countDaysLeft(productDate, todayDate): any {

    console.log(productDate)
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

    const currentDateInMilliseconds: number = todayDate.getTime();
    const productDateInMilliseconds: number = productDate.getTime();
console.log(currentDateInMilliseconds);
console.log(productDateInMilliseconds);
    return console.log((productDateInMilliseconds - currentDateInMilliseconds)/oneDayInMilliseconds)
}


export function expirationChecker(productExpireDate, todayDate): any {
let days: any = countDaysLeft(productExpireDate, todayDate);

    switch (true) {
        case days < 0:
            return <div className="expiration-style expiration-style__expiered" >{`Expired`}</div>
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
                return <div className="expiration-style">{`${String(productExpireDate.getDay()).padStart(2, "0")}/${String(productExpireDate.getMonth()).padStart(2, "0")}/${productExpireDate.getFullYear}`}</div>

    }
}

export default {countDaysLeft, expirationChecker }