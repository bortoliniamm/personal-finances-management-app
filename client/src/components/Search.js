import React from 'react'

export default function Search({filter}) {
    const handleChange = (event) => {
            filter(event.target.value);
    }

    return (
        <div>
            <div className="row">
                <div className="input-field col s6" style={{width: '750px'}}>
                    <input placeholder="Buscar" id="search-input" type="text" onChange={handleChange}/>
                    <label className="active" htmlfor="search-input2">Filtro</label>
                </div>
            </div>
        </div>
    )
}
