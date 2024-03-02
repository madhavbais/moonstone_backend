const registrations = require("../model/registrationsModel");

const addEvent = asynchandler(async (req, res) => {
    const name = req.body.name;
    const phone_no = req.body.phone_no;
    const aadhar_no = req.body.aadhar_no;
    const utr = req.body.utr;
    const gender = req.body.max_team_size;
    const eventName = req.body.eventName;
    const eventID = req.body.eventID;
    const college = req.body.college;
    const category = req.body.category;
    const status = req.body.status;
    const date_of_registration = req.body.date_of_registration;
    const accept = req.body.accept;
    const reg_id= req.body.reg_id;
    const team = req.body.team;

    const findRegistration = await registrations.findOne({ name : name });
    if(!findRegistration){
        try{
            const newRegistration = await registrations.create(
            
            )
        } catch {
            
        }
    } else {

    }
   


})