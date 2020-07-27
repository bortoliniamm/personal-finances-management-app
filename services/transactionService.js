const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel.js');

module.exports.findExpenses = async (_, res) => {
  try {
    const data = await TransactionModel.find({type: 'expense'});
    res.send(data);
  } catch (error) {
    res.status(500).send('Error getting transactions');
  }
  res.end();
};

module.exports.updateExpenses = async (_, res) => {
  try {
    await TransactionModel.updateMany({type: '-'}, {type: 'expense', type1: 'expense', type2: '-'});
    await TransactionModel.updateMany({type: '+'}, {type: 'income', type1: 'income', type2: '+'});
  } catch (error) {
    res.status(500).send('Error getting transactions');
  }
  res.end();
};

module.exports.findAll = async (_, res) => {
    try {
      const data = await TransactionModel.find({});
      res.send(data);
    } catch (error) {
      res.status(500).send('Error getting transactions');
    }
    res.end();
};

module.exports.findByYearMonth = async (req, res) => {

    const period = req.params.period;

    try {
      const data = await TransactionModel.find({yearMonth: period});
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error getting transactions - ${error}`);
    }
    res.end();
};

module.exports.findByYearMonthDay = async (req, res) => {
    
    const day = req.params.day;
    
    try {
      const data = await TransactionModel.find({yearMonthDay: day});
      res.send(data);
    } catch (error) {
      res.status(500).send(`Error getting transactions - ${error}`);
    }
    res.end();
};

module.exports.register = async (req, res) => {

    // console.log(req.body);

    const newTransaction = new TransactionModel({
        description: req.body.description,
        value: req.body.value,
        category: req.body.category,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        yearMonth: req.body.yearMonth,
        yearMonthDay: req.body.yearMonthDay,
        type: req.body.type,
        type1: req.body.type1,
        type2: req.body.type2,
      });
    
      // console.log(`aqui ${newTransaction}`);
    try {
        const data = await newTransaction.save(newTransaction);
        // console.log(data);
        res.send(data);
    } catch (error) {
        res.status(500).send(`Error registering transaction - ${error}`);
    }
    res.end();
}

module.exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
          message: 'Entry data is empty!',
        });
      }

      console.log(req.body);

      const id = req.params.id;
      const {description, value, category, year, month, day, yearMonth, yearMonthDay, type} = req.body;
    
      try {
        await TransactionModel.findOneAndUpdate({ _id: id }, {
            description: description, 
            value: value, 
            category:category, 
            year: year, 
            month: month, 
            day: day, 
            yearMonth: yearMonth, 
            yearMonthDay: yearMonthDay, 
            type: type 
        });
        res.send(`Transaction under id ${id} successfully updated`);
      } catch (error) {
        res.status(404).send(`Error updating transaction - ${error}`);
      }
}

module.exports.remove = async (req, res) => {

    const id = req.params.id;

    try {
        await TransactionModel.findOneAndRemove({ _id: id });
        res.send(`Transaction under id ${id} successfully removed!`);
      
    } catch (error) {
      res.status(500).send(`Error removing transaction - ${error}`);
    }
      res.end();
}


module.exports.removeAll = async (req, res) => {

    try {
        await TransactionModel.deleteMany({ }, function (err) {});
        res.send(`All transactions were removed!`);
      
    } catch (error) {
      res.status(500).send(`Error removing transactions - ${error}`);
    }
      res.end();

  };

