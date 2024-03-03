const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const adminSchema = new Schema(
    {
        email: {
            type:String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        superAdmin: {
            type: Boolean,
            default: false
        },
        registrationDesk: {
            type: Boolean,
            default: false
        },
        finance: {
            type: Boolean,
            default: false
        },
        eventDepartment:{
            type:String,
            default:"none"
        },
        refreshtoken: {
            type: String
        },
    },
    {
        timestamps:true,
    }
)
adminSchema.pre("save",async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await  bcrypt.hash(this.password,salt);

});
// retriving password and comparing with login passwword
adminSchema.methods.isPasswordMatched = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)
};
module.exports = mongoose.model('Admin', adminSchema)