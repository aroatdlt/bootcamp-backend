import { connectToDBServer, disconnectFromDBServer } from 'core/servers';
import { envConstants } from 'core/constants';
import { getAccommodationContext } from 'dals/accommodation/accommodation.context';
import inquirer from "inquirer";
import { ObjectId } from 'mongodb';

const reviewQuestions = [
  {
    name: "id",
    type: "input",
    message: "Id del alojamiento:",
    mask: false,
  },
  {
    name: "name",
    type: "input",
    message: "Your name:",
    mask: false,
  },
  {
    name: "comment",
    type: "input",
    message: "Your review about the house:",
    mask: false,
  },
]

export const run = async () => {
  let {id, name, comment} = await inquirer.prompt(reviewQuestions);
  let reviewToDb = {
    _id: new ObjectId(),
    date: {
      $date: {
        $numberLong: new Date()
      }
    },
    reviewer_name: name,
    comments: comment,
    listing_id: "", 
    reviewer_id: ""
  }
  await connectToDBServer(envConstants.MONGODB_URI);
  await getAccommodationContext().findOneAndUpdate(
    { "_id" : id },
    { $addToSet: { "reviews": reviewToDb }},
    { upsert: true, returnDocument: "after" }
  )
  await disconnectFromDBServer();
};