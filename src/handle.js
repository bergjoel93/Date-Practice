import datesManager from "./datesManager";
import render from "./render";
/**
 * handles the input and buttons on the page. 
 */

class HandlePage {

    constructor() {
        this.dateInput = document.getElementById('date');
    
        this.submitBtn = document.getElementById('submit');

        this.dateString = ""
        
    }

    handleSubmit(){
         // Submit Button 
         this.submitBtn.addEventListener('click', () => {
            console.log("Submit button clicked");
            // when the submit button is clicked we retrieve the raw date-string
            const newDate = this.dateInput.value;

            // Basic validation to check if the input field is not empty
            if (!newDate) {
                console.error("No date entered. Please enter a date.");
                alert("Please enter a date."); // Or handle this in a more user-friendly way
                return; // Stop further execution
            }
            else {
                // Convert dateString to a date
                const date = new Date(newDate);
                // then get timestamp
                const timestamp = Date.parse(date);
                // send value for data processing. 
                datesManager.addDate(timestamp);

                // refresh the page
                render.refreshCards();
            }
            
        });

    }

    handleCards() {
        // setup event listeners for cards. 
        if(!datesManager.isEmpty()){ // if dates is not empty

            // Event for the delete button
            const deleteBtns = document.querySelectorAll('.deleteBtn');
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', ()=>{
                    // get the id from the delete button
                    const id = Number(btn.getAttribute('data-id'));
                    // delete the date
                    datesManager.deleteDate(id);
                    // refresh the cards. 
                    render.refreshCards();
                });
            });

            // hovering effect making delete button visible. 
            const cards = document.querySelectorAll('.card');
            cards.forEach(card =>{
                card.addEventListener('mouseenter', ()=>{
                    // get id from card 
                    const id = card.getAttribute('data-id');
                    // select the right delete btn. 
                    const deleteBtn = document.querySelector(`#delete-${id}`);
                    deleteBtn.style.visibility = 'visible';
                });
                card.addEventListener('mouseleave', ()=>{
                    // get id from card 
                    const id = card.getAttribute('data-id');
                    // select the right delete btn. 
                    const deleteBtn = document.querySelector(`#delete-${id}`);
                    deleteBtn.style.visibility = 'hidden';
                });
            });

        }
    }


}
const handle = new HandlePage();
export default handle;
