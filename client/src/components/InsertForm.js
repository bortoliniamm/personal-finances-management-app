import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import getDate from '../helpers/getDate'

Modal.setAppElement('#modal');

export default function InsertForm({ today, onSave, onClose}) {

    const [disableBtnFlag, setDisableBtnFlag] = useState(true);

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('-');
    
    const [value, setValue] = useState(0);

    const [day, setDay] = useState(today.day);
    const [month, setMonth] = useState(today.month);
    const [year, setYear] = useState(today.year);

    const [errorMsg, setErrorMsg] = useState('');

    const handleDayInput = (event) => {

        const min=1;
        const max=31;

        if(event.target.value !== ''){
            if(event.target.value>=min && event.target.value<=max){
                setDay(event.target.value);
            }
        }else{
            setDay(today.day)
        }
    }
    const handleMonthInput = (event) => {
        
        const min=1;
        const max=12;

        if(event.target.value !== ''){
            if(event.target.value>=min && event.target.value<=max){
                setMonth(event.target.value);    
            }
        }else{
            setMonth(today.month)
        }
    }
    const handleYearInput = (event) => {

        const min=2019;
        const max=2030;

        if(event.target.value !== ''){
            if(event.target.value>=min && event.target.value<=max){
                setYear(event.target.value);
            }
        }else{
            setYear(today.year)
        }
    }
    const handleDescriptionInput = (event) => {
        setDescription(event.target.value);
    }
    const handleCategoryInput = (event) => {
        setCategory(event.target.value);
    }
    const handleValueInput = (event) => {
        if(parseFloat(event.target.value)>0 && event.target.value!==''){
            setValue(parseFloat(event.target.value));
        }else if(event.target.value===''){
            setValue(parseFloat(0));
        }
    }
    const handleTypeInput = (event) => {
        if(event.target.value==='+' || event.target.value==='-') {
            setType(event.target.value);
        }else if(event.target.value === ''){
            setType('-');
        }
    }

    useEffect(() => {
        if(description!=='' && category!=='' && value>0){
            setDisableBtnFlag(false);
        }else{
            setDisableBtnFlag(true)
        }
    }, [description, category, value])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        const typeStr = type === '-' ? 'expense' : 'income';
        const date = getDate.getDayInfo(day, month, year);
        
        let transaction={};
        if(description!=='' && category!=='' && value !==0){
            transaction = {
                "description": description,
                "category": category,
                "type": typeStr,
                "value": value,
                "day": parseInt(day),
                "month": parseInt(month),
                "year": parseInt(year),
                "yearMonth": date.ym,
                "yearMonthDay": date.ymd,
                "type1": typeStr,
                "type2": type,
            };
            
            onSave(transaction);
        }        
    };
        
    const handleKeyDown = (event) =>{
        if (event.key === 'Escape') {
            onClose();
        }
    };
    const handleClose = ()=>{
        onClose(false);
    };

    return (
        <div>
            <Modal isOpen={true}>

                <div style={styles.flexRow}>
                    <span style={styles.title}>Adicionar despesa</span>
                    <button className='waves-effect waves-lights btn red dark-4' onClick={handleClose}>x</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className='input-field'>
                        <input id='inputDescription' type='text' onChange={handleDescriptionInput}/>
                        <label className='active' htmlFor='inputDescription'>
                            Descrição: 
                        </label>
                    </div>
                    <div className='input-field'>
                        <input id='inputCategory' type='text' onChange={handleCategoryInput}/>
                        <label className='active' htmlFor='inputCategory'>
                            Categoria: 
                        </label>
                    </div>
                    <div className='input-field'>
                        <input id='inputType' type='text' onChange={handleTypeInput}/>
                        <label className='active' htmlFor='inputType'>
                            Tipo: 
                        </label>
                    </div>
                    <div className='input-field'>
                        <input id='inputValue' type='number' onChange={handleValueInput}/>
                        <label className='active' htmlFor='inputValue'>
                            R$ 
                        </label>
                    </div>
                    <div style={styles.flexRow}>
                        <div className='input-field'>
                            <input id='inputDay' type='number' min={1} max={31} onChange={handleDayInput}/>
                            <label className='active' htmlFor='inputDay'>
                                Dia: 
                            </label>
                        </div>
                        <div className='input-field'>
                            <input id='inputMonth' type='number' min={1} max={12} onChange={handleMonthInput}/>
                            <label className='active' htmlFor='inputMonth'>
                                Mês: 
                            </label>
                        </div>
                        <div className='input-field'>
                            <input id='inputYear' type='number' min={2019} max={2030} onChange={handleYearInput}/>
                            <label className='active' htmlFor='inputYear'>
                                Ano: 
                            </label>
                        </div>
                    </div>

                    <div style={styles.flexRow}>
                        <button disabled={disableBtnFlag} className='waves-effect waves-light btn'>
                            Salvar
                        </button>
                        <span style={styles.errorMsg}>{errorMsg}</span>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
    errorMsg: {
        color: 'red',
        fontWeight: 'bold',
    },
    
};
