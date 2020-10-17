import * as RoleService from "../services/role.service";

export const getRole = async id => {
  const response = await RoleService.getRole(id);
  return response;
};

export const getAllRoles = async () => {
  const response = await RoleService.getAllRoles();
  return response;
};

export const addRole = async newRole => {
  const user = await RoleService.addRole(newRole);
  return user;
};

export const updateRole = async role => {
  const updatedRole = await RoleService.updateRole(role);
  return updatedRole;
};

export const deleteRole = async id => {
  const deuser = await RoleService.deleteRole(id);
  return deuser;
};
