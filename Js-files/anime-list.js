
                        let currentPage=1;
                        let totalPages=1;
                        //url
                        const params=new URLSearchParams(window.location.search);
                        const type=params.get("type");
                        const genre =params.get("genre");
                        const genreName = params.get("name");

                        const search = params.get("search");



                        const heading=document.getElementById("animeHeading");





                        //api
                        const apiMap={
                                 latest:{
                                title:"Latest Anime",
                                  url:"https://api.jikan.moe/v4/seasons/now"
                                 },

                                 top:{
                                    title:"Top Anime",
                                    url:"https://api.jikan.moe/v4/top/anime"
                                 },
                                  trending:{
                                    title:"Trending",
                                    url:"https://api.jikan.moe/v4/top/anime?filter=airing"

                                 },
                                 topAiring:{
                                    title:"Top Airing",
                                    url:"https://api.jikan.moe/v4/top/anime?filter=airing&type=tv"

                                 },
                                 mostPopular:{
                                    title:"Most Popular",
                                    url:"https://api.jikan.moe/v4/anime?order_by=members&sort=desc&type=tv"

                                 },
                                 mostFavorite:{
                                    title:"Most Favorite",
                                    url:"https://api.jikan.moe/v4/anime?order_by=favorites&sort=desc&type=tv"

                                 },
                                 latestCompleted:{
                                    title:"Latest Completed",
                                    url:"https://api.jikan.moe/v4/anime?status=complete&type=tv&order_by=end_date&sort=desc"

                                 },
                                 ongoing:{
                                    title:"Ongoing",
                                    url:"https://api.jikan.moe/v4/top/anime?filter=airing"
                                 },
                                 completed:{
                                    title:"Completed",
                                    url:"https://api.jikan.moe/v4/top/anime?filter=bypopularity"
                                 },
                                   popular:{
                                    title:"Most popular",
                                    url:"https://api.jikan.moe/v4/anime?order_by=members&sort=desc&type=tv"
                                 },
                                   ovas:{
                                    title:"OVAs",
                                    url:"https://api.jikan.moe/v4/top/anime?type=ova"
                                 },
                                   movies:{
                                    title:"Movies",
                                    url:"https://api.jikan.moe/v4/top/anime?type=movie"
                                 },
                                   tvSeries:{
                                    title:"TV series",
                                    url:"https://api.jikan.moe/v4/top/anime?type=tv"
                                 },
                                   oans:{
                                    title:"OANs",
                                    url:"https://api.jikan.moe/v4/top/anime?type=ona"
                                 },
                                   specials:{
                                    title:"Specials",
                                    url:"https://api.jikan.moe/v4/top/anime?type=special"
                                 },
                                   upcoming:{
                                    title:"Upcoming",
                                    url:"https://api.jikan.moe/v4/seasons/upcoming?filter=tv"
                                 }
                        };
                        //current api
                        const currentAnime=apiMap[type]||apiMap.latest;

if(search){

    heading.innerText =
    `Search : ${search}`;

}

else if(genre){
      heading.innerText =
    `${genreName} Anime`;
}

else{

    heading.innerText =
    currentAnime.title;

}


document.title =
heading.innerText;

                        

                        //card
                        function createCard(anime){

    return `

    <div class="anime-card">

        <div class="anime-poster-container">

            <a href="watch.html?id=${anime.mal_id}"
            class="anime-poster-link">

                <img
                src="${anime.images.jpg.image_url}"

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

                    ${anime.type || "TV"}

                </span>

                <span class="dot"></span>

                <span class="fdi-duration">

                    ${anime.duration || "24 Min"}

                </span>

            </div>

        </div>

    </div>

    `;

}

//fetch
async function fetchAnime(page){
     const container=document.getElementById("animeList");
     try{
        container.innerHTML=`<p class="loading">Loading...</p>`;

                const separator =

        currentAnime.url.includes("?")
        ? "&"
        : "?";
       
        const apiUrl = search

? `https://api.jikan.moe/v4/anime?q=${search}&page=${page}`

: genre

? `https://api.jikan.moe/v4/anime?genres=${genre}&page=${page}`

: `${currentAnime.url}${
currentAnime.url.includes("?")
? "&"
: "?"
}page=${page}`;

const res = await fetch(apiUrl);
        const data=await res.json();
        totalPages=data.pagination.last_visible_page;


        // if(!data.data){
        //     container.innerHTML="No anime found";
        //     return;
        // }
                if(
            !data.data ||
            data.data.length === 0
        ){

            container.innerHTML = `

            <div class="not-found-container">

                <h2>
                    No Anime Found
                </h2>

                <p>
                    Try searching with another anime name.
                </p>

            </div>

            `;

            return;

        }

        let cards="";
      const uniqueAnime= data.data
.filter(anime => {

    // remove

    return anime.rating !==
    "Rx - Hentai";

})
.filter((anime,index,self)=>
index===self.findIndex(a=>a.mal_id===anime.mal_id));

uniqueAnime.forEach(anime => {

    cards += createCard(anime);

});
        container.innerHTML=cards;

     }catch(error){
        container.innerHTML=`<p class="loading">Failed to load</p>`;
        console.log(error);
     }
}
//load page
async function loadAnime(page,scroll=false){
    currentPage=page;
    await fetchAnime(page);
    createPagination();


    // if(scroll){
    //     window.scrollTo({top:0,
    //         behavior:"smooth"
    //     });
    // }


if (scroll) {

    if (window.location.pathname.includes("watch.html")) {

        const animeSection = document.querySelector(".anime-section");

        animeSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


}
        function createPagination(){
            const pagination=document.getElementById("anime-page");

            pagination.innerHTML="";
            let start=currentPage-2;
            let end = currentPage+2;

            //start 
            if(start <1){
                end += (1-start);
                start=1;
            }
            //end 
            if(end > totalPages){
                start-=(end-totalPages);
                end=totalPages;
            }
            //nege
            if(start<1){
                start=1;
            }


    if(currentPage>1){
        pagination.innerHTML+=`<button class="page-btn" onclick="loadAnime(1,true)">
             «
             </button>`;
    }
  
          //prev button
          if(currentPage > 1){
            pagination.innerHTML+=`<button class="page-btn" onclick="loadAnime(${currentPage-1},true)">
                 <
                 </button>`;
          }
        //page button
            for(let i=start;i<=end;i++){

        pagination.innerHTML += `

        <button
        class="page-btn
        ${currentPage===i
        ? "active"
        : ""}"

        onclick="
        loadAnime(${i},true)
        ">

        ${i}

        </button>

        `;

    }

    // NEXT BUTTON

    if(currentPage < totalPages){

        pagination.innerHTML += `

        <button
        class="page-btn"
 
        onclick="
        loadAnime(
        ${currentPage+1},
        true
        )">

        >

        </button>

        `;

    }
      if(currentPage<totalPages){
        pagination.innerHTML += `

    <button
    class="page-btn"

    onclick="
    loadAnime(
    ${totalPages},
    true
    )
    ">

    »

    </button>

    `;
    }

        }
        loadAnime(currentPage,false);
                  