
const logout = (req,res)=>{
    req.session.destroy()
    res.json({msg:"session terminated"})
 };
 module.exports = {
    logout
 }