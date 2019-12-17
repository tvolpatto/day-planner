var container = $(".container");

function renderTimeBlocks() {
    for(var i = 9; i < 18; i++) {
        var timeBLock = $("<div>");
        timeBLock.addClass("row time-block");
        container.append(timeBLock);
        
        var colHour = $("<div>");
        colHour.addClass("hour col-1");
        colHour.text(i);

        var colPlanner = $("<div>");
        colPlanner.addClass("col-10");
        var textArea = $("<textarea>");
        colPlanner.append(textArea);

        var colSave = $("<div>");
        colSave.addClass("col-1");
        var btnSave = $("<button>Save</button>");
        btnSave.addClass("saveBtn");
        colSave.append(btnSave);
        colSave.append(colSave);

        timeBLock.append(colHour, colPlanner, colSave)
    }

}



$(document).ready(function(){
    renderTimeBlocks();
    
    
});