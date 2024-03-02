const admin = require('../model/adminModel');

const addAdmin = async (req,res) => {
    const adminID = req.body.adminID;
    const password = req.body.password;
    const superAdmin = req.body.superAdmin;
    const registrationDesk = req.body.registrationDesk;
    const finance = req.body.finance;

    
    const findAdmin = await admin.findOne({adminID: adminID});
    if(!findAdmin){
        try{
            const newAdmin = await admin.create({"adminID":adminID,"password": password, "superAdmin": superAdmin, "registrationDesk": registrationDesk, "finance":finance});
            res.json({
                msg:"Admin added successfully",
                status:200,
                sucess:true
            })
        }
        catch(error){
            res.json({msg:"unable to create new Admin",status:500,success:false})
        }
    }
    else{
        res.json(
            
                {msg:"Admin already exist cannot create new admin",status:500,success:false}
            
        )
    }

}

const deleteAdmin = async (req,res) => {
    const adminID = req.body.adminID;
    const findAdmin = await admin.findOne({ adminID: adminID });
    
            if (findAdmin) {
                
                await admin.deleteOne({ adminID: adminID });
    
                res.json({
                    msg: "Admin deleted successfully",
                    status: 200,
                    success: true
                });
            } else {
                res.json({
                    msg: "Admin not found",
                    status: 500,
                    success: false
                });

    }
}
module.exports = {addAdmin, deleteAdmin};

