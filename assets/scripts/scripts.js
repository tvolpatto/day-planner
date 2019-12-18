var container = $(".container");
var schedule;
var firstHour = 9;

function renderTimeBlocks() {
    for(var i = 0; i < 9; i++) {
        var hour = i + firstHour;
        var timeBLock = $("<div>");
        timeBLock.addClass("row time-block");
        container.append(timeBLock);
        
        var colHour = $("<div>");
        colHour.addClass("hour col-1");
        colHour.text(hour);

        var colPlanner = $("<div>");
        colPlanner.addClass("col-10");
        var textArea = $("<textarea>");
        colPlanner.append(textArea);
        textArea.attr("id", `text-${hour}`);
        if (schedule[i] != null){
            textArea.val(schedule[i]);
        }
    

        var colSave = $("<div>");
        colSave.addClass("col-1");
        var btnSave = $("<button>Save</button>");
        btnSave.addClass("saveBtn");
        btnSave.attr("data-time", hour);
        colSave.append(btnSave);


        timeBLock.append(colHour, colPlanner, colSave);
    }

}

function save() {
    var hour = $(this).attr("data-time");
    var text = $(`#text-${hour}`).val();
    var index = parseInt(hour) - firstHour;
    schedule[index] = text;

    localStorage.setItem("schedule", JSON.stringify(schedule));
}

function load() {
    schedule = localStorage.getItem("schedule")  != null
    ? JSON.parse(localStorage.getItem("schedule")) : new Array(9);

}



$(document).ready(function(){
    load();
    renderTimeBlocks();
    container.on("click","button", save);
    
});