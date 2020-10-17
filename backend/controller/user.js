import * as UserService from "../services/user.service";
import * as RoleService from "../services/role.service";

export const getUser = async id => {
  console.log("response1", typeof id);

  const response = await UserService.getUser(id);
  console.log("response1", response);
  return response;
};

export const getAllUsers = async () => {
  const response = await UserService.getAllUsers();

  return response;
};
export const getUserChilds = async id => {
  let roles = [];
  let links = [];

  let rolesObj = null;
  let finalResponse = await UserService.getUserRoles(id);
  /*   .then(function(response) {
      console.log("response kiran ", response);
      finalResponse = response;
      return response;
      roles = response.roles;
        RoleService.getRolesByIds(roles)
        .then(function(response) {
          rolesObj = response;
          console.log("response rolesObj", response);

          rolesObj.map((item, i) => {
            roles.push(item.name);
            links.push(item.links);
          });
          finalResponse.push(roles);
          finalResponse.push(links);
          console.log(finalResponse);
          return finalResponse;
        })
 //       .catch(error => {}); */
  //   })
  //  .catch(error => {});
  return finalResponse;
};
export const addUser = async newUser => {
  const user = await UserService.addUser(newUser);
  return user;
};

export const updateUser = async user => {
  const updatedUser = await UserService.updateUser(user);
  return updatedUser;
};

export const deleteUser = async id => {
  const deuser = await UserService.deleteUser(id);
  return deuser;
};
