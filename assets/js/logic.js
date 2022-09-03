let grabCurrentDate = moment().format('MMMM Do, YYYY');
let grabCurrentHour = moment().format('h a');
let buttons = document.querySelectorAll('.saveBtn')
let userInput = document.querySelectorAll('.user-input')
let timeBlock = document.querySelectorAll('.time-block')

renderInput();

// Using jquery to set the currentDay text content to grabCurrentDate
$('#currentDay').text(grabCurrentDate);

// Using jquery and event delegation to handle all the buttons
$('#container').on('click', function(targ) {
    // If the target (clicked element) is a button
    if (targ.target && targ.target.matches('.saveBtn')) {
        // console check
        // console.log('I was clicked!')

        // grabbing the clicked btn's block value
        btnBlockValue = targ.target.dataset.block;
        
        // Looping over all input fields and matching it's block value with current button
        for (var i = 0; i < userInput.length; i++) {
            // if the userInput block value is equal to the btn block value
            if (userInput[i].dataset.block === btnBlockValue) {
                // concatenating to make a dynamic storage item name based on its block value
                localStorage.setItem('userInput' + userInput[i].dataset.block, userInput[i].textContent)
            }
        }
        location.reload();
    }

    if (targ.target && targ.target.matches('.clear')) {
        localStorage.clear();

        // Loops over all userInput fields and clears them
        for (var i = 0; i < userInput.length; i++) {
            userInput[i].textContent = "";
        }
        location.reload();
    }
})

// Grabs local storage items and renders it onto the userInput box
function renderInput() {
    // Looping over userInput fields
    for (var i = 0; i < userInput.length; i++) {
        userInputBlock = userInput[i].dataset.block;

        // Getting the userInput local storage item based on the current field input block value
        userInputValue = localStorage.getItem('userInput' + userInputBlock)

        // If the current item in the local storage doesn't exist, skip current iteration.
        if (userInputValue === undefined || userInputValue === null) {
            continue;
        }
        // Setting the text content of current input field
        userInput[i].textContent = userInputValue;
    };
}

let militaryHour = parseInt(grabCurrentHour.slice(0, 2));
// Check to see if military hour is an integer and is sliced properly
// console.log(militaryHour)

// Switch Statements to convert normal hours to military time
switch (grabCurrentHour) {
    case '12 am':
        militaryHour = 0;
        console.log('It is currently ' + militaryHour + ' hours');
        break;
    case '1 pm':
    case '2 pm':
    case '3 pm':
    case '4 pm':
    case '5 pm':
    case '6 pm':
    case '7 pm':
    case '8 pm':
    case '9 pm':
    case '10 pm':
    case '11 pm':
        militaryHour += 12;
        console.log('It is currently ' + militaryHour + ' hours')
        break;
    // The default statement for 1-11am
    default:
        console.log('It is currently ' + militaryHour + ' hours');
        break;
}

// Needs to be initiated after switch statements
currentHour();

// function that sets the classes of each timeblock depending on what time it is
function currentHour() {
    // Loops over the time blocks and sets classes past future or present
    for (var i = 0; i < timeBlock.length; i++) {
        // If the current hour timeblock is the present
        if (parseInt(timeBlock[i].dataset.hour) === militaryHour) {
            timeBlock[i].setAttribute('id', 'present');
            
        // If the current timeblock is the past
        } else if (parseInt(timeBlock[i].dataset.hour) < militaryHour) {
            timeBlock[i].setAttribute('id', 'past');

        // If the current timeblock is the future
        } else if (parseInt(timeBlock[i].dataset.hour) > militaryHour) {
            timeBlock[i].setAttribute('id', 'future');
        } else {
            console.log('currentHour() needs added conditions')
        }
    }
}