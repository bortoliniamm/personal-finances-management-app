function getDayInfo(day, month, year) {
    
    let paddedMonth=month.padStart(2, "0");
    let paddedDay=day.padStart(2, "0");
    
    const date = {
        'day': paddedDay,
        'month': paddedMonth,
        'year': year,
        'ym': `${year}-${paddedMonth}`,
        'ymd': `${year}-${paddedMonth}-${paddedDay}`,
    }

    return date;
}

function getToday(){

    const today = new Date();

    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth()+1).toString().padStart(2, "0");
    const year = today.getFullYear().toString();

    const date = {
        'day': day,
        'month': month,
        'year': year,
        'ym': `${year}-${month}`,
        'ymd': `${year}-${month}-${day}`,
    }

    return date;

}

function getTodayMonthAndYear () {
    let today = new Date();
        
    let month = today.getMonth()+1;
    let strMonth = '';
    month < 10 ? strMonth = `0${month}` : strMonth=`${month}`;

    let year = today.getFullYear();

    const period = `${year}-${strMonth}`;
    return period;
}

function getTodayDayAndMonthAndYear () {
    let today = new Date();
    
    let day = today.getDate();
    let strDay = ''
    day < 10 ? strDay = `0${day}` : strDay=`${day}`

    let month = today.getMonth()+1;
    let strMonth = '';
    month < 10 ? strMonth = `0${month}` : strMonth=`${month}`;

    let year = today.getFullYear();

    const date = `${year}-${strMonth}-${strDay}`;

    return date;
}

function separateByDay(rawArr) {
    let days = [];

    for(let i=0; i<31; i++){
        days[i] = {
            "value": i+1,
            "month": '',
            "year": '',
            "strValue": i<10 ? `0${i+1}` : `${i+1}`,
            "transactions": [],
        };
    }

    if(rawArr.length!==0){
        days.forEach((day) => {
            rawArr.forEach((transaction) => {
                if(day.month === ''){
                    day.month=(`${transaction.month}`).padStart(2, "0");;  
                }
                if(day.year === ''){
                    day.year=transaction.year;
                }
                if (transaction.day===day.value) {
                    day.transactions.push(transaction);
                }
            });
        });
    }

    return days;
}

export default {getDayInfo, getToday, getTodayMonthAndYear, getTodayDayAndMonthAndYear, separateByDay}
