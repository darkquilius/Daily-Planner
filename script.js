// Sets date at top
const currentDay = document.getElementById("currentDay");

var update = function() {
    currentDay.innerHTML =
        moment().format('MMMM Do YYYY, h:mm:ss a');
}
setInterval(update, 1000);

// Used for color change based on time of day
const todayHour = parseInt(moment().format("H"));

// Used for timeslot text
const timeSlot = ["9 A.M.", "10 A.M", "11 A.M.", "12 P.M.", "1 P.M.", "2 P.M.", "3 P.M.", "4 P.M.", "5 P.M."]


// Used to set and get localStorage
var memoArray = [];
var saveBtn;
var inputArea;
var memoArea;

// Functions for localStorage
function memoSave(placement, words) {
    //creating a temp object
    if (words === ""){
        return
    }
    var memoObject = {
        placement: placement,
        words: words
    };
    //pushing object to array so its not all saved in one object
    memoArray.push(memoObject);
    //making an array match one key so we can call all objects for that time slot. have to stringify bc otherwise it will show up as object object
    localStorage.setItem("allObjects", JSON.stringify(memoArray));
}

function memoRender() {
    // pulling a string from local storage
    memoArray = JSON.parse(localStorage.getItem("allObjects"));
    //making it so if there are obejcts in local storage, they were just turned to strings so wo we can place them. input area is chosen by array spot, then the value of the input text is the stringified object.
    if (memoArray != null) {
        memoArray.forEach(eachObject => {
            var placement = eachObject.placement;
            var words = eachObject.words;
            $(memoArea[placement]).append(`<br>` + words);
        });
    } else {
        memoArray = []
    }
}



// dynamically makes the timeblock
for (let i = 0; i < timeSlot.length; i++) {
    const container = $(".container");
    
    container.append(`
<section class="row hour time-block" hour=${i}>
    <time class=" col- xs-2 col-lg-2 col-md-2 timeBlock">${timeSlot[i]}</time>
    <div class="memoArea col-xs-4 col-lg-6 col-md-6"></div>
    <input type=text class="col-xs-2 col-lg-3 col-md-3 description" id=input${i}></input>
    <button class="col-xs-4 col-lg-1 col-md-1 saveBtn" id=saveBtn${i}></button>
</section>
`);

    // Eventlistener for memo generation
    $(`#saveBtn${i}`).click(function() {
        var placement = i;
        var words = $(`#input${i}`).val();
        memoSave(placement, words);
        $(`#input${i}`).val("");
        arrayMemo.each(function(){$(this).text("")})
        memoRender()
    })
    saveBtn = $(".saveBtn");
    inputArea = $(".description");
    memoArea = $(".memoArea")

    // Color change functions based on time of day
    var arrayTime = $(".timeBlock");
    var arrayInput = $(".description");
    var arrayMemo = $(".memoArea");
    var time = $(arrayTime[i]).text();
    var militaryTime = parseInt(moment(time, "LT").format("H"));
    var text = $(arrayInput[i]);
    var memo = $(arrayMemo[i])

    if (militaryTime === todayHour) {
        text.addClass("present");
        memo.addClass("present");
    };
    if (militaryTime < todayHour) {
        text.addClass("past");
        memo.addClass("past");
    };
    if (militaryTime > todayHour) {
        text.addClass("future");
        memo.addClass("future");
    }
};

memoRender();