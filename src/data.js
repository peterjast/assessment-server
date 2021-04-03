'use strict';

const DataModel = require('./item-model.js');
// DataModel.collection.drop();
const Data = {};

// const hat = new DataModel({
//   name: 'snapback',
//   description: 'this goes on head'
// });
// hat.save();

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    console.log(req.body);
    const item = new DataModel(data);
    const result = await item.save();
    res.status(200).json(result);
  } catch(err){ next( err ) }
}

Data.getAllItems = async(req, res) => {
  const itemsArr = await DataModel.find({}, function (err, items) {
    if(err){ return(err.message) }
  })
  res.status(200).send(itemsArr);    
  console.log(itemsArr);
}

Data.getOneItem = async(req, res) => {
    const id = req.params.id;
    await DataModel.findById(id, function(err, item) {
      if(err){
        return (err.message)
      } else {
        res.status(200).send(item);
      }
    });
}

Data.deleteOneItem = async(req, res) => {
  try{
  const id = req.params.id;
  await DataModel.deleteOne({_id:id});
  res.status(200).send('deleted');
  } catch(err){
    return ( err.message )
  }
}

Data.updateOneItem = async(req, res) => {
  try{
  const id = req.params.id;
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).send(item);
  } catch(err){
    return ( err.message );
  }
}

module.exports = Data;
