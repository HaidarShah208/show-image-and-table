function getFieldValue(Id) {
    return document.getElementById(Id).value;
}


function User(firstName, lastName, email, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dob = dob;
}

var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
console.log(emailFormat.test("abc@gmail.com"))

function getRandomId() {
    return Math.random().toString(36).slice(2)
}

function ageCalculate() {
    let dob = getFieldValue("dob");
    dob = new Date(dob);
    let currentDate = new Date();
    let month_diff = currentDate.getTime() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getFullYear();
    let age = Math.abs(year - 1970);
    return age + " years";
}

function alerty(msg, type) {

    let bgColor;
    switch (type) {
        case "success":
            bgColor = "linear-gradient(to right ,#1D976C, #93F9B9)"
            break;
        case "error":
            bgColor = "linear-gradient(to right ,#93291e, #ed213a)"
            break;
        default:
            bgColor = "#000"
    }
    Toastify({
        text: msg,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgColor,
        },
        onClick: function() {} // Callback after click
    }).showToast();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// form 
var users = [];

function handleSubmit() {
    event.preventDefault();
    let firstName = getFieldValue("firstName")
    let lastName = getFieldValue("lastName");
    let email = getFieldValue("email");
    let dob = getFieldValue("dob");

    if (firstName.length < 3) {
        alerty("please enter your name correctly", "error");
        return
    }
    if (!emailFormat.test(email)) {
        alerty("please enter your email correctly", "error");
        return
    }
    if (!dob) {
        alerty("please enter your DOB correctly", "error");
        return
    }

    let user = {
        firstName,
        lastName,
        fullName: firstName + " " + lastName,
        email,
        dob,
        status: "active",
        role: "student",
        Id: getRandomId(),
        Age: ageCalculate(),

    }
    for (let i = 0; i < users.length; i++) {
        if (user.email == users[i].email) {
            alerty(" This user is already registered", "warning");
            return;
        }
    }
    users.push(user)
    shows()
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// console

function prints() {
    if (!users.length) {
        return alerty("there is no user currently", "warning")
    } else {
        alerty("you have been printed to console", "success")
        return console.table(users)
    }
}



///////////////////////////////////////////////////////////////
// table
function shows() {
    if (!users.length) {
        return alerty("there is no user currently", "warning")
    }
    let initTable = "<div class='table-responsive'><table class='table'>";
    let tableHead = "<thead><tr><th>#</th></th><th scop='col'>first Name</th><th scop='col'>Last Name</th><th scop='col'>Email</th><th scop='col'>Date of Birth</th><th scop='col'>Age</th></tr></thead>";
    let tableFinish = "</table></div>"
    let tableBody = "";
    for (let i = 0; i < users.length; i++) {
        tableBody += '<tr><td>' + (i + 1) + '</td><td>' + users[i].firstName + '</td><td>' + users[i].lastName + '</td><td>' + users[i].email + '</td><td>' + users[i].dob + '</td><td>' + users[i].Age + '</td></tr>';
    }

    let table = initTable + tableHead + '<tbody>' + tableBody + '</tobdy>' + tableFinish;
    present(table)
    alerty("you have successfully add user in output box", "success")
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function present(output) {
    document.getElementById("out").innerHTML = output;
}


function clears() {
    document.getElementById("out").innerHTML = ""
}