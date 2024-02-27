document.addEventListener('DOMContentLoaded', function() {
    const currentDayDisplay = document.getElementById('currentDay');
    const timeBlocksContainer = document.getElementById('timeBlocks');
    const businessHours = 9; 
    //The workday starts at 9am
    const totalHours = 9; 

  
    // This is function to display today at the top of the calendar
    function displayCurrentDay() {
      const today = dayjs();
      currentDay.textContent = today.format('dddd, MMMM D, YYYY');
    }
  
    function generateTimeBlocks() {
      for (let i = 0; i < totalHours; i++) {
        const hour = businessHours + i;
        const timeBlock = document.createElement('div');
        timeBlock.classList.add('time-block');
  
        // Color coding past, present, and future time blocks
        if (dayjs().hour() > hour) {
          timeBlock.classList.add('past');
        } else if (dayjs().hour() === hour) {
          timeBlock.classList.add('present');
        } else {
          timeBlock.classList.add('future');
        }
  
        timeBlock.innerHTML = `
          <div class="hour">${hour}:00</div>
          <textarea class="event-input" placeholder="Enter event..."></textarea>
          <button class="save-btn">Save</button>
        `;
  
        // Save event to local storage
        const saveButton = timeBlock.querySelector('.save-btn');
        saveButton.addEventListener('click', function() {
          const eventText = timeBlock.querySelector('.event-input').value;
          localStorage.setItem(`event-${hour}`, eventText);
        });
  
        // Load saved events from local storage
        const savedEvent = localStorage.getItem(`event-${hour}`);
        if (savedEvent) {
          timeBlock.querySelector('.event-input').value = savedEvent;
        }
  
        timeBlocksContainer.appendChild(timeBlock);
      }
    }
  
    // Call functions
    displayCurrentDay();
    generateTimeBlocks();
  });