let timerRunning = false;

const debounce = (func) => {
  if (!timerRunning) {
    func();
  }
  timerRunning = true;
  setTimeout(() => {
    timerRunning = false;
  }, 100);
};

export default debounce;
