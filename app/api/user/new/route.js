import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  const { username, email, password, fullName, avatar } = req.json();

  try {
    connectToDB();

    
  } catch (error) {
    
  }
}