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

// نمایش زمان
function updateDisplay() {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  timeDisplay.textContent = `${h} : ${m} : ${s}`;
}

// تغییر دکمه استارت
function setStartButton(running) {
  startBtn.textContent = running ? 'Stop' : 'Start';
  startBtn.style.backgroundColor = running ? 'red' : '#4CAF50';
}

// ریست کردن بلندگو
function resetSpeaker() {
  speaker.className = 'fa fa-volume-off';
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
      setStartButton(false);
    }
  }, 1000);
}

// رویدادهای دکمه‌ها
submitBtn.addEventListener('click', () => {
  totalSeconds = Math.round(parseFloat(minuteInput.value) * 60);
  updateDisplay();
  isRunning = false;
  setStartButton(false);
  resetSpeaker();
});

startBtn.addEventListener('click', () => {
  if (!isRunning && totalSeconds > 0) {
    startTimer();
    isRunning = true;
    setStartButton(true);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    setStartButton(false);
  }
});

cancelBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  totalSeconds = 0;
  isRunning = false;
  updateDisplay();
  setStartButton(false);
  resetSpeaker();
});

presetSelect.addEventListener('change', () => {
  const value = presetSelect.value;
  if (value === 'custom') {
    customWrapper.style.display = 'inline-block';
  } else {
    customWrapper.style.display = 'none';
    totalSeconds = parseInt(value) * 60;
    updateDisplay();
    isRunning = false;
    setStartButton(false);
    resetSpeaker();
  }
});

// نمایش اولیه
customWrapper.style.display = 'inline-block';