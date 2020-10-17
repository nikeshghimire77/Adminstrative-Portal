import Link from "../models/Link";
import { apiError } from "../controller/apiError";

export const getLink = async id => {
  let existingLink = null;
  const link = await Link.findById(id, function(err, link) {
    if (err) throw new apiError("unable to find link.", 500);
    existingLink = link;
  });
  return existingLink;
};

export const getAllLinks = async () => {
  return Link.find({}).exec();
};

export const addLink = async link => {
  let newLink = new Link({
    name: link.name,
    url: link.url
  });
  let addedLink = await newLink.save();
  return addedLink;
};

export const updateLink = async link => {
  let newLink = new Link({
    name: link.name,
    url: link.url
  });
  let linkr = null;
  await Link.findOneAndUpdate(
    { _id: link._id },
    { $set: link },
    { new: true },
    function(err, newUpdatedLink) {
      if (err) throw new apiError("unable to updated link.", 500);
      linkr = newUpdatedLink;
      console.log("link service", newUpdatedLink);
      console.log("link service", linkr);
    }
  );
  return linkr;
};

export const deleteLink = async id => {
  let deleteLink = null;
  await Link.findByIdAndDelete(id, (err, link) => {
    if (err) throw new apiError("unable to delete link.", 500);
    deleteLink = link;
  });
  return deleteLink;
};
