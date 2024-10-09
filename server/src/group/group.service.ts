import {Group, IGroup } from "../models/group";
import {User} from "../models/users";

const createGroup = async (name: string, adminId: string, members: string[]): Promise<IGroup> => {
  const newGroup = new Group({
    name,
    admin: adminId,
    members: members, // Admin is also a member
  });
  
  await newGroup.save();

  await User.updateMany(
    { _id: { $in: members } },  // Find users whose IDs are in the memberIds array
    { $push: { groups: newGroup._id } }  // Add the new group's ID to each user's `groups` array
  );
  return newGroup;
};

const addUserToGroup = async (groupId: string, userId: string): Promise<IGroup | null> => {
  const group = await Group.findById(groupId);
  if (!group) throw new Error("Group not found");

  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
    await User.updateOne({_id: userId},{$push:{groups:group._id}})
  }
  
  return group;
};

const fetchGroupDetails = async (groupId: string): Promise<IGroup | null> => {
  return await Group.findById(groupId).populate("members", "name").populate("admin", "name");
};

export default { createGroup, addUserToGroup, fetchGroupDetails }