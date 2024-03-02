const events = require('../model/eventsModel');

const addEvent = async(req,res)=>{
    const eventName = req.body.eventname;
    const instructions = req.body.instructions;
    const event_category = req.body.event_category;
    const  max_team_size = req.body.max_team_size;
    const min_team_size = req.body.min_team_size;
    
    const findevent = await events.findOne({eventName: eventName});
    if(!findevent){
        try{
            const newevent = await events.create({"eventName":eventName,"instruction":instructions,"event_category":event_category,"max_team_size":max_team_size,"min_team_size":min_team_size});
            res.json({
                msg:"Event added successfully",
                status:200,
                sucess:true
            })
        }
        catch(error){
            res.json({msg:"unable to create new event",status:500,success:false})
        }
    }
    else{
        res.json(
            
                {msg:"event already exist cant create new event",status:500,success:false}
            
        )
    }

}

module.exports = {addEvent};