/**
 * This module is responsible for processing the dateString into a Date object. 
 */



export default class Process {
    constructor(dateString){
        this.dateString = dateString;
        // turns the dateString into a date object. 
        this.date = new Date(this.dateString);
        console.log("Old Date: "+this.date);

        // get a timestamp of the date by using Date.parse, you could also use date.getTime() but this returns a string. 
        this.timestamp = Date.parse(this.date);
        console.log(this.timestamp);

        // this.newDate = new Date(this.timestamp);
        // console.log("New Date:"+this.newDate)

    }


}