import React from 'react'

export default function Summary({transactions}) {
    
    let outcome=0;
    let income=0;
    let net=0;
    let count=0;

    // console.log(transactions);

    if(transactions.length!==0){

        transactions.forEach((day) => {
            day.transactions.forEach((transaction) => {
                count++;
                if(transaction.type2=='+'){
                    income+=transaction.value;
                }else{
                    outcome+=transaction.value;
                }
            })
        })
    
        net=income-outcome;
    
    }
    let netColor='black';
    netColor = net > 0 ? 'green' 
             : net===0 ? 'black' 
             : netColor='red';
    
    // contar, somar +, somar -,
    return (
        <div style={styles.summary}>
            <div>
                Lançamentos: <strong>{`${count}`}</strong>
            </div>

            <div>
                Receitas: <strong style={styles.incomes}>{`R$ ${income}`}</strong>
            </div>

            <div>
                Despesas: <strong style={styles.expenses}>{`R$ ${outcome}`}</strong>
            </div>

            <div>
                Saldo: <strong style={{color: netColor}}>{`R$ ${net}`}</strong>
            </div>
        </div>
    )
}

const styles = {
    summary: {
        // backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'row',
        width: '750px',
        height: '50px',
        border: '1px solid lightblue',
        borderRadius: '20px',
        marginTop: '10px',
        padding: '20px',
        marginBottom: '10px',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    incomes: {
        color: 'green',
    },
    expenses: {
        color: 'red',
    },



}
