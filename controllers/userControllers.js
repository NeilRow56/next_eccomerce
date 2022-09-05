import User from '../models/userModel'
 
//GET all users
 
const allUsers = async (req, res) => {
   try {
       const users = await User.find()
 
       res.status(200).json({
           success: true,
           users
       })
 
   } catch (error) {
       res.status(400).json({
           success: false,
           error: error.message
       })
   }
     
}
 
// Create new user = /api/users
 
const newUser = async (req, res) => {
 
   try {
       const user = await User.create(req.body);
      
   res.status(200).json({
       success: true,
       user
   })
      
   } catch (error) {
       res.status(400).json({
           success: false,
           error: error.message
       })
           
   }
}
 
export {
   allUsers,
   newUser
}
