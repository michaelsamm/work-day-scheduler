// 9a - 5p
// Timeblocks
// Each timeblock contains input field and save button
// Save adds to local storage
// Current day is displayed at top of calendar
// Timeblocks are color coded



// Set today's date
var setDate = function() {
    // Add current date to the header
    var today = moment().format("dddd, MMMM Do YYYY h:mm a");
    // Add date to element
    $("#currentDay").text(today);
}


// Create Time Blocks
var timeBlocks = function() {
    // Desired first hour
    var startTime = 9;
    // For loop to create blocks for a 9 hour day
    for (i = 0; i < 9; i++) {
        // Set time for each block and format time
        var time = moment().startOf('day').add(startTime + i, "hours").format("h:mm A");
        // Create div to hold block elements with an id matching the hour
        var timeBlock = $("<div>")
            .addClass("time-block row")
            .attr("id", startTime + i);
        // Create time label for block
        var timeEl = $("<div>")
            .addClass("hour col-2 pt-2")
            .text(time);
        // Create schedule entry area for block
        var scheduleEl = $("<textarea>")
            .addClass("description col-8"); 
        // Create save button for block
        var saveEl = $("<button>")
            .addClass("saveBtn col-2");
        // Create save icon for save button
        var saveIcon = $("<i>")
            .addClass("fas fa-save")
        
        // Add elements to the UI
        saveEl.append(saveIcon);
        timeBlock.append(timeEl, scheduleEl, saveEl);
        $(".container").append(timeBlock);
    }
}

// Save schedule to local storage
var saveSchedule = function() {
    $(".saveBtn").on("click", function() {
        // Grab values from description
        var text = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");

        // Save to localStorage
        localStorage.setItem(time, text);
    })
}

// Load schedule from local storage
var loadSchedule = function() {
    for (i = 0; i < 9; i++) {
        var timeId = i + 9;
        var plans = localStorage.getItem(timeId);
        $("#" + timeId).children(".description").val(plans);
    }
}

// Set colors for each block
var timeColors = function() {
    // Identify the current hour
    var currentHour = moment().format("H");
    
    // Loop over all time-blocks to assign colors
    $(".time-block").each(function() {
        var $block = $(this);
        // Convert each block id into a number for comparison
        var blockHour = parseInt($block.attr("id"));

        if (blockHour < currentHour) {
            $block.addClass("past").removeClass("present future")
        }
        else if (blockHour == currentHour) {
            $block.addClass("present").removeClass("past future")
        }
        else if (blockHour > currentHour) {
            $block.addClass("future").removeClass("past present")
        }
    })
}


// Callbacks
setDate();
timeBlocks();
saveSchedule();
loadSchedule();
timeColors();
setInterval(timeColors, 1000);
setInterval(setDate, 60000);