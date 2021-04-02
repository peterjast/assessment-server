'use strict';

const DataModel = require('./item-model.js');

const Data = {};

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    console.log(req.body)
    const item = new DataModel(data);
    Data.push(item);
    console.log(Data);
    res.status(200).send(Data);
  } catch(e) { next(e.message); }
}

Data.getAllItems = async(req, res) => {
  const items = await DataModel.find({}, function (err, items) {
    if(err) return console.log(err.message);
    console.log(items);
    res.status(200).send(Data);
  })
}

Data.getOneItem = async(req, res) => {
  const id = req.params.id;
  const items = await DataModel.find({_id:id});
  res.status(200).send(items[0]);
}

Data.deleteOneItem = async(req, res) => {
  // const id = parseInt(req.params.id);
  // const items = await DataModel.find({_id:id});
}

Data.updateOneItem = async(req, res) => {
  const id = req.params.id;
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).send(item);
}

module.exports = Data;
