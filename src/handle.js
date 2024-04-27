import datesManager from "./datesManager";
import { render } from ".";
/**
 * handles the input and buttons on the page. 
 */

export default class HandlePage {

    constructor() {
        this.dateInput = document.getElementById('date');
    
        this.submitBtn = document.getElementById('submit');

        this.dateString = ""

        // setup event listener 
        this.setupEventListener();
    }

    setupEventListener(){
        this.submitBtn.addEventListener('click', ()=> {
            console.log("Submit button clicked");
        // when the submit button is clicked we retrieve the raw date-string
        const newDate = this.dateInput.value;

        // Basic validation to check if the input field is not empty
        if (!newDate) {
            console.error("No date entered. Please enter a date.");
            alert("Please enter a date."); // Or handle this in a more user-friendly way
            return; // Stop further execution
        }
        // uncomment the logs below to prove that date inputs are strings. 
        // console.log(this.dateString);
        // console.log(typeof this.dateString);
        
        // Convert dateString to a date
        const date = new Date(newDate);
        // then get timestamp
        const timestamp = Date.parse(date);
        // send value for data processing. 
        datesManager.addDate(timestamp);

        //  Dispatch a custom even to notify that the dates need to be refreshed
        const refreshEvent = new CustomEvent('refreshDates');
        window.dispatchEvent(refreshEvent);

        });
    }
    



}
