import dbConnect from '../../lib/dbConnect'
import User from '../../models/userModel';
import data from '../../utils/data';


const handler = async (req, res) => {
  await dbConnect();
  await User.deleteMany();
  await User.insertMany(data.users);
   
  res.send({ message: 'seeded successfully' });
};
export default handler;