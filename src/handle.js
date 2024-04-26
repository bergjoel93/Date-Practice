import datesManager from "./datesManager";
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
        // uncomment the logs below to prove that date inputs are strings. 
        // console.log(this.dateString);
        // console.log(typeof this.dateString);
        
        // Convert dateString to a date
        const date = new Date(newDate);
        // then get timestamp
        const timestamp = Date.parse(date);
        // send value for data processing. 
        datesManager.addDate(timestamp);

        });
    }
    



}
