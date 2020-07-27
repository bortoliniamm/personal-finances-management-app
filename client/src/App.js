import React, { useState, useEffect } from 'react';

// import background from '../public/22646801.jpg';

import Grid from './components/Grid';
import InsertForm from './components/InsertForm';
import EditForm from './components/EditForm';
import DayInput from './components/DayInput';
import MonthInput from './components/MonthInput';
import YearInput from './components/YearInput';
import TodayBtn from './components/TodayBtn';
import ThisMonthBtn from './components/ThisMonthBtn';
import OpenFormBtn from './components/OpenFormBtn';
import SortCheckbox from './components/SortCheckbox';
import Summary from './components/Summary';
import Search from './components/Search';

import controller from './helpers/controllers.js';
import getDate from './helpers/getDate';
import stringHelper from './helpers/stringHelper'

export default function App() {

  const today = getDate.getToday();

  const [transactions, setTransactions] = useState([]);
  const [rawTransactions, setRawTransactions] = useState([]);

  const [useDayFilter, setUseDayFilter] = useState(false);
  const [sortFlag, setSortFlag] = useState(false);
  const [filter, setFilter] = useState('');
  const [showFormFlag, setShowFormFlag] = useState(false);
  const [showEditFormFlag, setShowEditFormFlag] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState({});

  const [monthPeriod, setMonthPeriod] = useState(today.ym);
  const [dayPeriod, setDayPeriod] = useState(today.ymd);

  const [day, setDay] = useState(today.day);
  const [month, setMonth] = useState(today.month);
  const [year, setYear] = useState(today.year);
  
  async function getData(){
    
    let transactionsAuxArr = [];
    let transactionsPerDay = [];
    
    // transactionsAuxArr = await controller.getExpenses();
    if (useDayFilter) {
      transactionsAuxArr = await controller.getByDay(dayPeriod);
      if(transactionsAuxArr.data.length !==0){
        setRawTransactions(transactionsAuxArr.data);
        transactionsPerDay = getDate.separateByDay(transactionsAuxArr.data);
      }
    }else{
      transactionsAuxArr = await controller.getByPeriod(monthPeriod);
      if(transactionsAuxArr.data.length !==0){
        setRawTransactions(transactionsAuxArr.data);
        transactionsPerDay = getDate.separateByDay(transactionsAuxArr.data);
      }
    }
    
    setTransactions(transactionsPerDay);
  }

  const handleFlagChange = (flag) => {
    setUseDayFilter(flag);
  }
  const handleDayChange = (day) => {
    if(day!==''){
      setDay(day);

    }
  }
  const handleMonthChange = (month) => {
    setMonth(month);
  }
  const handleYearChange = (year) => {
    setYear(year);
  }
  const handleSortChange = () => {
    setSortFlag(!sortFlag);
  }
  const handleFilterInput = (str) => {
    setFilter(str);
  }
  const handleFormClose = () => {
    setShowFormFlag(false)
  }
  const handleEditFormClose = () => {
    setShowEditFormFlag(false)
  }
  const handleOpenForm = () => {
    setShowFormFlag(true)
  }
  const insertTransaction = async (newTransaction) => {
    await controller.create(newTransaction);
    // console.log(newTransaction)
    getData();
    setShowFormFlag(false);
  }
  const editTransaction = async (transactionToSave) => {
    await controller.update(transactionToEdit._id, transactionToSave);
    // console.log(transactionToEdit)
    getData();
    setShowEditFormFlag(false);
  }
  const handleOpenEditForm = (transaction) => {
    setTransactionToEdit(transaction)
    setShowEditFormFlag(true)
  }

  const deleteTransaction = async (transactionToDelete) => {
    await controller.remove(transactionToDelete._id)
    getData();
  }
  const handleTodayClick = () => {
    setUseDayFilter(true);
    setDay(today.day);
    setMonth(today.month);
    setYear(today.year);
    setMonthPeriod(today.ym);
    setDayPeriod(today.ymd);
  }

  const handleThisMonthClick = () => {
    setUseDayFilter(false);
    setDay(today.day);
    setMonth(today.month);
    setYear(today.year);
    setMonthPeriod(today.ym);
    setDayPeriod(today.ymd);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let newArr = stringHelper.applyFilter(filter, rawTransactions);
    setTransactions(newArr);
  }, [filter]);

  useEffect(() => {
    let newArr = stringHelper.applyFilter(filter, rawTransactions);
    setTransactions(newArr);
  }, [day, month, year, rawTransactions]);
  
  useEffect(() => {
    getData();
  }, [sortFlag])
  
  useEffect(() => {

    if(useDayFilter===false){
      const newMonthPeriod = getDate.getDayInfo(day, month, year).ym;
      setMonthPeriod(newMonthPeriod);
    }else{
      const newDayPeriod = getDate.getDayInfo(day, month, year).ymd;
      setDayPeriod(newDayPeriod);
    }
  }, [day, month, year, useDayFilter]);


  
  useEffect(() => {
    getData();
  }, [useDayFilter, dayPeriod, monthPeriod]);

  return(  
          <div className='container' style={styles.main}>
            <h1>Controle Financeiro</h1>

            {showEditFormFlag && <EditForm transaction={transactionToEdit} onSave={editTransaction} onClose={handleEditFormClose}/>}
            {showFormFlag && <InsertForm today={today} onSave={insertTransaction} onClose={handleFormClose}/>}
            <div style={styles.zindexConfig}>
              <Summary transactions={transactions.length!==0 ? transactions : []}/>
              <div style={styles.inputs}>
                <YearInput year={handleYearChange} />
                <MonthInput month={handleMonthChange} />
                <DayInput day={handleDayChange} filterByDay={handleFlagChange}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <div style={styles.button}><SortCheckbox click={handleSortChange} /></div>           
                <div style={styles.button}><OpenFormBtn click={handleOpenForm} /></div>           
                <div style={styles.buttonsContainer}>
                  <div style={styles.button}><TodayBtn click={handleTodayClick} /></div>
                  <div style={styles.button}><ThisMonthBtn click={handleThisMonthClick} /></div>           
                </div>
              </div>
                <div>
                  <Search filter={handleFilterInput}/>
                </div>
              <Grid toEdit={handleOpenEditForm} toDelete={deleteTransaction} rawTransactions={rawTransactions} sortFlag={sortFlag} filter={filter} transactions={transactions.length!==0 ? transactions : []}/>
            </div>
          </div>
  )
}

const styles = {
  main:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  zindexConfig: {
    position: 'relative',
    zIndex: '0',
  },
  button: {
    marginRight: '10px',
  }
}