import React from 'react'

export default function Transaction({transaction, editClick, deleteClick}) {
    
    const handleEditClick = () => {
        // console.log('edit')
        editClick(transaction);
    }
    const handleRemoveClick = () => {
        // console.log('del')
        deleteClick(transaction);
    }
    
    return (
        <div style={styles.twoCols}>

            <div>
                <h6><strong>{transaction.description}</strong></h6>
            </div>

            <div style={styles.valueAndButtons}>
                <div>
                    <span style={styles.value}><strong>R$ {transaction.value}</strong></span>
                </div>
                <div style={styles.buttons}>
                    <i class="material-icons" style={{marginRight: '10px', cursor: 'pointer'}} onClick={handleEditClick}>edit</i>
                    <i class="material-icons" style={{cursor: 'pointer'}} onClick={handleRemoveClick}>delete</i>
                </div>

            </div>




        </div>

    )
}

const styles = {
    twoCols: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '750px',
        height: '50px',
        marginTop: '10px',
        padding: '10px',
        marginBottom: '10px',
        justifyContent: 'space-between'
    },
    valueAndButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        marginRight: '25px',
        fontSize: '35px'
    }
    
}

