let email = document.querySelector("#email");
let password = document.querySelector("#password");
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

const getUsersFromLocalStorage = () => {

    let users = localStorage.getItem('users');

    return users ? JSON.parse(users) : [];

}

const checkLogin = (userinfo) => {

    let email = userinfo[0].value;
    let password = userinfo[1].value;

    if (email.length === 0 && password.length === 0) {
        return;
    }

    let users = getUsersFromLocalStorage();
    // console.log("users", users);

    let filtredUser = users.filter((u) => u.email == email && u.password == password);

    console.log("filtred User", filtredUser);

    if (filtredUser.length != "") {


        if (email == filtredUser[0].email && password == filtredUser[0].password) {

            // console.log("yes waa isku mid")
            // localStorage
            localStorage.setItem("currentUser", filtredUser[0].fullname);
            window.location.href = "./post.html";

        } else {
            console.log("no ")

        }

    } else {

        showErr(userinfo[0], "invalid email and password");
        showErr(userinfo[1], "");
    }





}
// const checkEmpty = (userinfo) => {

//     let email = userinfo[0].value;
//     let password = userinfo[1].value;

//     // console.log(email);
//     // console.log(password);

//     if (email.length === 0 && password.length === 0) {

//         showErr(userinfo[0], "input required");
//         showErr(userinfo[1], "input required");
//     } else {
//         showSucces(userinfo[0]);
//         showSucces(userinfo[1]);
//     }

// }


form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkEmpty([email, password]);
    checkLogin([email, password]);

});