const inputSubmit = document.querySelector('.input-submit')
const totalWrapperPushups = document.querySelector('.total-number.pushups')
const totalWrapperSquats = document.querySelector('.total-number.squats')
const resetBtn = document.querySelector('.reset-btn')

function saveToLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function getFromLocal(name) {
  return JSON.parse(localStorage.getItem(name))
}

// I need to include the case when localStorage is empty and the case when I reset the app
// function buildExcersiceList() {
//   const excerciseList = document.querySelector('.excercises-result-list');
//   const excersices = document.querySelectorAll('.select-exercises option');
//   const savedData = getFromLocal('numberDate');
//   excerciseList.innerHTML = '';
//   [...excersices].map(excercise => {
//     const total = savedData.filter(item => item.exercise == excercise.value).reduce((a, b) => a + b.number, 0)
//     excerciseList.insertAdjacentHTML('beforeend', `<li>Total ${excercise.textContent}: ${total}</li>`)
//   })
// }

function showTotal() {
  if (getFromLocal('numberDate')) {
    const savedData = getFromLocal('numberDate');
    const totalPushups = savedData.filter(item => item.exercise == 'pushups').reduce((a, b) => a + b.number, 0)
    const totalSquats = savedData.filter(item => item.exercise == 'squats').reduce((a, b) => a + b.number, 0)
    totalWrapperPushups.textContent = totalPushups;
    totalWrapperSquats.textContent = totalSquats;
  } else {
    totalWrapperPushups.textContent = 0;
    totalWrapperSquats.textContent = 0;
  }
}

showTotal()

function reset() {
  localStorage.clear()
  showTotal()
}

resetBtn.addEventListener('click', reset)

function saveNumberAndDate(e) {
  e.preventDefault()
  const inputNumber = document.querySelector('.input-number')
  const selectValue = document.querySelector('.select-exercises').value;
  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth();
  const year = objectDate.getFullYear();
  const fullDate = day + "/" + month + "/" + year;
  if (getFromLocal('numberDate')) {
    const oldData = getFromLocal('numberDate');
    saveToLocal('numberDate', [...oldData, { date: fullDate, number: +inputNumber.value, exercise: selectValue }])
  } else {
    saveToLocal('numberDate', [{ date: fullDate, number: +inputNumber.value, exercise: selectValue }])
  }
  inputNumber.value = "";
  showTotal()
  // buildExcersiceList()
}

inputSubmit.addEventListener('click', saveNumberAndDate)

// buildExcersiceList()
let oldArray = getFromLocal('numberDate');
for(let i = 0 ; i < oldArray.length; i++){
  oldArray[i].excercise = oldArray[i]['exercise']
  delete oldArray[i].exercise;
}
oldArray.pop
console.log('oldArray',oldArray);
saveToLocal('numberDate', oldArray)