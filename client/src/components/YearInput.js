import React from 'react'

export default function YearInput({year}) {
    const min=2019;
    const max=2030;

    const handleChange = (event) => {
        if(event.target.value>=min && event.target.value<=max){
            year(event.target.value);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s6" style={{width: '200px'}}>
                    <input placeholder="Ano para consulta" id="year-input" type="number" min={min} max={max} onChange={handleChange}/>
                    <label className="active" htmlFor="year-input2">Ano</label>
                </div>
            </div>
        </div>
    )
}
