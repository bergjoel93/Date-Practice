/**
 * Responsible for managing the collection of dates. 
 */

class DatesManager {
    constructor() {
        this.dates = {};
        // we need data persistance so you should load dates from storage each time. 
        this.dates = this.loadDates();// dates is an object with key value pair. 
    }

    // get dates
    getDates(){
        return this.dates;
    }

    getDateById(id) {
        if(this.validateId){
            return this.dates[id];
        }
    }

    // Add a new date to the list
    addDate(timestamp) {
        // check if dates object is empty 
        if(this.isEmpty()){
            //if it is we initialize first key as 0.
            let initialId = 0; 
            this.dates[initialId] =  timestamp;
            console.log('new date added for first time');
            this.saveDates();
        }
        else{
            console.log("new date added: " +( new Date(timestamp)))
            // get an array of the keys
            const keys = Object.keys(this.dates);
            //get the last key in the array then add 1 for the new id. 
            let newId = Number(keys[keys.length - 1]) + 1;
            this.dates[newId] = timestamp;

            // save the dates to local storage
            this.saveDates();
        }
    }  
    // updates the dates to local storage. 
    saveDates(){
        const JSONString = JSON.stringify(this.dates);
        // set the dates in local storage. 
        localStorage.setItem("dates", JSONString);
        console.log("Dates updated in local storage.")
    }
    /**
     * deletes a date, input ID. 
     * @param {number} id 
     */
    deleteDate(id) {
        if(this.validateId(id)){
            delete this.dates[id];
            console.log(` Date with ID ${id} has been removed`);
            this.saveDates();
        } else {
            console.log("no date found with given ID");
        }
    }

    loadDates() {
        // get the string from local storage
        const retrieve = localStorage.getItem("dates");
        if(retrieve){
            this.dates = JSON.parse(retrieve);
        }
        else {
            console.log("No dates found in local storage.");
        }
        return this.dates;
    }
    /**
     * I always forget how to find an Id so here's a method to validate if an id exists in the dates object. 
     * @param {number} id - id
     */
    validateId(id) {
        if(id in this.dates){
            return true;
        }
        else {
            console.error("no ID found in dates object");
            return false;
        }
    }

    /**
     * Checks if the dates object is empty or not.
     * Returns true if it is empty.  
     */
    isEmpty() {
        if(localStorage.getItem("dates") === null ){
            return true;
        }
        else {
            return false;
        }
    }

}
const datesManager = new DatesManager(); //instantiated 

export default datesManager;