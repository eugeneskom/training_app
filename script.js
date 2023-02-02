var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var inputSubmit = document.querySelector(".input-submit");
var totalWrapperPushups = document.querySelector(".total-number.pushups");
var totalWrapperSquats = document.querySelector(".total-number.squats");
var resetBtn = document.querySelector(".reset-btn");
var undoBtn = document.querySelector(".undo-btn");
var submitGoalBtn = document.querySelector(".submit-goal-btn");
var inputNumber = document.querySelector(".input-number");
var selectValue = document.querySelector(".select-exercises");
var goalList = document.querySelector(".goal-list");
function saveToLocal(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}
function getFromLocal(name) {
    return JSON.parse(localStorage.getItem(name));
}
function showTotal() {
    if (getFromLocal("numberDate")) {
        var savedData = getFromLocal("numberDate");
        var totalPushups = savedData.filter(function (item) { return item.excercise == "pushups"; }).reduce(function (a, b) { return a + b.number; }, 0);
        var totalSquats = savedData.filter(function (item) { return item.excercise == "squats"; }).reduce(function (a, b) { return a + b.number; }, 0);
        totalWrapperPushups.textContent = String(totalPushups);
        totalWrapperSquats.textContent = String(totalSquats);
    }
    else {
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
    var inputNumber = document.querySelector(".input-number");
    var selectValue = document.querySelector(".select-exercises").value;
    var objectDate = new Date();
    var day = objectDate.getDate();
    var month = objectDate.getMonth();
    var year = objectDate.getFullYear();
    var fullDate = day + "/" + month + "/" + year;
    if (getFromLocal("numberDate")) {
        var oldData = getFromLocal("numberDate");
        saveToLocal("numberDate", __spreadArray(__spreadArray([], oldData, true), [{ date: fullDate, number: +inputNumber.value, excercise: selectValue }], false));
    }
    else {
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
    var oldData = getFromLocal("numberDate");
    var lastExcercise = oldData.pop();
    saveToLocal("numberDate", oldData);
    selectValue.value = lastExcercise.excercise;
    inputNumber.value = String(lastExcercise.number);
    showTotal();
}
undoBtn.addEventListener("click", undo);
function saveGoalLocal(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}
function getGoalLocal(name) {
    return JSON.parse(localStorage.getItem(name));
}
function Goal(number, excercise, date) {
    this.number = number;
    this.excercise = excercise;
    this.date = date;
    var item = document.createElement('li');
    item.classList.add('goal-item');
    var innerHtml = "\n  <p>Excercise: <span class=\"excercise-goal-wrapper\">".concat(number, "</span></p>\n  <p>Quantity: <span class=\"quantity-goal-wrapper\">").concat(excercise, "</span></p>\n  <p>Due date: <span class=\"quantity-goal-due\">").concat(date, "</span></p>\n  ");
    item.insertAdjacentHTML('afterbegin', innerHtml);
    return item;
}
function setGoal(e) {
    e.preventDefault();
    var inputNumberGoal = document.querySelector(".goal-number-input").value;
    var selectValueGoal = document.querySelector(".select-exercises-goal").value;
    var goalDueDate = document.querySelector(".goal-due-date").value;
    var goal = { quantity: +inputNumberGoal, excercise: selectValueGoal, date: goalDueDate };
    var savedGoal = new Goal(inputNumberGoal, selectValueGoal, goalDueDate);
    goalList.appendChild(savedGoal);
    var oldGoals = getGoalLocal("goal");
    saveGoalLocal("goal", __spreadArray(__spreadArray([], oldGoals, true), [goal], false));
}
submitGoalBtn.addEventListener("click", setGoal);
function checkGoalCompletion(data) {
    console.log(data);
    if (!getGoalLocal("goal"))
        return;
    var goal = getGoalLocal("goal");
    var matched = goal.filter(function (training) { return training.excercise == data.excercise; });
}
function showGoal() {
    if (getGoalLocal("goal")) {
        var savedData = getGoalLocal("goal");
        savedData.map(function (item) {
            var savedGoal = new Goal(item.excercise, item.quantity, item.date);
            goalList.appendChild(savedGoal);
        });
    }
}
showGoal();
//# sourceMappingURL=script.js.map