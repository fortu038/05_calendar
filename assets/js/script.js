var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// Start and end times, lik other times used in this project, are in 24-hour time
var start_of_work_day = 9;
var end_of_work_day = 24;

// An array of objects. Stores two pieces, the title of event being planned and its time
var scheduled_items = [
    {
        event: "Painting",
        time: 19
    },
    {
        event: "Dancing",
        time: 16
    }
];

function init() {
    var holder = JSON.parse(localStorage.getItem("scheduled_items"));

    if(holder === null) {
        scheduled_items = [];
    } else {
        scheduled_items = holder;
    }
}


var container = $(".container");

for(var i = start_of_work_day; i < end_of_work_day; i++) {
    // console.log(i);
    var li_tag = $("<li>");

    li_tag.text(i);

    li_tag.addClass("list-group-item");

    var h3_tag = $("<h3>");
    h3_tag.text("testing");
    li_tag.append(h3_tag)

    var now_hour = moment().format("HH");
    // console.log(now_hour);
    if(i < now_hour) {
        li_tag.addClass("list-group-item-dark");
    } else if (i == now_hour) {
        li_tag.addClass("list-group-item-danger")
    }

    container.append(li_tag);
    // console.log(container);
}

function check_if_in_scheduled(time) {
    for(var i = 0; i < scheduled_items.length; i++) {

    }
}

init();