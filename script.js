const CardsInfo = [];
// Load Previous Data
window.addEventListener("load", loadFromMemory);
function loadFromMemory() {
  let data = JSON.parse(localStorage.getItem("memory"));
  for (i = 0; i < data.length; i++) {
    Addrow(data[i]);
  }
  return data;
}

// Show Last Data Entered In Last Cards Section
function showLastcards() {
  document.getElementById("frontname").innerHTML =
    CardsInfo[CardsInfo.length - 1].cardfront;
  document.getElementById("backname").innerHTML =
    CardsInfo[CardsInfo.length - 1].cardback;
}

// Check Duplicate Data Entered
function checkDuplicate(Card) {
  for (let i = 0; i < CardsInfo.length; i++) {
    if (
      Card.cardfront == CardsInfo[i].cardfront ||
      Card.cardback == CardsInfo[i].cardback
    ) {
      return true;
    }
  }
  return false;
}

// Check Empty Date Entered
function isempty(Card) {
  if (
    Card.cardfront == "" ||
    Card.cardback == "" ||
    Card.cardfront == " " ||
    Card.cardback == " "
  ) {
    return true;
  }
  return false;
}

// Add Input Data
function AddFromInput() {
  let Cardinfo = {
    cardfront: document.getElementById("inputfront").value,
    cardback: document.getElementById("inputback").value,
  };

  Addrow(Cardinfo);
}

// Add Data To Table And Memory
function Addrow(data) {
  if (checkDuplicate(data)) {
    alert("This data is duplicate");
    return;
  }

  if (isempty(data)) {
    alert("Please Input Anything");
    return;
  }

  CardsInfo.push(data); //Add input Data to Array
  showLastcards();
  localStorage.setItem("memory", JSON.stringify(CardsInfo)); // Save Data To Local Srorage

  //Create Table
  const list = document.querySelector("#mytable tbody");
  let Row = list.insertRow();
  // Action Div
  let ActionCell = Row.insertCell();
  ActionDiv = document.createElement("div");
  ActionCell.appendChild(ActionDiv);
  ActionDiv.className = "Action-Div";
  //
  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash-can";
  ActionDiv.appendChild(deleteIcon);
  //
  let editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen-to-square";
  ActionDiv.appendChild(editIcon);
  //
  let cancelIcon = document.createElement("i");
  cancelIcon.className = "fa-regular fa-rectangle-xmark";
  ActionDiv.appendChild(cancelIcon);
  //
  let okIcon = document.createElement("i");
  okIcon.className = "fa-regular fa-square-check";
  ActionDiv.appendChild(okIcon);
  //
  let tdId = document.createElement("td");
  let idText = document.createTextNode(CardsInfo.length);
  tdId.appendChild(idText);
  Row.appendChild(tdId);
  //

  // Front info in table
  paragraphFront = document.createElement("p");
  let RowFront = Row.insertCell();
  let TextFront = document.createTextNode(
    CardsInfo[CardsInfo.length - 1].cardfront
  );
  FrontDiv = document.createElement("div");
  RowFront.appendChild(FrontDiv);
  FrontDiv.className = "FrontDiv";
  paragraphFront.appendChild(TextFront);
  FrontDiv.appendChild(paragraphFront);
  paragraphFront.className = "Front-Paragraph";
  RowFront.className = "Front-class";
  //
  editFrontDiv = document.createElement("div");
  RowFront.appendChild(editFrontDiv);
  editFrontDiv.className = "edit-div";

  inputFront = document.createElement("input");
  editFrontDiv.appendChild(inputFront);
  inputFront.value = CardsInfo[CardsInfo.length - 1].cardfront;
  inputFront.className = "input-Front";
  inputFront.setAttribute('id', `${Math.random()}fontInput`);


  iconsFrontDiv = document.createElement("div");
  editFrontDiv.appendChild(iconsFrontDiv);
  iconsFrontDiv.className = "icons-Front";

  // Back info in table
  let RowBack = Row.insertCell();
  let TextBack = document.createTextNode(
    CardsInfo[CardsInfo.length - 1].cardback
  );
  RowBack.appendChild(TextBack);
  RowBack.className = "Back-class";
  paragraphBack = document.createElement("p");
  BackDiv = document.createElement("div");
  RowBack.appendChild(BackDiv);
  BackDiv.className = "BackDiv";
  paragraphBack.appendChild(TextBack);
  BackDiv.appendChild(paragraphBack);
  paragraphBack.className = "Back-Paragraph";
  RowBack.className = "Back-class";
  //
  editBackDiv = document.createElement("div");
  RowBack.appendChild(editBackDiv);
  editBackDiv.className = "edit-div";
  //
  inputBack = document.createElement("input");
  editBackDiv.appendChild(inputBack);
  inputBack.value = CardsInfo[CardsInfo.length - 1].cardback;
  inputBack.className = "input-Back";
  inputBack.setAttribute('id', `${Math.random()}Input`);

  //
  iconsBackDiv = document.createElement("div");
  editBackDiv.appendChild(iconsBackDiv);
  iconsBackDiv.className = "icons-Back";
  //
  clearText();
}

// Clear Input
function clearText() {
  document.getElementById("inputfront").value = "";
  document.getElementById("inputback").value = "";
}

// Change Classes Of Table and  Card For Styles
function selectMode(mode) {
  const tebleEl = document.querySelector("#mytable");
  const mccEl = document.querySelector(".main-card-container");
  // change table mode
  tebleEl.classList.remove("mode-all");
  tebleEl.classList.remove("mode-front");
  tebleEl.classList.remove("mode-back");
  tebleEl.classList.add("mode-" + mode);
  // change card style
  mccEl.classList.remove("mode-all");
  mccEl.classList.remove("mode-front");
  mccEl.classList.remove("mode-back");
  mccEl.classList.add("mode-" + mode);
}

// Delete Row Data
var deleteRow = document.querySelector("#mytable tbody");
deleteRow.addEventListener("click", (e) => {
  if ((e.target.className == "fa-solid fa-trash-can") == false) {
    return;
  }
  const row = e.target.closest("tr");
  const frontvalue = row.querySelector(".Front-class").innerText;

  for (i = 0; i < CardsInfo.length; i++) {
    if (frontvalue == CardsInfo[i].cardfront) {
      CardsInfo.splice(i, 1); //Delete Selected Row Data From Array
      localStorage.setItem("memory", JSON.stringify(CardsInfo)); // Save New Data
      row.remove();
    }
  }
});

// Show Selected Data From Table In Main Cards
const tbody = document.querySelector("#mytable tbody");
tbody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  const back = row.querySelector(".Back-Paragraph");
  const front = row.querySelector(".Front-Paragraph");
  document.querySelector(".MainCard .card-front").innerText = front.innerText;
  document.querySelector(".MainCard .card-back").innerText = back.innerText;
});

const frontCardEl = document.querySelector(".MainCard .card-front");
frontCardEl.addEventListener("click", () => {
  const mode = document.querySelector(".main-card-container.mode-all");
  // if (mode != 'mode-all') {
  const mccEl = document.querySelector(".main-card-container");
  // change card style
  mccEl.classList.remove("mode-all");
  mccEl.classList.remove("mode-front");
  mccEl.classList.add("mode-back");
  // }
});

const backCardEl = document.querySelector(".MainCard .card-back");
backCardEl.addEventListener("click", () => {
  const mccEl = document.querySelector(".main-card-container");
  // change card style
  mccEl.classList.remove("mode-all");
  mccEl.classList.remove("mode-back");
  mccEl.classList.add("mode-front");
});

tbody.addEventListener("click", (e) => {
  // e.target.closest(".input-Front").display="revert";

  const selectInputFront = e.target.closest("tr").querySelector(".input-Front");
  const selectInputBack = e.target.closest("tr").querySelector(".input-Back");
  const selectOkIcon = e.target.closest("tr").querySelector(".fa-square-check");
  const selectCancelIcon = e.target
    .closest("tr")
    .querySelector(".fa-rectangle-xmark");
  const selectDeleteIcon = e.target
    .closest("tr")
    .querySelector(" .fa-trash-can");
  const selectIconEdit = e.target
    .closest("tr")
    .querySelector(".fa-pen-to-square");
  const selectFrontText = e.target
    .closest("tr")
    .querySelector(" .Front-Paragraph");
  const selectBackText = e.target
    .closest("tr")
    .querySelector(" .Back-Paragraph");

  if (e.target.className == "fa-solid fa-pen-to-square") {
    selectInputFront.classList.add("edit-mode-on");
    selectInputBack.classList.add("edit-mode-on");
    e.target.classList.add("edit-mode-off");
    selectOkIcon.classList.add("edit-mode-on");
    selectCancelIcon.classList.add("edit-mode-on");
    selectFrontText.classList.add("edit-mode-off");
    selectBackText.classList.add("edit-mode-off");
    selectDeleteIcon.classList.add("edit-mode-off");
  }
  if (e.target.className == "fa-regular fa-square-check edit-mode-on") {
    for (i = 0; i < CardsInfo.length; i++) {
      const row = e.target.closest("tr");
      const frontvalue = row.querySelector(".Front-Paragraph").innerText;
      if (frontvalue == CardsInfo[i].cardfront) {
        let NewCardinfo = {
          cardfront: row.querySelector(".input-Front").value,
          cardback: row.querySelector(".input-Back").value,
        };
        CardsInfo[i].cardfront = NewCardinfo.cardfront;
        CardsInfo[i].cardback = NewCardinfo.cardback;
        localStorage.setItem("memory", JSON.stringify(CardsInfo)); // Save New Data
      }
      
    }
    selectInputFront.classList.remove("edit-mode-on");
    selectInputBack.classList.remove("edit-mode-on");
    selectIconEdit.classList.remove("edit-mode-off");
    selectOkIcon.classList.remove("edit-mode-on");
    selectCancelIcon.classList.remove("edit-mode-on");
    selectFrontText.classList.remove("edit-mode-off");
    selectBackText.classList.remove("edit-mode-off");
    selectDeleteIcon.classList.remove("edit-mode-off");
    reload ();
  }

  
  if (e.target.className == "fa-regular fa-rectangle-xmark edit-mode-on") {
    selectInputFront.classList.remove("edit-mode-on");
    selectInputBack.classList.remove("edit-mode-on");
    selectIconEdit.classList.remove("edit-mode-off");
    selectOkIcon.classList.remove("edit-mode-on");
    selectCancelIcon.classList.remove("edit-mode-on");
    selectFrontText.classList.remove("edit-mode-off");
    selectBackText.classList.remove("edit-mode-off");
    selectDeleteIcon.classList.remove("edit-mode-off");
    
  }
});

function reload (){
  location.reload();
}