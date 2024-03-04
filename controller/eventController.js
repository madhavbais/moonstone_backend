const events = require("../model/eventsModel");
const validatemongoid = require("../utils/validatemongoid");
const asynchandler = require("express-async-handler");
const addEvent = asynchandler(async (req, res) => {
  const eventName = req.body.eventname;
  const aboutEvent = req.body.aboutEvent;
  const instructions = req.body.instructions;
  const event_category = req.body.event_category;
  const max_team_size = req.body.max_team_size;
  const min_team_size = req.body.min_team_size;
  const event_image_link = req.body.image_link;
  const status = req.body.status;
  const Eventdate = req.body.Eventdate;
  const start_registraion_date = req.body.start_registraion_date;
  const end_registration_date = req.body.end_registration_date;
  const fees=req.body.fees;
  const event_qr_link= req.body.eventqr;
  const event_venue=req.body.venue;
  const findevent = await events.findOne({ eventName: eventName });
  if (!findevent) {
    try {
      const newevent = await events.create({
        eventName: eventName,
        instruction: instructions,
        event_category: event_category,
        max_team_size: max_team_size,
        min_team_size: min_team_size,
        aboutEvent: aboutEvent,
        event_image_link: event_image_link,
        Eventdate: Eventdate,
        status: status,
        start_registration_date: start_registraion_date,
        end_registration_date: end_registration_date,
        fees:fees,
        event_qr_link:event_qr_link,
        event_venue:event_venue
      });
      res.json({
        msg: "Event added successfully",
        status: 200,
        sucess: true,
      });
    } catch (error) {
      throw new Error("unable to create new event");
    }
  } else {
    throw new Error("This Event already exists.");
  }
});
const GetAllevents = async (req, res) => {
  const allevnts = await events.find({});
  res.json(allevnts);
};
const GetEventDataByCategory = asynchandler(async (req, res) => {
  const category = req.body.categoryname;
  const eventdata = await events.find({ event_category: category });
  if (eventdata) {
    res.json({
      eventDataByCategory: eventdata,
      status: 200,
      success: true,
    });
  } else {
    throw new Error("No Events Found in this Category!");
  }
});
const geteventById = asynchandler(async (req, res) => {
  const id = req.params.eventid;
  console.log(id);
  const result = await events.findById(id);
  console.log(result);
  if (result) {
    res.json({ eventdata: result, status: 200, success: true });
  } else {
    throw new Error("No Event Found with this ID");
  }
});
const updateEvent = asynchandler(async (req, res) => {
  const id = req.params.eventid;
  const allevent = await events.findById(id);
  const eventName = req.body.eventname;
  const instructions = req.body.instructions;
  const event_category = req.body.event_category;
  const max_team_size = req.body.max_team_size;
  const min_team_size = req.body.min_team_size;
  const aboutEvent = req.body.aboutEvent;
  const event_image_link = req.body.image_link;
  const status = req.body.status;
  const Eventdate = req.body.Eventdate;
  const start_registraion_date = req.body.start_registraion_date;
  const end_registration_date = req.body.end_registration_date;
  const fees=req.body.fees;
  const event_qr_link= req.body.eventqr;
  const event_venue= req.body.event_venue;
  if (allevent) {
    try {
      let updatedata = await events.updateOne(
        { _id, id },
        {
          eventName: eventName,
          instruction: instructions,
          event_category: event_category,
          max_team_size: max_team_size,
          min_team_size: min_team_size,
          aboutEvent: aboutEvent,
          event_image_link: event_image_link,
          Eventdate: Eventdate,
          status: status,
          start_registration_date: start_registraion_date,
          end_registration_date: end_registration_date,
          fees:fees,
          event_qr_link:event_qr_link,
          event_venue:event_venue
        }
      );
      res.json({
        msg: "Event updated successfully",
        status: 200,
        sucess: true,
      });
    } catch (error) {
      throw new Error("unable to update event try again");
    }
  } else {
    throw new Error("no such event found to update");
  }
});

const deleteEvent = asynchandler(async (req, res) => {
  const id = req.params.eventid;
  validatemongoid(id);
  try {
    const deletedata = await events.findByIdAndDelete(id);
    res.json(deletedata);
  } catch {
    throw new Error("something went wwrong");
  }
});
module.exports = {
  addEvent,
  GetAllevents,
  GetEventDataByCategory,
  updateEvent,
  geteventById,
  deleteEvent,
};
