import datesManager from "./datesManager"
import { format } from "date-fns";
import handle from "./handle.js";

/** 
 * Responsible for creating the html and rendering the cards that will be injected/appended to date-list-container. 
 */

class Render {
    constructor(){
        this.dates = datesManager.getDates();
        
        this.dateListContainer = document.querySelector('.date-list-container'); // create dateListContainer
        
    }

    createCard(){
        // Clear the current cards 
        this.dateListContainer.innerHTML = '';
        Object.entries(this.dates).forEach(([id, timestamp]) => {
            const date = new Date(timestamp);
            const formattedDate = format(date, 'MMMM do yyyy');
            const formattedTime = format(date, 'h:mm aa');

            // create card container
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', `${id}`);

            // append the strings to the card. 
            const dateText = document.createElement('h3');
            dateText.innerHTML = `${formattedDate}`;
            const timeText = document.createElement('h2');
            timeText.innerHTML = ` ${formattedTime}`;

            card.appendChild(dateText);
            card.appendChild(timeText);

            // create delete button 
            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('class', `deleteBtn`);
            deleteBtn.setAttribute('data-id', `${id}`);
            deleteBtn.setAttribute('id', `delete-${id}`);
            deleteBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;

            card.appendChild(deleteBtn);

            this.dateListContainer.appendChild(card);
        });
    }

    refreshCards() {
        this.dates = datesManager.getDates(); // Re-fetch the dates
        this.createCard(); // Re-create the cards
        handle.handleCards();
    }
}

const render = new Render();
export default render;