const TimeStamp = require('../model/models.time_stamp');

class TimeStampController{

    constructor(){

    }

    getCurrentDate = ()=>{
        var date = new Date()
        var time = date.toUTCString().split(' ')[4]
        var month = date.getUTCMonth();
        var year = date.getUTCFullYear();
        var day = date.getUTCDate();
        if(day < 10) day = '0' + day;
        month += 1;
        if(month < 10) this.month = '0' + month
        
        var timeStamp = new TimeStamp(time, month, year, day)
        return timeStamp;
        console.log(tStamp)
    }

    getDate = (time, month, year, day)=>{
        var timeStamp = new TimeStamp(time, month, year, day);
        return timeStamp;
    }

    getDateFromString = (dateString)=>{

    }

}

module.exports = TimeStampController;