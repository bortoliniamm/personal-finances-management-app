import React from 'react'

export default function DayInput({day, filterByDay}) {

    const min=1;
    const max=31;

    let filterByDayFlag = false;

    const handleChange = (event) => {
        if(event.target.value>=min && event.target.value<=max){
            filterByDayFlag=true;
            day(event.target.value);
            filterByDay(filterByDayFlag);
        }
        else if(event.target.value===''){
            filterByDayFlag=false;
            day('');
            filterByDay(filterByDayFlag);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s6" style={{width: '200px'}}>
                    <input placeholder="Dia para consulta" id="day-input" type="number" min={min} max={max} onChange={handleChange}/>
                    <label className="active" htmlFor="day-input2">Dia</label>
                </div>
            </div>
        </div>
    )
}
