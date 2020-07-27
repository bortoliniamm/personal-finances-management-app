import React from 'react'

export default function ThisMonthBtn({click}) {
    const handleClick = () => {
        click();
    }
    return (
        <div>
            <a class="waves-effect waves-light btn" onClick={handleClick}>Esse mês</a>
        </div>
    )
}

