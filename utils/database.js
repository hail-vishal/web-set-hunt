import mongoose from 'mongoose';

const connectToDatabase = async()=>{
  mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // console.log("connect to database");
  })
  .catch((err) => {
    console.log(err);
  });
}

export default connectToDatabase;