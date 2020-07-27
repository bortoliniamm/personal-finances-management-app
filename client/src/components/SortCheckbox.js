import React from 'react'

export default function SortCheckbox({click}) {
    const handleClick = () => {
        click();
    }
    return (
        <div>
            <form action="#">
                <label>
                    <input type="checkbox" onClick={handleClick}/>
                    <span>Mais antigas primeiro</span>
                </label>
            </form>
        </div>
    )
}
