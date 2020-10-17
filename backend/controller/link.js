import * as LinkService from "../services/link.service";

export const getLink = async id => {
  const response = await LinkService.getLink(id);
  return response;
};

export const getAllLinks = async () => {
  const response = await LinkService.getAllLinks();
  return response;
};

export const addLink = async newLink => {
  const link = await LinkService.addLink(newLink);
  return link;
};

export const updateLink = async link => {
  const updatedLink = await LinkService.updateLink(link);
  console.log("kiran update link", updatedLink);
  return updatedLink;
};

export const deleteLink = async id => {
  const delink = await LinkService.deleteLink(id);
  return delink;
};
