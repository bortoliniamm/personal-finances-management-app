import React from 'react'

export default function OpenFormBtn({click}) {
    
    const handleClick = () => {
        click()
    }
    
    return (
        <div>
            <a class="waves-effect waves-light btn" onClick={handleClick}><i class="material-icons left">add</i>NOVA TRANSAÇÂO</a>
        </div>
    )
}
