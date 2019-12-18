var container = $(".container");
var schedule;
var firstHour = 9;

function renderTimeBlocks() {
    for (var i = 0; i < 9; i++) {
        var hour = i + firstHour;

        var timeBLock = $("<div>").addClass("row time-block");

        container.append(timeBLock);

        var colHour = createHourCol(hour);

        var colPlanner = createPlannerCol(hour, schedule[i]);

        var colSave = createSaveCol(hour);

        timeBLock.append(colHour, colPlanner, colSave);
    }
}

function createHourCol(hour) {
    return $("<div>").addClass("hour col-1")
        .text(hour);
}

function createPlannerCol(hour, text) {
    var textArea = $("<textarea>");
    textArea.attr("id", `text-${hour}`);
    if (text != null) {
        textArea.val(text);
    }

    return $("<div>").addClass("col-10")
        .append(textArea);
}

function createSaveCol(hour) {
    var btnSave = $("<button>Save</button>");
    btnSave.addClass("saveBtn");
    btnSave.attr("data-time", hour);  

    return $("<div>").addClass("col-1").append(btnSave);;
}

function save() {
    var hour = $(this).attr("data-time");
    var text = $(`#text-${hour}`).val();
    var index = parseInt(hour) - firstHour;
    schedule[index] = text;

    localStorage.setItem("schedule", JSON.stringify(schedule));
}

function load() {
    schedule = localStorage.getItem("schedule") != null
        ? JSON.parse(localStorage.getItem("schedule")) : new Array(9);

}

$(document).ready(function () {
    load();
    renderTimeBlocks();
    container.on("click", "button", save);

});