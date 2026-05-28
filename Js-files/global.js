//index menu
function toggleMenu(){

    const menu =
    document.getElementById("mobile-menu-box");

    if(menu.style.display === "flex"){

        menu.style.display = "none";

    }else{

        menu.style.display = "flex";

    }

}

// home menu button
function openMenu(){
    document.getElementById("overlay").style.width="100%";
    document.getElementById("sideMenu").style.left="0";
}
function closeMenu(){
    document.getElementById("overlay").style.width="0";
    document.getElementById("sideMenu").style.left="-250px";
}

//login
function openLogin(){
    document.getElementById("login-overlay").style.width="100%";
    document.getElementById("loginBox").style.left="auto";
}
function closeLogin(){

    document.getElementById("login-overlay").style.width = "0";
    document.getElementById("loginBox").style.left = "-250px";

}

function seePassword(){

    const passwordInput =
    document.getElementById("login-password");

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

    }else{

        passwordInput.type = "password";

    }

}

function loginUser(){

    const email =
    document.getElementById("login-email").value;

    const password =
    document.getElementById("login-password").value;

    const message =
    document.getElementById("login-message");

    if(email.length < 6){
        message.innerHTML = "enter valid name";
        return;
    }

    if(password.length < 8){
        message.innerHTML = "password must be 8 characters";
        return;
    }

    // SAVE USER EVERY TIME
    const userData = {
        email: email,
        password: password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(userData)
    );



    // LOGIN SAVE
    localStorage.setItem(
        "isLoggedIn",
        "true"
    );



    message.innerText =
    "Login Successful ✅";



    closeLogin();

    showProfile();

}

// SHOW PROFILE
function showProfile(){

    const savedUser =
    JSON.parse(localStorage.getItem("user"));

    const container = document.getElementById("login-button-container");
     if(!container || !savedUser) return;

    container.innerHTML = `

        <div class="profile-container">

            <img 
                src="../images/profile.png"
                class="profile-img"
                onclick="toggleDropdown()"
            >

            <div 
                class="profile-dropdown"
                id="profileDropdown"
            >

                <p class="profile-email">
                    ${savedUser.email}
                </p>

                <button 
                    class="logout-btn"
                    onclick="logoutUser()"
                >
                    Logout
                </button>

            </div>

        </div>

    `;
}



// TOGGLE DROPDOWN
function toggleDropdown(){

    const dropdown =
    document.getElementById("profileDropdown");

    if(
        dropdown.style.display === "flex"
    ){
        dropdown.style.display = "none";
    }else{
        dropdown.style.display = "flex";
    }

}



// LOGOUT
function logoutUser(){

    document.getElementById(
    "login-message"
).innerText = "";

    localStorage.removeItem("isLoggedIn");

    document.getElementById(
        "login-button-container"
    ).innerHTML = `

        <button 
            class="login-page-button"
            id="openLoginBtn"
            onclick="openLogin()"
        >
            Login
        </button>

    `;
     document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
     document.getElementById("login-message").innerText = "";
}


//navbar
async function loadNavbar(){
    const navContainer=document.getElementById("navbar-container");
    if(!navContainer) return;
    const res = await fetch("navbar.html");
    const data = await res.text();
    navContainer.innerHTML = data;
    
  setupSearch();
  activeMenu();
        // checkLogin();

         const isLoggedIn =
    localStorage.getItem("isLoggedIn");

    if(isLoggedIn){

        showProfile();
}
}
function activeMenu(){

    // FULL URL
    const currentPage =
    window.location.pathname.split("/").pop() +
    window.location.search;

    const navLinks =
    document.querySelectorAll(".nav-link");



    navLinks.forEach(link => {

        const linkPage =
        link.getAttribute("href");



        if(linkPage === currentPage){

            link.classList.add("active-menu");

        }

    });

}



loadNavbar();

// INDEX SEARCH

const indexSearchInput =
document.getElementById(
"search-anime"
);

const indexSearchButton =
document.querySelector(
"#search-anime-container .search-button"
);


function indexSearchAnime(){

    const value =
    indexSearchInput.value.trim();

    if(value){

        window.location.href =
        
`html files/anime-list.html?search=${encodeURIComponent(value)}`;

// `anime-list.html?search=${encodeURIComponent(value)}`;

    }

}


// BUTTON

if(indexSearchButton){

    indexSearchButton
    .addEventListener(
    "click",
    indexSearchAnime
    );

}


// ENTER

if(indexSearchInput){

    indexSearchInput
    .addEventListener(
    "keydown",
    (e)=>{

        if(e.key === "Enter"){

            indexSearchAnime();

        }

    });

}

function setupSearch(){

    // DESKTOP
    const searchInput =
    document.getElementById(
    "search-anime"
    );

    const searchButton =
    document.querySelector(
    ".search-button"
    );


    // MOBILE
    const mobileSearchInput =
    document.getElementById(
    "mobile-search-input"
    );

    const mobileSearchButton =
    document.getElementById(
    "mobile-search-button"
    );


    // COMMON SEARCH FUNCTION

    function goToSearch(value){

        const searchValue =
        value.trim();

        if(searchValue){

            window.location.href =

`anime-list.html?search=${encodeURIComponent(searchValue)}`;

        }

    }


    // DESKTOP BUTTON

    if(searchButton){

        searchButton.addEventListener(
        "click",
        ()=>{

            goToSearch(
            searchInput.value
            );

        });

    }


    // DESKTOP ENTER

    if(searchInput){

        searchInput.addEventListener(
        "keydown",
        (e)=>{

            if(e.key === "Enter"){

                goToSearch(
                searchInput.value
                );

            }

        });

    }


 

if(mobileSearchButton){

    mobileSearchButton.addEventListener(
    "click",
    ()=>{

        // INPUT SHOW

        if(mobileSearchInput.style.display === "none" || mobileSearchInput.style.display === ""){

            mobileSearchInput.style.display =
            "block";

            mobileSearchInput.focus();

        }

        // SEARCH

        else{

            goToSearch(
            mobileSearchInput.value
            );

        }

    });

}




    // MOBILE ENTER

    if(mobileSearchInput){

        mobileSearchInput.addEventListener(
        "keydown",
        (e)=>{

            if(e.key === "Enter"){

                goToSearch(
                mobileSearchInput.value
                );

            }

        });

    }

}



//genre
async function fetchGenres(){

    const container =
    document.getElementById("genresContainer");

    const showMoreBtn =
    document.getElementById("showMoreBtn");

    try{

        const res = await fetch(
            "https://api.jikan.moe/v4/genres/anime"
        );

        const data = await res.json();

        const genres = data.data;

        const blockGenres = [
             "Boys Love",
            "Girls Love",
            "Ecchi",
            "Erotica",
            "Hentai"
        ]

        let visibleCount = 24;

        function renderGenres(){

            let genresHTML = "";

            genres
            .filter(genre => !blockGenres.includes(genre.name))

            .slice(0,visibleCount)

            .forEach(genre => {

                genresHTML += `
                
                <a href="anime-list.html?genre=${genre.mal_id}&name=${encodeURIComponent(genre.name)}"
                class="genre-item">

                    ${genre.name}

                </a>

                `;

            });

            container.innerHTML =
            genresHTML;

            showMoreBtn.innerText =

            visibleCount === 24
            ? "Show More +"
            : "Show Less -";

        }

        showMoreBtn
        .addEventListener("click",()=>{

            if(visibleCount === 24){

                visibleCount = 45;

            }

            else{

                visibleCount = 24;

            }

            renderGenres();

        });

        renderGenres();

    }

    catch(error){

        console.log(error);

    }

}

fetchGenres();

function createMostViewedCard(anime , rank){

    return `

    <li class="anime-feature-item">

        <span class="mostviewed-anime-number">

            ${String(rank).padStart(2,"0")}

        </span>

        <div
        class="anime-feature-poster-container">

            <a href="watch.html?id=${anime.mal_id}">

                <img
                src="${anime.images.webp.image_url}"

                alt="${anime.title}"

                class="anime-feature-item-poster">

            </a>

        </div>

        <div class="anime-feature-detalis">

            <a
            href="watch.html?id=${anime.mal_id}"

            class="anime-feature-title">

                ${anime.title_english || anime.title}

            </a>

            <div class="tick">

                <div class="tick-item tick-sub">

                    <img
                    src="../images/icons8-so-closed-caption-24.png"

                    class="tick-sub-img">

                    <p class="sub-eps">

                        ${anime.episodes || "?"}

                    </p>

                </div>

                <div class="tick-item tick-dub">

                    <img
                    src="../images/mic.png"

                    class="tick-dub-img dub-mic">

                    <p class="dub-eps">

                        ${anime.episodes || "?"}

                    </p>

                </div>

            </div>

        </div>

    </li>

    `;

}

// FETCH MOST VIEWED

async function mostViewedAnime(){

    const container =
    document.getElementById(
        "mostViewedAnime"
    );

    // SAFE CHECK
    if(!container) return;

    try{

        const res = await fetch(
"https://api.jikan.moe/v4/anime?status=airing&order_by=members&sort=desc&type=tv"
        );

        // API FAIL
        if(!res.ok){

            throw new Error(
                "API ERROR"
            );

        }

        const data =
        await res.json();

        // SAFE DATA CHECK
        if(!data.data){

            container.innerHTML =

            `
            <p class="loading">
                No Anime Found
            </p>
            `;

            return;

        }

        // REMOVE DUPLICATES
        const uniqueAnime =

        data.data

        .filter(anime => {

            return (
                anime.rating !==
                "Rx - Hentai"
            );

        })

        .filter((anime,index,self)=>

            index ===
            self.findIndex(
                a => a.mal_id === anime.mal_id
            )

        )

        .slice(0,10);

        let cards = "";

        uniqueAnime.forEach(
        (anime,index)=>{

            cards += createMostViewedCard
            (
                anime,
                index + 1
            );

        });

        container.innerHTML =
        cards;

    }

    catch(error){

        console.log(error);

        container.innerHTML =

        `
        <p class="loading">
            Failed To Load Anime
        </p>
        `;

    }

}

setTimeout(()=>{
mostViewedAnime();
},2000)
