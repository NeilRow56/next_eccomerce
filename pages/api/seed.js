import dbConnect from '../../lib/dbConnect'
import User from '../../models/userModel';
import Product from "../../models/Product"
import data from '../../utils/data';


const handler = async (req, res) => {
  await dbConnect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
   
  res.send({ message: 'seeded successfully' });
};
export default handler;