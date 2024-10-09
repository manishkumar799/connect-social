import { Request, Response, NextFunction } from "express";
import groupService from "./group.service";

const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, members } = req.body;
    const adminId = req.user.id;

    const group = await groupService.createGroup(name, adminId, [...members,adminId]);
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
};

const addUserToGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId, userId } = req.body;
    
    const group = await groupService.addUserToGroup(groupId, userId);
    res.status(200).json(group);
  } catch (err) {
    next(err);
  }
};

const fetchGroupDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { groupId } = req.params;
    const group = await groupService.fetchGroupDetails(groupId);
    
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    
    res.sendResponse(group);
  } catch (err) {
    next(err);
  }
};

export default {createGroup, addUserToGroup, fetchGroupDetails}
