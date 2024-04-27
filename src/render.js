import datesManager from "./datesManager"
import { format } from "date-fns";
/** 
 * Responsible for creating the html and rendering the cards that will be injected/appended to date-list-container. 
 */

export default class Render {
    constructor(){
        this.dates = datesManager.getDates();
        console.log(this.dates);
        this.dateListContainer = document.querySelector('.date-list-container');
        this.createCard();
        this.setUpEventListeners();
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

    setUpEventListeners(){
        // Event for the delete button
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', ()=>{
                const id = Number(btn.getAttribute('data-id'));
                datesManager.deleteDate(id);
                this.refreshCards();
            });

        });

        // Listen for the refreshDates event to update cards
        window.addEventListener('refreshDates', () => {
            this.refreshCards();
        })

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

    refreshCards() {
        this.dates = datesManager.getDates(); // Re-fetch the dates
        this.createCard(); // Re-create the cards
        this.setUpEventListeners();
    }
}