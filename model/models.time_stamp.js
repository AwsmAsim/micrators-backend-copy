class TimeStamp{

    constructor(time, month, year, day){
        this.time = time
        this.month = month
        this.day = day
        this.year = year
    }

    // constructor(time, month, day, year){
    //     this.time = time
    //     this.month = month
    //     this.day = day
    //     this.year = year
    // }

    getStringDate(){
        var sMonth = this.month < 10 ? '0'+this.month : this.month;
        var sDay = this.Day < 10 ? '0'+this.day : this.day;
        const tStamp = this.year+sMonth+sDay+this.time;
        return tStamp;
    }
}

module.exports = TimeStamp