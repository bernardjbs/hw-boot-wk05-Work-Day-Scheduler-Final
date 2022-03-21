// Moment JS.
const today = moment();
$("#currentDay").text(today.format("dddd, Do MMMM YYYY"))

// JQuery DOM elements.
let tableScheduleEl = $("#table-schedule");
let tbodyPLannerEl = $("#tbody-planner");

// Variables and constants.
let now = new Date();
let currentHour = new Date();
const setStartHour = 20;

// Comparing the current working hour to the current time at 1s interval
setInterval(checkTableHours, 1000);

// Populate the schedule table
populateTable();
checkTableHours();
renderSchedule();
// Function to go through the table and check if the hour is in the past, present or future  
function checkTableHours() {
    let tableEl = document.getElementById("table-schedule");
    const startingHour = new Date();
    startingHour.setHours(setStartHour, 0, 0)



    for (var i = 0, row; row = tableEl.rows[i]; i++) {
        let DynamicInputEl = tableEl.querySelector("#input-schedule" + i);
        // Iterate through rows
        // Access rows by "row" variable
        for (var j = 0, col; col = row.cells[j]; j++) {

            // Iterate through columns
            // Access columns by "col" variable
            let schHrStr = col.innerText;

            if (moment(schHrStr, "HH").isValid()) {

                Date.prototype.addHours = function (h) {
                    this.setHours(this.getHours() + h);
                    return this;
                }

                schHr = startingHour.addHours(1);

                if (schHr.getHours() == now.getHours()) {
                    DynamicInputEl.classList.add("present");
                }
                else if (schHr.getTime() < now.getTime()) {
                    DynamicInputEl.classList.add("past");
                    DynamicInputEl.disabled = true;
                }
                else {
                    DynamicInputEl.classList.add("future");
                }
            }
        }
    }
}

// Function to populate the schedule table(using bootstrap).
function populateTable() {
    const startingHour = new Date();
    startingHour.setHours(setStartHour, 0, 0)
    for (i = 0; i < 9; i++) {
        startingHour.setHours(startingHour.getHours() + 1);
        str = moment(startingHour).format("HH:mm");
        let plannerRow = $(`
            <tr class='planner-row'>
                <td class='col-md-2'>`
            + str + `
                </td>
                <td class='col-md-12' id='input-cell'>
                    <input type='text' data-schedule-id =` + i + ` id='input-schedule` + i + `' class='input-schedule-cl'/>
                </td>
                <td>
                    <button type='button' class='btn btn-primary saveBtn' onClick="saveSchedule()">
                        <i class='fas fa-save'></i>
                    </button>
                </td>
            </tr>`);
        tbodyPLannerEl.append(plannerRow);
    }
}

// Function to save events to schecule
function saveSchedule() {
    let schedules = [];
    let rowCount = $("#table-schedule >tbody >tr").length;
    for (i = 0; i < rowCount; i++) {
        let inputValue = $("#input-schedule" + i).val();
        if (inputValue === "") {
            schedules.push("0");
        }
        else (schedules.push(inputValue));
    }
    localStorage.setItem("schedules", JSON.stringify(schedules));
}

// Function to render the events on the schedule
function renderSchedule() {
    let schedules = JSON.parse(localStorage.getItem("schedules"));
    let rowCount = $("#table-schedule >tbody >tr").length;
    for (i = 0; i < rowCount; i++) {
        let input = document.querySelector("#input-schedule" + i)
        if (schedules[i] != "0") {
            input.value = schedules[i];
        }
    }
}


