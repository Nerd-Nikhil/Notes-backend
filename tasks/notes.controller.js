import { handleAddnote,handleEditnote, handleGetnotes,handleDeletenote,handleSearchnotes } from "./notes.provider.js";

export async function addNotes(req,res) {
    return await handleAddnote(req,res);
}
export async function editNotes(req,res) {
    return await handleEditnote(req,res);
}
export async function getNotes(req,res) {
    return await handleGetnotes(req,res);
}
export async function deleteNotes(req,res) {
    return await handleDeletenote(req,res);
}
export async function searchNotes(req,res) {
    return await handleSearchnotes(req,res);
}