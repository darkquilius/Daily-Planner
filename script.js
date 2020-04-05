// Sets date at top
const today = moment().format("MMM " + "D " + "YYYY");
const currentDay = document.getElementById("currentDay");
currentDay.innerHTML = today

// Used for color change based on time of day
const todayHour = parseInt(moment().format("H"));

// Used for timeslot text
const timeSlot = ["9 A.M.", "10 A.M", "11 A.M.", "12 P.M.", "1 P.M.", "2 P.M.", "3 P.M.", "4 P.M.", "5 P.M."]


// Used to set and get localStorage
var memoArray = [];
var saveBtn;
var inputArea;

// Functions for localStorage
function memoSave(placement, words) {
    var memoObject = {
        placement: placement,
        words: words
    };
    memoArray.push(memoObject);
    localStorage.setItem("allObjects", JSON.stringify(memoArray));
}

function memoRender() {
    memoArray = JSON.parse(localStorage.getItem("allObjects"));
    if (memoArray != null) {
        memoArray.forEach(eachObject => {
            var placement = eachObject.placement;
            var words = eachObject.words;
            $(inputArea[placement]).val(words);
        });
    } else {
        memoArray = []
    }
}

// dynamically makes the timeblock
for (let i = 0; i < timeSlot.length; i++) {
    const container = $(".container");

    container.append(`
<section hour=${i}>
    <time>${timeSlot[i]}</time>
    <input type=text  id=input-${i}>
    <button index=${i} class=saveBtn${i}></button>
</section>
`);

    $("section").addClass("row hour time-block");
    $("time").addClass(" col- xs-2 col-lg-2 col-md-2 timeBlock");
    $("input").addClass(`col-xs-6 col-lg-9 col-md-9 description`);
    $(":submit").addClass(`col-xs-4 col-lg-1 col-md-1 saveBtn`);


    // Eventlistener for memo generation
    $(".saveBtn" + i).click(function() {
        var placement = parseInt($(this).attr("index"));
        var words = $(inputArea[placement]).val();

        memoSave(placement, words);
    })
    saveBtn = $(".saveBtn");
    inputArea = $(".description");

    // Color change functions based on time of day
    var arrayTime = $(".timeBlock");
    var arrayInput = $(".description");
    var time = $(arrayTime[i]).text();
    var militaryTime = parseInt(moment(time, "LT").format("H"));
    var text = $(arrayInput[i]);

    if (militaryTime === todayHour) {
        text.addClass("present")
    };
    if (militaryTime < todayHour) {
        text.addClass("past")
    };
    if (militaryTime > todayHour) {
        text.addClass("future")
    }
};

memoRender();