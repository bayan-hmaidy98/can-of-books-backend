const userModel = require('../models/user.model');

const getbooks = (req, res) => {

    const { email } = req.query;

    userModel.find({ email: email }, (err, user) => {
        if (err) {
            res.send(err)
        } else {
            res.json(user)
        }
    });
}
const createNewBook= (request, response) => {

    const email= request.body.email;
    const title = req.body.title;
    // console.log(title);
    const description = request.body.description;
   
    const status = request.body.status;
  
    const newBook=new userModel({
       email:email,
        books:{
        title,
        description,
        status,
        }
      });
      console.log(newBook);
      newBookObj.save();
      response.json(newBook);
    }

    const deleteBook = (request,response) => {
        try{
            const id=req.params.book_id;
            const {email}=request.query;
            console.log(id);
            userModel.findOne({ email: email }, (error, data) => {
                data[0].books.splice(id,1);
                data.save();
                    response.send(data); 
            })  
        }
        catch(error){
            response.send(error.info);
        }
        };
    

module.exports = {getbooks, createNewBook, deleteBook};
