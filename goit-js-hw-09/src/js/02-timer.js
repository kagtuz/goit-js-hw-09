
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

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startCountDownHandler() {
  const selectedDate = datePicker.selectedDates[0];
  if (!selectedDate) return;
  dateField.disabled = true;
  btn.disabled = true;
  let timerId = setInterval(function () {
    let difference = new Date(selectedDate) - new Date();
    const { days, hours, minutes, seconds } = convertMs(difference);
    dayField.innerHTML = days
    hourField.innerHTML = hours
    minuteField.innerHTML = minutes
    secondField.innerHTML = seconds

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