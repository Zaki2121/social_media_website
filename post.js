let span = document.querySelector("#text");
let currentUser = localStorage.getItem("currentUser");

span.innerHTML = currentUser.substring(0, 5);


let imageUrl = document.querySelector("#imageUrl");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let form = document.querySelector("form");
let postArea = document.querySelector(".post-area");

let posts = document.querySelector(".posts");

const getPostFromLocalStorage = () => {

    let posts = localStorage.getItem("posts");

    return posts ? JSON.parse(localStorage.getItem("posts")) : [];

}

const LoadPostsFromLocalStorage = () => {
    

    let postList = getPostFromLocalStorage();

    postList.forEach((p) => {

        posts.innerHTML += `

        <div class="post">
        <img
          src="${p.imgUrl}"
          alt=""
        />
        <h1>${p.title}</h1>
        <p>
         ${p.content}
        </p>
      </div>`;


    })



}
LoadPostsFromLocalStorage();


const addPostToLocalStorage = (postInfo) => {

    let imageUrl = postInfo[0].value;
    let title = postInfo[1].value;
    let content = postInfo[2].value;

    let post = {}
    // console.log(imageUrl);
    // console.log(title);
    // console.log(content);

    if (imageUrl == "" && title == "" && content == "") {

        return;

    } else {

        post = {

            imgUrl: imageUrl,
            title: title,
            content: content,

        }

    }

    let posts = getPostFromLocalStorage();

    posts.push(post);

    localStorage.setItem("posts", JSON.stringify(posts));

    postInfo[0].value = "";
    postInfo[1].value = "";
    postInfo[2].value = "";
    LoadPostsFromLocalStorage();




}

document.addEventListener("click", (e) => {

    let isclciked = postArea.contains(e.target);

    if (!isclciked) {

        if (imageUrl.value.length === 0 && title.value.length == 0 && content.value === 0) {
            return;
        } else {
            addPostToLocalStorage([imageUrl, title, content]);
            posts.innerHTML = "";
            LoadPostsFromLocalStorage();
        }

    }



})







