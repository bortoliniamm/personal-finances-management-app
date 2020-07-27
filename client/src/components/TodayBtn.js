import React from 'react'

export default function TodayBtn({click}) {
    const handleClick = () => {
        click();
    }
    return (
        <div>
            <a className="waves-effect waves-light btn" onClick={handleClick}>Hoje</a>
        </div>
    )
}
