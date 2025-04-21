let timerInterval;
let totalSeconds = 0;
let isRunning = false;

const presetSelect = document.getElementById('presetSelect');
const customWrapper = document.getElementById('customInputWrapper');
const minuteInput = document.getElementById('minuteInput');
const speaker = document.getElementById('speaker');
const startBtn = document.getElementById('startBtn');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
const timeDisplay = document.getElementById('timeDisplay');


function updateDisplay() {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// شروع تایمر
function startTimer() {
  clearInterval(timerInterval); 
  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      speaker.className = 'fa fa-volume-up red';
      isRunning = false;
      startBtn.textContent = 'Start';
      startBtn.style.background="#4CAF50"
    }
  }, 1000);
}

// دکمه Start/Stop
startBtn.addEventListener('click', () => {
  if (!isRunning && totalSeconds > 0) {
    startTimer();
    isRunning = true;
    startBtn.textContent = 'Stop';
    startBtn.style.background="red"
  } else {
    clearInterval(timerInterval); // متوقف کردن تایمر
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.style.background="#4CAF50"
  }
});

// دکمه Cancel
cancelBtn.addEventListener('click', () => {
  clearInterval(timerInterval); 
  totalSeconds = 0; 
  updateDisplay();
  isRunning = false;
  startBtn.textContent = 'Start';
  speaker.className = 'fa fa-volume-off';
});

// ثبت زمان 
submitBtn.addEventListener('click', () => {
  totalSeconds = parseFloat(minuteInput.value) * 60; 
  updateDisplay();
  isRunning = false;
  startBtn.textContent = 'Start';
  speaker.className = 'fa fa-volume-off'; 
});

// انتخاب زمان پیش‌فرض
presetSelect.addEventListener('change', () => {
  const value = presetSelect.value;
  if (value === 'custom') {
    customWrapper.style.display = 'inline-block'; 
  } else {
    customWrapper.style.display = 'none'; 
    totalSeconds = parseInt(value) * 60; 
    updateDisplay();
    isRunning = false;
    startBtn.textContent = 'Start';
    speaker.className = 'fa fa-volume-off'; 
  }
});

// نمایش زمان اولیه
updateDisplay();