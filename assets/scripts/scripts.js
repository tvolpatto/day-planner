var container = $(".container");
var schedule;
var firstHour = 9;
var currentDayElm = $("#currentDay");

function renderTimeBlocks() {
    for (var i = 0; i < 9; i++) {
        var hour = i + firstHour;

        var timeBLock = $("<div>").addClass("row time-block");
        timeBLock.attr("id", `block-${hour}`);

        container.append(timeBLock);

        var colHour = createHourCol(hour);

        var colPlanner = createPlannerCol(hour, schedule[i]);

        var colSave = createSaveCol(hour);

        timeBLock.append(colHour, colPlanner, colSave);
    }
}

function createHourCol(hour) {
    return $("<div>").addClass("hour col-1")
    .text(formatHour(hour));
}

function formatHour(hour) {
    return moment(hour, "H").format('h a').toUpperCase();
}

function createPlannerCol(hour, text) {
    var textArea = $("<textarea>");
    textArea.addClass("w-100 h-100");
    textArea.attr("id", `text-${hour}`);
    setTimePeriods(textArea, hour);
    if (text != null) {
        textArea.val(text);
    }

    return $("<div>").addClass("col-10 px-0")
        .append(textArea);
}

function createSaveCol(hour) {
    var btnSave = $(`<button><i class="fas fa-save"></i></button>`);
    btnSave.addClass("saveBtn w-100 h-100");
    btnSave.attr("data-time", hour);  

    return $("<div>").addClass("col-1 px-0").append(btnSave);;
}

function save() {
    var hour = $(this).attr("data-time");
    var text = $(`#text-${hour}`).val();
    var index = parseInt(hour) - firstHour;
    schedule[index] = text;
    
    localStorage.setItem("schedule", JSON.stringify(schedule));
    saveEffects(`#block-${hour}`);
}

function load() {
    schedule = localStorage.getItem("schedule") != null
        ? JSON.parse(localStorage.getItem("schedule")) : new Array(9);

}

function setTimePeriods(el, selectedHour) {
    var now = moment().hour();
   
    if(selectedHour < now) {
        el.addClass("past");
    } else if(selectedHour === now) {
        el.addClass("present");
    } else {
        el.addClass("future");
    }
}

function saveEffects(block){
    $(block).addClass("saving");
    $(block).animate({ "border-width": "5px" } );
    $(block).animate({ "border-width": "0px" }, 500, ()=>{
        $(block).removeClass("saving");
    });   
}

function showCurrentDay() {
    currentDayElm.text(moment().format('dddd, MMMM DD') );
}

$(document).ready(function () {
    showCurrentDay()
    load();
    renderTimeBlocks();
    container.on("click", "button", save);

});