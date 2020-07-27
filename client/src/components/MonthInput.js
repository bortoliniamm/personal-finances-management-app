import React from 'react'

export default function MonthInput({month}) {
    
    const min=1;
    const max=12;

    const handleChange = (event) => {
        if(event.target.value>=min && event.target.value<=max){
            month(event.target.value);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s6" style={{width: '200px'}}>
                    <input placeholder="Mês para consulta" id="month-input" type="number" min={min} max={max} onChange={handleChange}/>
                    <label className="active" htmlFor="month-input2">Mês</label>
                </div>
            </div>
        </div>
    )
}
