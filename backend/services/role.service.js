import Role from "../models/Role";
import apiError from "../controller/apiError";

export const getRole = async id => {
  let existingRole = null;
  const role = await Role.findById(id, function(err, role) {
    if (err) throw new apiError("unable to find role.", 500);
    existingRole = role;
  });
  return existingRole;
};
export const getRolesByIds = async array => {
  console.log("ERROR message ", array);

  let existingRole = [];
  const role = await Role.find({ _id: { $in: array } }, function(err, role) {
    console.log("ERROR message ", role);
    if (err) throw new apiError("unable to find roles.", 500);
    return role;
  });
};
export const getAllRoles = async () => {
  return Role.find({}).exec();
};

export const addRole = async role => {
  console.log("Role Service", role);
  let newRole = new Role({
    name: role.name,
    description: role.description,
    links: role.links
  });
  let addedRole = await newRole.save();
  return addedRole;
};

export const updateRole = async role => {
  let newRole = new Role({
    name: role.name,
    description: role.description,
    links: role.links
  });
  let roler = null;
  await Role.findOneAndUpdate(
    { _id: role._id },
    { $set: role },
    { new: true },
    function(err, newUpdatedRole) {
      if (err) throw new apiError("unable to updated role.", 500);
      roler = newUpdatedRole;
    }
  );
  return roler;
};

export const deleteRole = async id => {
  let deleteRole = null;
  await Role.findByIdAndDelete(id, (err, role) => {
    if (err) throw new apiError("unable to delete role.", 500);
    deleteRole = role;
  });
  return deleteRole;
};
