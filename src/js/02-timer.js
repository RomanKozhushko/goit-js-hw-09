// 1. Імпортування бібліотек
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

// 2. Відкриття доступу 
const refs = {
    input : document.querySelector("#datetime-picker"),
    btn : document.querySelector("[data-start]"),
    divTimer :  document.querySelector(".timer"),
    spanDays : document.querySelector("[data-days]"),
    spanHours : document.querySelector("[data-hours]"),
    spanMinutes : document.querySelector("[data-minutes]"),
    spanSeconds : document.querySelector("[data-seconds]"),
};

//3. Оголошення змінних!
let timerId = null;
let userTime = null;
refs.btn.disabled = true;

//4. Запуск таймеру!
function startTimer(onBtn) {
       if(onBtn.disabled)  {
      return 
    };  
    timerId = setInterval(()=> {
        const saveTime = Date.now();
        const totalSaveTime = userTime - saveTime;
        const resoltTime =  newTimer(totalSaveTime);
        updateTime(resoltTime);
        if(totalSaveTime <= 0) {
            clearInterval(timerId);
            updateTime({
                days: "00",
                hours : "00",
                minute : "00",
                seconds: "00",
            });
            }},1000)
};
//5. Визначення дедлайну тарозрахунок часу в різних одиницях
function newTimer(totalTime) {
    const seconds = pad(Math.floor((totalTime / 1000) % 60));
    const minute = pad(Math.floor(totalTime / 1000 / 60) % 60);
    const hours = pad(Math.floor(totalTime / 1000 / 60 / 60) % 24);
    const days = pad(Math.floor(totalTime/ 1000 / 60 / 60 / 24));
    return {seconds,minute,hours,days};
};
function pad(value) {
    return String(value).padStart(2, '0');
  };

function updateTime({ days, hours, minute, seconds }) {
    refs.spanSeconds.textContent = seconds;
    refs.spanMinutes.textContent = minute;
    refs.spanHours.textContent = hours;
    refs.spanDays.textContent = days;
    refs.btn.disabled = true
  };

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       const userTimeNow = Date.now();
       userTime = selectedDates[0]
       //console.log(userTimeNow);
      if(userTime <= userTimeNow)
       {
        Notify.failure(`❌ Please choose a date in the future`);
        return
      }
       Notify.success(`✅ Good choice,сlick on start`);
       refs.btn.disabled = false
    }
};
flatpickr(refs.input,options);
refs.btn.addEventListener("click",startTimer);