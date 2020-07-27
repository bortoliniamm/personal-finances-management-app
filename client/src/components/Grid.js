import React from 'react'

import Transaction from './Transaction'
import stringHelper from '../helpers/stringHelper'

export default function Grid({toDelete, toEdit, transactions, rawTransactions, filter, sortFlag}) {

    let grid = Object.assign([], transactions);
    let rawGrid = Object.assign([], rawTransactions);

    if(filter!==''){
        let newArr = stringHelper.applyFilter(filter, rawGrid);
        grid=newArr;
    }
      
    if(!sortFlag){
        grid.sort((a,b) => b.value-a.value);
    }
    
    let i=0;

    let bckColor = ''

    const handleEdit = (transaction) => {
        toEdit(transaction);
    }
    const handleDelete = (transaction) => {
        toDelete(transaction);
    }

    return (
        <div>
            {grid.map((day) => {
                i++;
                if(day.transactions.length !==0) {
                    return (
                        <div key={`${day.value}${i}`}style={{marginTop: '25px',}}>
                            <h5>Dia {day.strValue}/{day.month}</h5>
                            {day.transactions.map((transaction) => {
                                transaction.type2 ==='+' ? bckColor = '#1dd1a1' : bckColor = '#ff6b6b';
                                return (
                                    <div key={transaction._id} style={{...styles.card, ...{backgroundColor: bckColor}}}>
                                        <Transaction editClick={handleEdit} deleteClick={handleDelete} transaction={transaction}/>
                                    </div>
                                )
                            })}
                    </div>
                    )
                }
            })}
        </div>
    )
}

const styles = {
    card: {
        // backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'row',
        width: '750px',
        height: '50px',
        borderRadius: '20px',
        marginTop: '10px',
        padding: '10px',
        alignItems: 'center',
    }
};


