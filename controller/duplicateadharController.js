const expressAsyncHandler = require("express-async-handler");
const duplicateAadharModel = require("../model/duplicateAadharModel");

const checkduplicate = expressAsyncHandler(async (req, res) => {
  const eventid = req.body.eventid;
  const aadhar_no = req.body.aadhar_no;
  const checkaadhar = await duplicateAadharModel.findOne({
    aadhar_list: { $elemMatch: { aadhar_no: aadhar_no } },
  eventid:eventid});
  if (checkaadhar) {
    throw new Error("aadhar  already registerd for event!");
  } else {
    const newdata = await duplicateAadharModel.create({
      eventid: eventid,
    });
    const updatedata = await duplicateAadharModel.findByIdAndUpdate(
      newdata._id,
      {
        $push: { aadhar_list: { aadhar_no: aadhar_no } },
      }
    );
    res.json(updatedata);
  }
});

module.exports = { checkduplicate };
