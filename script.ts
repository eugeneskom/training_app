const inputSubmit = document.querySelector<HTMLInputElement>(".input-submit");
const totalWrapperPushups = document.querySelector(".total-number.pushups");
const totalWrapperSquats = document.querySelector(".total-number.squats");
const resetBtn = document.querySelector(".reset-btn");
const undoBtn = document.querySelector<HTMLButtonElement>(".undo-btn");
const submitGoalBtn = document.querySelector<HTMLButtonElement>(".submit-goal-btn");
const inputNumber = document.querySelector<HTMLInputElement>(".input-number");
const selectValue = document.querySelector<HTMLSelectElement>(".select-exercises");
const goalList = document.querySelector(".goal-list");

interface training {
  date: string;
  number: number;
  excercise: string;
}

function saveToLocal(name: string, data: training[]) {
  localStorage.setItem(name, JSON.stringify(data));
}

function getFromLocal(name: string): training[] {
  return JSON.parse(localStorage.getItem(name));
}

function showTotal() {
  if (getFromLocal("numberDate")) {
    const savedData = getFromLocal("numberDate");
    const totalPushups = savedData.filter((item) => item.excercise == "pushups").reduce((a, b) => a + b.number, 0);
    const totalSquats = savedData.filter((item) => item.excercise == "squats").reduce((a, b) => a + b.number, 0);
    totalWrapperPushups.textContent = String(totalPushups);
    totalWrapperSquats.textContent = String(totalSquats);
  } else {
    totalWrapperPushups.textContent = "0";
    totalWrapperSquats.textContent = "0";
  }
}

showTotal();

function reset() {
  localStorage.clear();
  showTotal();
}

resetBtn.addEventListener("click", reset);

function saveNumberAndDate(e) {
  e.preventDefault();
  const inputNumber = document.querySelector<HTMLInputElement>(".input-number");
  const selectValue = document.querySelector<HTMLSelectElement>(".select-exercises").value;
  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  const fullDate = day + "/" + month + "/" + year;
  if (getFromLocal("numberDate")) {
    const oldData = getFromLocal("numberDate");
    saveToLocal("numberDate", [...oldData, { date: fullDate, number: +inputNumber.value, excercise: selectValue }]);
  } else {
    saveToLocal("numberDate", [{ date: fullDate, number: +inputNumber.value, excercise: selectValue }]);
  }
  inputNumber.value = "";
  showTotal();
  checkGoalCompletion({ date: fullDate, number: +inputNumber.value, excercise: selectValue });
}

inputSubmit.addEventListener("click", saveNumberAndDate);

// buildExcersiceList()
function undo(e) {
  e.preventDefault();
  const oldData = getFromLocal("numberDate");
  const lastExcercise = oldData.pop();
  saveToLocal("numberDate", oldData);
  selectValue.value = lastExcercise.excercise;
  inputNumber.value = String(lastExcercise.number);
  showTotal();
}

undoBtn.addEventListener("click", undo);

interface goal {
  quantity: number;
  excercise: string;
  date: string;
}

function saveGoalLocal(name: string, data: goal[]) {
  localStorage.setItem(name, JSON.stringify(data));
}

function getGoalLocal(name: string): goal[] {
  return JSON.parse(localStorage.getItem(name));
}

function Goal(number:string,excercise:string,date:string):HTMLLIElement{
  this.number = number;
  this.excercise = excercise;
  this.date = date;
  
  const item = document.createElement('li');
  item.classList.add('goal-item');
  const innerHtml = `
  <p>Excercise: <span class="excercise-goal-wrapper">${number}</span></p>
  <p>Quantity: <span class="quantity-goal-wrapper">${excercise}</span></p>
  <p>Due date: <span class="quantity-goal-due">${date}</span></p>
  `
  item.insertAdjacentHTML('afterbegin', innerHtml)
  return item;
}

function setGoal(e) {
  e.preventDefault();
  const inputNumberGoal = document.querySelector<HTMLInputElement>(".goal-number-input").value;
  const selectValueGoal = document.querySelector<HTMLSelectElement>(".select-exercises-goal").value;
  const goalDueDate = document.querySelector<HTMLInputElement>(".goal-due-date").value;
  const goal = { quantity: +inputNumberGoal, excercise: selectValueGoal, date: goalDueDate };
  const savedGoal = new (Goal as any)(inputNumberGoal,selectValueGoal,goalDueDate)
  goalList.appendChild(savedGoal)
  const oldGoals = getGoalLocal("goal")
  saveGoalLocal("goal", [...oldGoals, goal]);
}

submitGoalBtn.addEventListener("click", setGoal);

function checkGoalCompletion(data: training) {
  console.log(data);
  if (!getGoalLocal("goal")) return;
  const goal = getGoalLocal("goal");
  const matched = goal.filter((training) => training.excercise == data.excercise);
}

function showGoal() {
  if (getGoalLocal("goal")) {
    const savedData = getGoalLocal("goal");
    savedData.map(item => {
    const savedGoal = new (Goal as any)(item.excercise,item.quantity,item.date)
    goalList.appendChild(savedGoal)
    })
  }
}

showGoal()