const registrations = require("../model/registrationsModel");
const admin = require("../model/adminModel");
const asynchandler = require("express-async-handler");
const addNewRegister = asynchandler(async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone_no = req.body.phone_no;
  const aadhar_no = req.body.aadhar_no;
  const utr = req.body.utr;
  const gender = req.body.gender;
  const eventName = req.body.eventName;
  const eventID = req.body.eventID;
  const college = req.body.college;
  const category = req.body.category;
  const date_of_registration = req.body.date_of_registration;
  const accept = req.body.accept;
  const reg_id = req.body.reg_id;
  const team = req.body.team;

  const findRegistration = await registrations.findOne({ email: email });
  if (!findRegistration) {
    try {
      const newRegistration = await registrations.create({
        email: email,
        name: name,
        phone_no: phone_no,
        aadhar_no: aadhar_no,
        utr: utr,
        gender: gender,
        eventName: eventName,
        eventID: eventID,
        college: college,
        category: category,
        status: "pending",
        date_of_registration: date_of_registration,
        accept: accept,
        reg_id: reg_id,
        team: team,
      });
      res.json({
        msg: "Registration Done",
        status: 200,
        sucess: true,
      });
    } catch (error) {
      throw new Error("Unable to register");
    }
  } else {
    throw new Error("This registration has been done already.");
  }
});

const updateRegistration = async (req, res) => {
  try {
    const reg_id = req.body.reg_id;
    const updatedFields = req.body.updatedFields; // Fields you want to update

    const findRegistration = await registrations.findOne({ reg_id: reg_id });

    if (findRegistration) {
      // Update only the fields that are provided in the request body
      const updatedRegistration = await registrations.findOneAndUpdate(
        { reg_id: reg_id },
        { $set: updatedFields },
        { new: true }
      );

      res.json({
        msg: "Registration updated successfully",
        status: 200,
        success: true,
        updatedRegistration,
      });
    } else {
      res.json({
        msg: "Registration not found",
        status: 404,
        success: false,
      });
    }
  } catch (error) {
    res.json({
      msg: "Unable to update registration",
      status: 500,
      success: false,
      error: error.message,
    });
  }
};

const deleteRegistration = async (req, res) => {
  const reg_id = req.body.reg_id;
  const findRegistration = await registrations.findOne({ reg_id: reg_id });

  if (reg_id) {
    await registrations.deleteOne({ reg_id: reg_id });

    res.json({
      msg: "Registration deleted successfully",
      status: 200,
      success: true,
    });
  } else {
    res.json({
      msg: "Registration not found",
      status: 500,
      success: false,
    });
  }
};

const getAllRegistration = asynchandler(async (req, res) => {
  const email = res.body.email;
  const findsuperadmin = await admin.find({ email: email });
  if (findsuperadmin.superAdmin === true) {
    const findalldata = await registrations.find();
    res.json(findalldata);
  } else if (findsuperadmin.registrationDesk == true) {
    const findcategory = findsuperadmin.category;
    const finddata = await registrations.find({ category: findcategory });
    res.json(finddata);
  } else {
    throw new Error("you are not a admin");
  }
});
const aproveregistration = asynchandler(async(req,res)=>
{
  const registrationid = req.params.id;
  const category = req.body.category;
  const eventid= req.bosy.eventid;
  const amount = req.body.amount;
  const findRegistration = registrations.findById(registrationid);
  if(findRegistration){
    const updateRegistration = await registrations.updateOne({_id:registrationid},{
      status:"approved"
    })
    res.json({
      msg:"request approved for registration"
    })
  }
  else{
    throw new Error("cant update data. registrations not found")
  }
});
const denyregistrations = asynchandler(async(req,res)=>{
  const registrationid = req.body.regid;
  const findRegistration = await registrations.findById(registrationid);
  if(findRegistration){
    const updatedata = await  registrations.updateOne({_id:id},{
      status:"not approved"
    })
    res.json(
      {msg:"registrations disapproved!!"}
    )
  }
  else{
    throw new Error("cant update registrations . registratios not found");
  }
})
module.exports = {
  addNewRegister,
  deleteRegistration,
  updateRegistration,
  getAllRegistration,
  aproveregistration,
  denyregistrations
};
