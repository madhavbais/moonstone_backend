const registrations = require("../model/registrationsModel");
const nodemailer = require("nodemailer");
const admin = require("../model/adminModel");
const duplicateAadharModel = require("../model/duplicateAadharModel");
const asynchandler = require("express-async-handler");
const eventsModel = require("../model/eventsModel");


const randomFixedInteger = (length)=> {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

// async function generateUniqueNumber() {
//   const min = 100000; // Minimum 6-digit number
//   const max = 999999; // Maximum 6-digit number
//   let number;
//   do {
//       number = Math.floor(Math.random() * (max - min + 1)) + min;
//   } while (!isUnique(number));
//   const updateNumberlist = await  registrationnumbersModel.create({registerationnumber: number})
//   return number;
// }

// const isUnique =asynchandler(async(number)=> {
//   try {
//       const result = await registrationnumbersModel.findOne({registerationnumber: number});
//       return !result; // Return true if the number does not exist in the database
//   } catch (error) {
//       throw new Error("Error checking uniqueness:",error);
//       return false;
//     }
// }
// )

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
  const team = req.body.team;
  const adhaarlist = req.body.aaharlist;
  console.log(team)
  console.log(adhaarlist)
  const findRegistration = await registrations.findOne({
    email: email,
    eventID: eventID,
  });
  // console.log(team);
  const registrationNumber =randomFixedInteger(9);
  if (!findRegistration&&registrationNumber) {
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
        reg_id: registrationNumber,
        team: team,
      });
      const insertinaadharlist = await duplicateAadharModel.findOne({eventid:eventID});
      if(insertinaadharlist){
        const updatelist = await duplicateAadharModel.updateOne({eventid:eventID},{"$push":{"aadhar_list":adhaarlist}})
      }
      else{
        const createlist = await duplicateAadharModel.create({
          eventid:eventID,
          aadhar_list:adhaarlist
        })
      }
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      const mailoptions = {
        from: {
          name: "Team Moonstone",
          address: process.env.email,
        },
        to: email,
        subject: "Thank You for Registering for the Moonstone Event",
        html:`<p>Dear <b>${name}</b><br/><br/>Hope this email finds you in good spirits.Thank you for taking the time to register for the upcoming Moonstone event :- <b>${eventName}</b>.your registration id is <b>${registrationNumber}</b><br/>Your interest and participation are highly valued, and we are thrilled to have you join us.We wanted to confirm that we have successfully received your registration details.<br/> However, <b>please note that all registrations are currently undergoing a verification process </b>to ensure accuracy and legitimacy.Rest assured, your registration is in progress, and we will keep you updated on its status via email.<br/>Once again, thank you for your registration and your enthusiasm for the Moonstone event. We are excited to have you with us and look forward to sharing more details about the event in the near future.<br/>Warm regards<br/>Moonstone committee</p>`
      };
      try {
        transporter.sendMail(mailoptions);
      } catch (err) {
        throw new Error(" problem in sending mail");
      }
      res.json({
        msg: "Registration Done",
        status: 200,
        sucess: true,
      });
    } catch (error) {
      throw new Error(`Unable to register ${error}`);
    }
  }else {
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
  const {email} = req.user;
  console.log(email);
  const findsuperadmin = await admin.findOne({email:email });
  if (findsuperadmin.superAdmin === true) {
    const findalldata = await registrations.find();
    res.json(findalldata);
  } else if (findsuperadmin.registrationDesk == true) {
    const findcategory = findsuperadmin.eventDepartment;
    const finddata = await registrations.find({ category: findcategory });
    // console.log(findcategory)
    // console.log(finddata);
    res.json(finddata);
  } else {
    throw new Error("you are not a admin");
  }
});
const aproveregistration = asynchandler(async (req, res) => {
  const registrationid = req.params.id;
  const category = req.body.category;
  const eventid = req.bosy.eventid;
  const amount = req.body.amount;
  const findRegistration = registrations.findById(registrationid);
  if (findRegistration) {
    const updateRegistration = await registrations.updateOne(
      { _id: registrationid },
      {
        status: "approved",
      }
    );
    res.json({
      msg: "request approved for registration",
    });
  } else {
    throw new Error("cant update data. registrations not found");
  }
});
const denyregistrations = asynchandler(async (req, res) => {
  const registrationid = req.body.regid;
  const findRegistration = await registrations.findById(registrationid);
  if (findRegistration) {
    const updatedata = await registrations.updateOne(
      { _id: id },
      {
        status: "not approved",
      }
    );
    res.json({ msg: "registrations disapproved!!" });
  } else {
    throw new Error("cant update registrations . registratios not found");
  }
});
module.exports = {
  addNewRegister,
  deleteRegistration,
  updateRegistration,
  getAllRegistration,
  aproveregistration,
  denyregistrations,
};
