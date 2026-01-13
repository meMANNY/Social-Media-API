const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async(req,res)=>{
    const newPost = new Post({

        userId: req.user.id,
        desc: req.body.desc,
        img: req.file.path,
    });

    try{
        await newPost.save();
        res.status(200).json("Post has been created!");
    }catch(err){
        res.status(500).json(err);
    }

};

const getPost = async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json("Post not found!");
        }

        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
};


const updatePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json("Post not found!");
        }

        if(post.userId !== req.user.id){
            return res.status(403).json("You can only update your own Post");
        }

        await post.updateOne({$set: req.body});
        res.status(200).json("Post has been updated!");
    }catch(err){
        res.status(500).json(err);
    }
};

const deletePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json("Post not found!");
        }

        if(post.userId !== req.user.id){
            return res.status(403).json("You can only delete your own Post");
        }

        await post.deleteOne();
        res.status(200).json("Post has been deleted!");
    }catch(err){
        res.status(500).json(err);
    }
};

const likePost = async(req,res)=>{
    try{

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json("Post not found!");
        }

        if(!post.likes.includes(req.user.id)){
            await post.updateOne({$push: {likes: req.user.id}});
            return res.status(200).json("Post has been liked!");
        }

        await post.updateOne({$pull: {likes: req.user.id}});
        res.status(200).json("Post has been disliked!");
    }catch(err){
        res.status(500).json(err);
    }
};


const getTimelinePosts = async(req,res)=>{
    try{
        const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );

        const allPosts = userPosts.concat(...friendPosts);
        const sortedPosts = allPosts.sort((a,b)=>{
            return b.createdAt - a.createdAt;
        });
        
        res.status(200).json(sortedPosts);
    }catch(err){
        res.status(500).json(err);
    }
};


module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    getTimelinePosts
};

