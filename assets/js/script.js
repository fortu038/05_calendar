var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// Start and end times, lik other times used in this project, are in 24-hour time
var start_of_work_day = 9;
var end_of_work_day = 24;

// An array of objects. Stores two pieces, the title of event being planned and its time
var scheduled_items = [
    // {
    //     event: "Painting",
    //     time: 20
    // },
    // {
    //     event: "Dancing",
    //     time: 21
    // }
];

// Helper function that initializes scheduled_items using local storage
function init() {
    var holder = JSON.parse(localStorage.getItem("scheduled_items"));

    if(holder === null) {
        scheduled_items = [];
    } else {
        scheduled_items = holder;
    }
}

// Helper function that stores scheduled_items in local storage
function save() {
    localStorage.setItem("scheduled_items", JSON.stringify(scheduled_items));
}

// Helper function that checks to see a given time is occupied according scheduled_items, returning the index it is found at in
// scheduled times if it is present or false if it is not found
function check_if_scheduled(time_to_check) {
    for(var i = 0; i < scheduled_items.length; i++) {
        var current_obj = scheduled_items[i];
        if(time_to_check == current_obj.time) {
            return i;
        }
    }

    return false;
}

// Helper function that rebuilds the schedule when called
function build_schedule_page() {
    for(var i = 0; i < scheduled_items.length; i++){
        var curr_question_obj = scheduled_items[i];

        var holder = $(`#label_num_${curr_question_obj.time}`);
        holder.empty();
        holder.append(curr_question_obj.event);
    }

    return;
}


var container = $(".container");
for(let i = start_of_work_day; i < end_of_work_day; i++) {
    // console.log(i);
    var li_tag = $("<li>");

    li_tag.text(i);

    li_tag.addClass("list-group-item");

    // var h3_tag = $("<h3>");
    // h3_tag.text("testing");
    // li_tag.append(h3_tag)

    var text_section = $(`<form id="form_num_${i}"> <div class="form-group">
    <label for="input_num_${i}" id="label_num_${i}">  </label>
    <textarea class="form-control" id="input_num_${i}" rows="1"></textarea>
    <button type="submit" class="btn btn-primary mb-2" id="button_num_${i}">Save Changes</button>
    </div> </form>`);
    // var text_section = $(`<form id="form_num_${i}">
    // <input id="input_num_${i}"></input>
    // </form>`);
    li_tag.append(text_section);

    // var button = $(`<button type="submit" class="btn btn-primary mb-2" id="button_num_${i}">Save Changes</button>`);
    // li_tag.append(button);

    $(`#button_num_${i}`).on("submit", function(click) {
        click.preventDefault();
        click.stopImmediatePropagation();
        click.isDefaultPrevented();
        console.log("hit");
        var index = check_if_scheduled(i);
        // console.log($(`input[name="input_num_${i}"]`));
        console.log(`i is ${i}`);
        console.log($(`input[name="input_num_${i}"]`).val());
        if(index === false) {
            console.log("in false");
            scheduled_items.push(
                {
                    event: $(`input[name="input_num_${i}"]`).val(),
                    time: i
                }
            )
            build_schedule_page();
        } else {
            console.log("in num");
            scheduled_items[index].event = $(`input[name="input_num_${i}"]`).val();
            build_schedule_page();
        }
        console.log(scheduled_items);
    }, true);


    var now_hour = moment().format("HH");
    // console.log(now_hour);
    if (check_if_scheduled(i) !== false) {
        li_tag.addClass("list-group-item-success");
    }
    
    if(i < now_hour) {
        li_tag.addClass("list-group-item-dark");
    } else if (i == now_hour) {
        li_tag.addClass("list-group-item-danger");
    }

    container.append(li_tag);
    // console.log(container);
}

save();

init();

build_schedule_page();