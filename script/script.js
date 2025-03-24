const DAYS = ["день", "дня", "дней"];
const HOURS = ["час", "часа", "часов"];
const MINUTES = ["минута", "минуты", "минут"];

const toggleBlocks = (blocks) => {
  if (!blocks.length) return;

  blocks.forEach((block) => {
    const toggleTitle = block.querySelector(".toggle-title");
    const toggleContent = block.querySelector(".toggle-content");

    if (!toggleTitle || !toggleContent) return;

    toggleTitle.addEventListener("click", () => {
      if (block.classList.contains("open")) {
        block.classList.remove("open");
      } else {
        block.classList.add("open");
      }
    });
  });
};

const createTimerBlock = (value, textArray) => {
    const blockEl = document.createElement('div');
    blockEl.classList.add('timer-block');

    const prettyNumber = value >= 100 ? value : ('0' + value).slice(-2);
    const valueEl = document.createElement('div');
    valueEl.classList.add('timer-value');
    valueEl.innerText = `${prettyNumber}`;
    blockEl.insertAdjacentElement('beforeend', valueEl);

    const textEl = document.createElement('p');
    textEl.classList.add('timer-text');
    textEl.innerText = `${enumerate(value, textArray)}`;
    blockEl.insertAdjacentElement('beforeend', textEl);

    return blockEl;
}

const enumerate = (num, dec) => {
  if (num > 100) num = num % 100;
  if (num <= 20 && num >= 10) return dec[2];
  if (num > 20) num = num % 10;
  return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2];
};

const timer = () => {
  // Set the date we're counting down to
  const countDownDate = new Date("Jul 21, 2025 18:00:00").getTime();
  const timerBlock = document.querySelector('#timer');

  const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // const daysElement = document.createElement('div');
    // daysElement.classList.add('timer-block');

    // const daysValueElement = document.createElement('div');
    // daysValueElement.classList.add('timer-value');
    // daysValueElement.innerText = `${days}`;
    // daysElement.insertAdjacentElement('beforeend', daysValueElement);

    // const daysTextElement = document.createElement('p');
    // daysTextElement.classList.add('timer-text');
    // daysTextElement.innerText = `${enumerate(days, DAYS)}`;
    // daysElement.insertAdjacentElement('beforeend', daysTextElement);

    const daysElement = createTimerBlock(days, DAYS);
    const hoursElement = createTimerBlock(hours, HOURS);
    const minutesElement = createTimerBlock(minutes, MINUTES);

    const timerInnerBlock = document.createElement('div');
    timerInnerBlock.classList.add('timer__inner-block');
    timerInnerBlock.insertAdjacentElement('beforeend', daysElement);
    timerInnerBlock.insertAdjacentElement('beforeend', hoursElement);
    timerInnerBlock.insertAdjacentElement('beforeend', minutesElement);

    timerBlock.innerText = '';
    timerBlock.appendChild(timerInnerBlock);


    if (distance < 0) {
      clearInterval(x);
      const errorBlock = document.createElement('p');
      errorBlock.innerText = "Событие уже началось или прошло =(";
      timerBlock.appendChild(timerInnerBlock);
    }
  }, 1000);
};

document.addEventListener("DOMContentLoaded", (event) => {
const outterContainer = document.querySelector('.outter-container');
  const toggledBlocks = document.querySelectorAll(".toggle-block");

  outterContainer.classList.add('loaded');

  toggleBlocks(toggledBlocks);
  timer();
});
