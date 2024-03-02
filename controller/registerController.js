const registrations = require("../model/registrationsModel");

const addNewRegister = asynchandler(async (req, res) => {
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
            const newRegistration = await registrations.create({
               name: name,
               phone_no: phone_no,
               aadhar: aadhar_no,
               utr: utr,
               gender: gender,
               eventName: eventName,
               eventID: eventID,
               college: college,
               category: category,
               status: "..pending",
               date_of_registration: date_of_registration,
               accept: accept,
               reg_id: reg_id,
               team: team
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
      

      

      const deleteRegistration = async (req,res) => {
        const reg_id = req.body.reg_id;
        const findRegistration = await registrations.findOne({ reg_id: reg_id });
        
                if (reg_id) {
                    
                    await registrations.deleteOne({ reg_id: reg_id});
        
                    res.json({
                        msg: "Registration deleted successfully",
                        status: 200,
                        success: true
                    });
                } else {
                    res.json({
                        msg: "Registration not found",
                        status: 500,
                        success: false
                    });
    
        }
    }     
    module.exports = { addNewRegister, deleteRegistration, updateRegistration };

