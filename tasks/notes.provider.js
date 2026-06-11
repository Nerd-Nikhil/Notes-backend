import { Notes } from "./notes.schema.js";

export async function handleAddnote(req,res) {
    const {title,content,tags} = req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({message:"Title is required"});
    }
    if(!content){
        return res.status(400).json({message:"Content is required"});
    }

    try{
        const note = new Notes({
            title,
            content,
            tags:tags || [],
            userId:user._id
        });
        await note.save();
        return res.json({error:false,note,message:"Note added successfully"});
    }
    catch(e){
        return res.status(500).json({error:true,message:e.message});
    }
}

export async function handleEditnote(req,res){
    const noteId = req.params.noteId;
    const {title,content,tags,isPinned} = req.body;
    const {user} = req.user;
    if (!title && !content && !tags){
        return res.json({message:"No changes provided"});
    } 
    try {
        const note = await Notes.findOne({_id:noteId,userId:user._id});
        if(!note) return res.json({message:"Note not found"});

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned!==undefined) note.isPinned = isPinned;

        await note.save();

        res.json({error:false,note,message:"Updated successfully"});


    } catch (error) {
        return res.json({error:true,message:error.message});
    }
}

export async function handleGetnotes(req,res){
    const {user} = req.user
    try{
        const notes = await Notes.find({userId:user._id}).sort({isPinned:-1});

        return res.json({error:false,notes,message:"all notes printed"});

    }
    catch(e){
        return res.json({error:true,message:e.message});
    }
}
export async function handleDeletenote(req,res){
    const noteId = req.params.noteId;
    const {user} = req.user;
    try{
        const note = await Notes.findOne({_id:noteId,userId:user._id});
        if(!note){
         return res.json({message:"no such note found"});
        } 
        
        await Notes.deleteOne({_id:noteId,userId:user._id});

        return res.json({error:false,message:"Note deleted successfully"});

    }
    catch(e){
        return res.json({error:true,message:e.message});
    }
}

export async function handleSearchnotes(req,res){
    const {user} = req.user;
    const {query} = req.query;

    if(!query){
        return res.status(400).json({error:true,message:"No search query provided"});
    }
    try {
        const matchingNote = await Notes.find({
            userId:user._id,
            $or:[
                {title:{$regex: new RegExp(query,"i")}},
                {content:{$regex: new RegExp(query,"i")}},
            ],
        });
        return res.json({
            error:false,
            notes:matchingNote,
            message:"Matching notes retrived"
        })
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}