/*

  fullname 
  email
  password
  confirmpassword


*/


let fullName = document.querySelector("#fullName");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
let form = document.querySelector("form");


const showErr = (input, message) => {

    let parentElement = input.parentElement;

    input.classList = "error"
    let small = parentElement.querySelector("small");
    small.style.display = "block";

    small.innerHTML = message;

}

const showSucces = (user) => {

    user.classList = "success";

}

const checkEmpty = (userinfo) => {


    userinfo.forEach((user) => {

        if (user.value == "") {


            showErr(user, "input required");

        } else {

            showSucces(user);
        }



    })


}

const checkPasswordLength = (input, min) => {

    if (input.value.length < min) {

        showErr(input, `password must be at least ${min} characters`);
    } else if (input.value.length > min) {
        showSucces(input);
    }



}
const checkPasswordEquality = (data) => {

    let pass = data[0].value;
    let cpass = data[1].value;
    if (cpass != pass) {

        showErr(data[1], `password must be match`);

    }


}

const getUsersFromLocalStorage = () => {

    let users = localStorage.getItem('users');

    return users ? JSON.parse(users) : [];

}
const addUserToLocalSTorage = (userinfo) => {
    let fullname = userinfo[0].value;
    let email = userinfo[1].value;
    let password = userinfo[2].value;
    let confirmPassword = userinfo[3].value;
    let user = {}


    let users = getUsersFromLocalStorage();

    console.log("users", users);

    let filtredUser = users.filter((u) => u.email == email);

    console.log("filtredUser", filtredUser);

    if (filtredUser.length != "") {


        if (email == filtredUser[0].email) {

            showErr(userinfo[1], "Email Already Exists");


        }


    } else {

        if (fullname == "" && email == "" && password == "" && confirmPassword == "") {

            return;

        } else if (confirmPassword != password) {
            return;

        } else if (password.length < 6 && confirmPassword.length < 6) {


            return;

        }

        else {

            user = {
                fullname: fullname,
                email: email,
                password: password,
                confirmpPassword: confirmPassword
            }

        }


        let users = getUsersFromLocalStorage();


        users.push(user);


        localStorage.setItem("users", JSON.stringify(users));
        userinfo[0].value = "";
        userinfo[1].value = "";
        userinfo[2].value = "";
        userinfo[3].value = "";


        alert("successfully added user to a localstorage");
        userinfo[0].classList.remove("success");
        userinfo[1].classList.remove("success");
        userinfo[2].classList.remove("success");
        userinfo[3].classList.remove("success");
        window.location.href = "./login.html";


    }







}


form.addEventListener("submit", (e) => {

    e.preventDefault();


    checkEmpty([fullName, email, password, confirmPassword]);
    checkPasswordLength(password, 6);
    checkPasswordLength(confirmPassword, 6);
    checkPasswordEquality([password, confirmPassword]);
    addUserToLocalSTorage([fullName, email, password, confirmPassword])



    // addUserToLocalSTorage([])

});

