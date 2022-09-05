import dbConnect from "../../../lib/dbConnect"
import Users from '../../../models/userModel'

export default async function handler(req, res) {
    const { method } = req
  
    await dbConnect()
  
    switch (method) {
        
        case 'POST':
          try {
            const {name, email, password, cf_password } = await Users.create(
              req.body
            ) /* create a new model in the database */
            res.status(201).json({ success: true, data: {name, email, password, cf_password }})
          } catch (error) {
            res.status(400).json({ success: false })
          }
          break
        default:
          res.status(400).json({ success: false })
          break
      }
    }