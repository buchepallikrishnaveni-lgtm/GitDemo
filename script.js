/* =========================
   USER ACCOUNT
========================= */

let user = JSON.parse(localStorage.getItem("cmsUser"));

let articles =
    JSON.parse(localStorage.getItem("cmsArticles")) || [];


/* =========================
   PAGE ELEMENTS
========================= */

const signupPage =
    document.getElementById("signupPage");

const loginPage =
    document.getElementById("loginPage");

const cmsPage =
    document.getElementById("cmsPage");

const signupForm =
    document.getElementById("signupForm");

const loginForm =
    document.getElementById("loginForm");

const articleForm =
    document.getElementById("articleForm");

const articleList =
    document.getElementById("articleList");

const searchBox =
    document.getElementById("searchBox");


/* =========================
   SHOW SIGNUP
========================= */

function showSignup() {

    signupPage.classList.remove("hidden");

    loginPage.classList.add("hidden");

    cmsPage.classList.add("hidden");
}


/* =========================
   SHOW LOGIN
========================= */

function showLogin() {

    signupPage.classList.add("hidden");

    loginPage.classList.remove("hidden");

    cmsPage.classList.add("hidden");
}


/* =========================
   SHOW CMS
========================= */

function showCMS() {

    signupPage.classList.add("hidden");

    loginPage.classList.add("hidden");

    cmsPage.classList.remove("hidden");

    document.getElementById("welcomeMessage").textContent =
        "Welcome, " + user.name + "!";

    showArticles();
}


/* =========================
   SIGN UP
========================= */

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;


    const newUser = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "cmsUser",
        JSON.stringify(newUser)
    );


    user = newUser;


    alert("Account created successfully!");


    signupForm.reset();

    showLogin();

});


/* =========================
   LOGIN
========================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    const savedUser =
        JSON.parse(localStorage.getItem("cmsUser"));


    if (!savedUser) {

        alert("No account found. Please sign up first.");

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        user = savedUser;

        loginForm.reset();

        showCMS();

    } else {

        alert("Incorrect email or password.");

    }

});


/* =========================
   LOGOUT
========================= */

function logout() {

    showLogin();

}


/* =========================
   ADD ARTICLE
========================= */

articleForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const title =
        document.getElementById("title").value;

    const author =
        document.getElementById("author").value;

    const category =
        document.getElementById("category").value;

    const content =
        document.getElementById("content").value;


    const article = {

        id: Date.now(),

        title: title,

        author: author,

        category: category,

        content: content

    };


    articles.push(article);


    localStorage.setItem(
        "cmsArticles",
        JSON.stringify(articles)
    );


    articleForm.reset();

    showArticles();

});


/* =========================
   SHOW ARTICLES
========================= */

function showArticles() {

    const search =
        searchBox.value.toLowerCase();


    articleList.innerHTML = "";


    const filteredArticles =
        articles.filter(function(article) {

            return (
                article.title
                    .toLowerCase()
                    .includes(search) ||

                article.author
                    .toLowerCase()
                    .includes(search) ||

                article.category
                    .toLowerCase()
                    .includes(search)
            );

        });


    if (filteredArticles.length === 0) {

        articleList.innerHTML =
            "<p>No articles found.</p>";

        return;
    }


    filteredArticles.forEach(function(article) {

        const div =
            document.createElement("div");

        div.className = "article";


        div.innerHTML = `

            <h3>${article.title}</h3>

            <p>
                <strong>Author:</strong>
                ${article.author}
            </p>

            <span class="category">
                ${article.category}
            </span>

            <p>
                ${article.content}
            </p>

            <button
                class="edit"
                onclick="editArticle(${article.id})">
                Edit
            </button>

            <button
                class="delete"
                onclick="deleteArticle(${article.id})">
                Delete
            </button>

        `;


        articleList.appendChild(div);

    });

}


/* =========================
   DELETE ARTICLE
========================= */

function deleteArticle(id) {

    articles =
        articles.filter(function(article) {

            return article.id !== id;

        });


    localStorage.setItem(
        "cmsArticles",
        JSON.stringify(articles)
    );


    showArticles();

}


/* =========================
   EDIT ARTICLE
========================= */

function editArticle(id) {

    const article =
        articles.find(function(article) {

            return article.id === id;

        });


    document.getElementById("title").value =
        article.title;

    document.getElementById("author").value =
        article.author;

    document.getElementById("category").value =
        article.category;

    document.getElementById("content").value =
        article.content;


    deleteArticle(id);


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================
   SEARCH
========================= */

searchBox.addEventListener(
    "input",
    showArticles
);


/* =========================
   CHECK LOGIN
========================= */

if (user) {

    showCMS();

} else {

    showSignup();

}