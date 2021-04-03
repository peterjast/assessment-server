'use strict';

const DataModel = require('./item-model.js');

const Data = {};

const hat = new DataModel({
  name: 'snapback',
  description: 'this goes on head'
});
hat.save();

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    console.log(req.body)
    const item = new DataModel(data);
    item.save();
    res.status(200).send(item);
  } catch(e) { next(e.message); }
}

Data.getAllItems = async(req, res) => {
  const itemsArr = await DataModel.find({}, function (err, items) {
    if(err) return console.log(err.message);
  })
  res.status(200).send(itemsArr);    
  console.log(itemsArr);

}

Data.getOneItem = async(req, res) => {
  const id = req.params.id;
  const items = await DataModel.find({_id:id});
  res.status(200).send(items[0]);
}

Data.deleteOneItem = async(req, res) => {
  const id = req.params.id;
  await DataModel.deleteOne({_id:id});
  res.status(200).send('deleted');
}

Data.updateOneItem = async(req, res) => {
  const id = req.params.id;
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).send(item);
}

module.exports = Data;
