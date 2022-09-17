
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { XNotify } from './x-notify';

const Notify = new XNotify('TopRight');
let dateField = document.getElementById('datetime-picker');
let btn = document.querySelector('button');
let dayField = document.querySelector('[data-days]');
let hourField = document.querySelector('[data-hours]');
let minuteField = document.querySelector('[data-minutes]');
let secondField = document.querySelector('[data-seconds]');

// let selectedDate = null;
const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //   onClose(selectedDates) {
  //     selectedDate = selectedDates[0];
  //   },

};
const datePicker = flatpickr(dateField, options);


btn.addEventListener('click', startCountDownHandler);
dateField.addEventListener('input', inputHandler);


// flatpickr(dateField, options);
btn.disabled = true;
document.querySelectorAll('.field').forEach(elem => {
  elem.style.cssText +=
    'text-align: center;font-size: 25px;margin-top: 0px;display: inline-flex;flex-direction: column;';
  elem.lastElementChild.style.cssText +=
    'addLeadingZeroding-top: 5px;font-size: 14px;text-transform: uppercase;';
});

function inputHandler() {
  const selectedDate = datePicker.selectedDates[0];
  if (new Date(selectedDate) <= new Date()) {
    btn.disabled = true;
    Notify.error({
      width: '300px',
      title: 'Please choose a date in the future',
      description: 'You shold pick correct date',
      duration: 2000,
    });
  } else {
    btn.disabled = false;
    Notify.success({
      width: '300px',
      title: 'Entered date is correct',
      description: 'Start the final countdown...',
      duration: 2000,
    });
  }
}


function startCountDownHandler() {
  const selectedDate = datePicker.selectedDates[0];
  if (!selectedDate) return;
  dateField.disabled = true;
  btn.disabled = true;
  let timerId = setInterval(function () {
    let difference = new Date(selectedDate) - new Date();
    dayField.innerHTML = addLeadingZero(
      Math.floor(difference / (1000 * 60 * 60 * 24))
    );
    hourField.innerHTML = addLeadingZero(
      Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    minuteField.innerHTML = addLeadingZero(
      Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    );
    secondField.innerHTML = addLeadingZero(
      Math.floor((difference % (1000 * 60)) / 1000)
    );

    if (difference < 1000) {
      clearInterval(timerId);
      Notify.info({
        width: '300px',
        title: 'Time`s up!',
        description: 'That`s it...',
        duration: 2000,
      });
      dateField.disabled = false;
    }
  }, 1000);
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}