const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req,res)=>{

    try{

        const user = await User.findById(req.params.id);
        if(!user)
        {
            return res.status(404).json("User not found!");
        }

        const {password,...userWithoutPassword} = user._doc;
        res.status(200).json(userWithoutPassword);
    }catch(err){
        res.status(500).json(err);
    }
};

const updateUser = async(req,res) =>{

    if(req.user.id == req.params.id || req.user.isAdmin){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt); 
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new:true}
            );
            const {password,...userWithoutPassword} = updatedUser._doc;
            res.status(200).json(userWithoutPassword);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You are not allowed to update this user!");
    }
};

const deleteUser = async(req,res)=>{
    if(req.user.id == req.params.id || req.user.isAdmin){
        try{

            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted successfully!");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You are not allowed to delete this user!");
    }
}

const followUser = async(req,res)=>{
    if(req.user.id !== req.params.id){
        try{

            const userToFollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            if(!userToFollow.followers.includes(req.user.id)){
                await userToFollow.updateOne({$push:{followers:req.user.id}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("User followed successfully!");
            }
            else{
                res.status(400).json("You already follow this user!");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }

    else{
        return res.status(403).json("You cannot follow yourself!");
    }
};

const unfollowUser = async(req,res)=>{
    if(req.user.id !== req.params.id){
        try{
            const userToUnfollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            if(userToUnfollow.followers.includes(req.user.id)){
                await userToUnfollow.updateOne({$pull:{followers:req.user.id}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json("User unfollowed successfully!");
            }
            else{
                res.status(400).json("You don't follow this user!");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }

    else{
        return res.status(403).json("You cannot unfollow yourself!");
    }
};

module.exports = {getUser,updateUser,deleteUser,followUser,unfollowUser};


