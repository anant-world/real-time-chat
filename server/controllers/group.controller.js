import user from "../models/user.model"
import group from "../models/group.model"

const createGroup = async (req, res) => {
    try {
        const { groupName, username } = req.body
        
        if(!groupName || !username) {
            return res.status(402).json({
                "message": "Please provide all the filets",
                "success": false
            })
        }

        const creatingUser = await user.findOne(username)
        if(!creatingUser) {
            return res.status(400).json({
                "message": "user not found",
                "success": false
            })
        }

        const existingGroup = await group.findOne(groupName)
        if(existingGroup) {
            return res.status(401).json({
                "message":"group already exists",
                "success": false
            })
        }

        await group.create({
            groupName,
            createGroup,
            members: [{createGroup}],
        })

        res.json({ success: true, group: newGroup, message: "Group created" });
    } catch (error) {
        console.log("Error in creating the group -> ", error)
    }
}