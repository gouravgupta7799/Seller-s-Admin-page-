
const Candy = require('../model/model');

exports.postData = async (req, res, next) => {
  try {
    let Name = req.body.candyName;
    let Description = req.body.description;
    let Price = req.body.price;
    let Quantity = req.body.quantity;
    // console.log(Name, Description,Price,Quantity)
    // console.log(req.body)

    let candyDetail = await Candy.create({
      candyName: Name,
      candyDescription: Description,
      candyPrice: Price,
      candyQuantity: Quantity
    });
    // console.log(exps)
    res.status(200).send(candyDetail);
  }
  catch (err) {
    console.log(err)
    res.status(500).send(`${err.body}`)
  };
};

exports.getData = async (req, res, next) => {
  try {
    let candyDetails = await Candy.findAll()
    // console.log(candyDetails)
    res.send(candyDetails);
  }
  catch (err) {
    res.status(500).send(`${err.body}`)
  };
};


exports.updateData = async (req, res, next) => {
  try {
    let Id = req.body.id;

    let alredyExist = await Candy.findOne({ where: { id: Id } })
    if (!alredyExist) {
      return res.status(400).send('not exist')
    }
    if (alredyExist) {
      // console.log(alredyExist.dataValues)
      let candyMinus = req.body.candyQuantity
      Quantity = alredyExist.dataValues.candyQuantity;

      if (Quantity < candyMinus) {
        return res.send('No such candys are avilable')
      }

      if ((Quantity - candyMinus) == 0) {
        Candy.findByPk(Id)
          .then(item => {
            item.destroy();
          })
      }
      
      else {
        let newQuantity = Quantity - candyMinus

        let exps = await Candy.update(
          {
            candyQuantity: newQuantity,
          },
          { where: { id: Id } }
        )
        res.send('Updates')
      }
    }
  }
  catch (err) {
    res.status(500).send(`${err.body}`)
  }
}
