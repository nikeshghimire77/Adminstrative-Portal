import * as UserService from "../services/user.service";

export  const loginUser = async req => {
  const response = await UserService.loginUser(req);
  console.log("kiran", response);

  return response;
};
export   const logoutUser = async (req, res) => {
  delete req.headers["x-access-token"];

  return res.status(200).json({
    message: "User has been successfully logged out"
  });
};
