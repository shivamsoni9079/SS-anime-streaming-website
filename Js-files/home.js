// menu button
function openMenu(){
    document.getElementById("overlay").style.width="100%";
    document.getElementById("sideMenu").style.left="0";
}
function closeMenu(){
    document.getElementById("overlay").style.width="0";
    document.getElementById("sideMenu").style.left="-250px";
}
//anime slider
function createAnimeSlider(anime,index){
    return `
    <div class="anime-slide">
    <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}"
     class="slider-anime-img">
     <div class="anime-overlay">
     <div class="slider-anime-content">
     <p class="spotlight">
     #${index} Spotlight
     </p>
     <h1 class="slider-anime-title">
     ${anime.title_english || anime.title}
     </h1> 
     <div class="slider-anime-info">
     <p>
      <span>★</span> ${anime.score || "?"}
      </p>
      <p>
          ${anime.type || "TV"}
      </p>

   

     <div class="tick-item tick-sub slider-sub">

                <img
                src="../images/icons8-so-closed-caption-24.png" class="tick-sub-img slider-sub-ep">

                <p class="sub-eps">
                    ${anime.episodes || "?"}
                </p>

            </div>


     </div>

     <p class="slider-anime-desc">
     ${anime.synopsis || "No description available"}
     </p>
     <div class="slider-watch-detail-btns">
     <a href="watch.html?id=${anime.mal_id}" class="watch-btn">
      ▶ Watch Now
      </a>
       

      </div>

     </div>
     </div>
    </div> 
    `;
}
 // <button class="detail-btn">
        //                         Detail <span>></span>
        //                     </button>

const animeWrapper =
document.getElementById("animeWrapper");

let animeIndex = 0;

function moveSlider(){

    animeWrapper.style.transform =
    `translateX(-${animeIndex * 100}%)`;

    updateDots();

}
document.getElementById("slider-next")

.addEventListener("click",()=>{

    const totalSlides =
    document.querySelectorAll(".anime-slide").length;

    animeIndex++;

    if(animeIndex >= totalSlides){

        animeIndex = 0;

    }

    moveSlider();

});

document.getElementById("slider-prev")

.addEventListener("click",()=>{

    const totalSlides =
    document.querySelectorAll(".anime-slide").length;

    animeIndex--;

    if(animeIndex < 0){

        animeIndex = totalSlides - 1;

    }

    moveSlider();

});
setInterval(()=>{

    const totalSlides =
    document.querySelectorAll(".anime-slide").length;

    animeIndex++;

    if(animeIndex >= totalSlides){

        animeIndex = 0;

    }

    moveSlider();

},5000);
//slider dots
const sliderDots = document.getElementById("sliderDots");
function createSliderDots(){
    const totalSlides = document.querySelectorAll(".anime-slide").length;
    sliderDots.innerHTML = "";
    for(let i=0;i<totalSlides;i++){
        sliderDots.innerHTML += `<span class="dotslider ${i===0 ? "active-dotslider" : ""}"
        data-index="${i}">
        </span>`;
    }
document.querySelectorAll(".dotslider").forEach(dotslider => {
    dotslider.addEventListener("click",()=>{
        animeIndex = Number(dotslider.dataset.index);
        moveSlider();
        updateDots();
    });
});
}
function updateDots(){
    document.querySelectorAll(".dotslider").forEach((dotslider,index)=>{
        dotslider.classList.toggle("active-dotslider",index===animeIndex);

    });
}

function createTrendyAnime(anime , rank){
return `
           <div class="item">
             <div class="number">
                    
                     <div class="trending-anime-title">
                         ${anime.title_english || anime.title}
                     </div>
                      <span class="trending-anime-number">
                      ${String(rank).padStart(2,"0")}
                      </span>
             </div>
                <a href="watch.html?id=${anime.mal_id}" class="trending-anime-poster-link">
                <img src="${anime.images.webp.image_url}" alt="${anime.title_english}" class="trending-anime-img">
                </a>
                </div>
`;    
}

//trendy anime next & prev buttons
const swiper = document.getElementById("trendyAnime");
document.getElementById("next-trendy-btn").addEventListener("click",() =>{
    swiper.scrollBy({
        left:300,
        behavior:"smooth"
    });
});
document.getElementById("prev-trendy-btn").addEventListener("click",()=>{
    swiper.scrollBy({
        left:-300,
        behavior:"smooth"
    });
});
// const swiper = document.getElementById("trendyAnime");

function createCard(anime){

    return `

    <div class="anime-card">

        <div class="anime-poster-container">

            <a href="watch.html?id=${anime.mal_id}"
            class="anime-poster-link">

                <img
                src="${anime.images.webp.image_url}"
                alt="${anime.title}"
                class="anime-poster">

            </a>

        </div>

        <div class="tick tick-relative">

            <div class="tick-item tick-sub">

                <img
                src="../images/icons8-so-closed-caption-24.png" class="tick-sub-img">

                <p class="sub-eps">
                    ${anime.episodes || "?"}
                </p>

            </div>

            <div class="tick-item tick-dub">

                <img
                src="../images/mic.png" class="tick-dub-img dub-mic">

                <p class="dub-eps">
                    ${anime.episodes || "?"}
                </p>

            </div>

        </div>

        <div class="film-detail">

            <h3>

                <a href="watch.html?id=${anime.mal_id}"
                class="anime-title">

                    ${anime.title_english || anime.title}

                </a>

            </h3>

            <div class="fd-info">

                <span class="fdi-item">
                    ${anime.type || "?"}
                </span>

                <span class="dot"></span>

                <span class="fdi-duration">
                    ${anime.duration || "?"}
                </span>

            </div>

        </div>

    </div>

    `;

}

function createFeatureCard(anime){

    return `

    <li class="anime-feature-item">

        <div
        class="anime-feature-poster-container">

            <a href="watch.html?id=${anime.mal_id}">

                <img
                src="${anime.images.webp.image_url}"

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

//most viewed anime
function createMostViewedAnime(anime , rank){
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

function watchAnime(id){ 
     window.location.href =
    `watch.html?id=${id}`;

}


// FETCH


async function fetchAnime(
url,
containerId,
cardFunction,
limit
){

    const container =
    document.getElementById(containerId);

    try{

        const res =
        await fetch(url);

        const data =
        await res.json();

        // CHECK

        if(!data.data){

            container.innerHTML =
            "No Anime Found";

            return;

        }

        container.innerHTML = "";

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

.slice(0,limit);

       let cards = "";

uniqueAnime.forEach((anime,index) => {

    cards += cardFunction(
    anime,
    index + 1
    );

});

container.innerHTML = cards;

if(containerId === "animeWrapper"){
    createSliderDots();
}

    }

    catch(error){

        container.innerHTML = `

        <p class="loading">

        Failed To Load Anime

        </p>

        `;

        console.log(error);

    }

}

 setTimeout(() => {
    fetchAnime(
"https://api.jikan.moe/v4/seasons/now",
    "animeWrapper",
    createAnimeSlider,
    5
    );
}, 500);

setTimeout(() => {fetchAnime(
    "https://api.jikan.moe/v4/top/anime?filter=airing",
    "trendyAnime",
    createTrendyAnime,
    10
);
},1500);

setTimeout(() => {
    fetchAnime(
"https://api.jikan.moe/v4/top/anime?filter=airing&type=tv",
"topAiringAnime",
createFeatureCard,
5
);
},2500);

setTimeout(() => {
fetchAnime(
"https://api.jikan.moe/v4/anime?order_by=members&sort=desc&type=tv",
"popularAnime",
createFeatureCard,
5
);
},3500);

setTimeout(() => {

fetchAnime(
"https://api.jikan.moe/v4/anime?order_by=favorites&sort=desc&type=tv",
"favoriteAnime",
createFeatureCard,
5
);

},4500);

setTimeout(() => {

fetchAnime(
"https://api.jikan.moe/v4/anime?status=complete&type=tv&order_by=end_date&sort=desc",
"completedAnime",
createFeatureCard,
5
);

},5500);

setTimeout(() => {
fetchAnime(
"https://api.jikan.moe/v4/seasons/now",
"latestAnime",
createCard,
18
);
},6500);
setTimeout(()=>{
    fetchAnime(
        "https://api.jikan.moe/v4/anime?status=airing&order_by=members&sort=desc&type=tv",
        "mostViewedAnime",
        createMostViewedAnime,
        10
    );
},7500)
setTimeout(() => {
fetchAnime(
"https://api.jikan.moe/v4/top/anime",
"topAnime",
createCard,
18
);
},8500);



