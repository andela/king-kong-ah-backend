import { User } from '../models';


class UserController {
  static async createTestUser(req,res){
    try{
    const user = await User.create(req.body);
    return res.status(200).send({
      status: 200,
      data: user
    })
  }
  catch (error){
    console.log(error);
    return error;
  }
  }
}

export default UserController;
