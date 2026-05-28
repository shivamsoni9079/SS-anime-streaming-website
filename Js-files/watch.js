
const urlParams =
new URLSearchParams(
window.location.search
);

const id =
urlParams.get("id");


// LOAD ANIME

async function loadAnime(){

    const animeContent =
    document.getElementById(
        "animeContent"
    );
   
    try{

        const res = await fetch(

`https://api.jikan.moe/v4/anime/${id}/full`

        );

        if(!res.ok){

            throw new Error(
                "API Error"
            );

        }

        const data =
        await res.json();

        const anime =
        data.data;

        // VIDEO
        document.getElementById(
            "animeVideo"
        ).innerHTML =

        anime.trailer?.embed_url

        ?

        `

        <iframe
        src="${anime.trailer.embed_url}"

        frameborder="0"

        allowfullscreen>

        </iframe>

        `

        :

        `

        <p class="loading">

            Trailer Not Available

        </p>

        `;

        //anime content

        animeContent.innerHTML = `

        <div class="watch-anime-poster-box">

            <img
            src="${anime.images.jpg.large_image_url}"

            alt="${anime.title}">
        
        </div>


        <div class="watch-anime-detail">

            <h2 class="watch-anime-title">

                ${anime.title_english || anime.title}

            </h2>

            <div class="tick-fd">

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


                <div class="fd-info">

                    <span class="dot"></span>

                    <span class="fdi-item">

                        ${anime.type || "TV"}

                    </span>

                    <span class="dot"></span>

                    <span class="fdi-duration">

                        ${anime.duration || "?"}

                    </span>

                </div>

            </div>
        
            <div class="watch-anime-desc-box">

                <p>

                    ${anime.synopsis || "No Description"}

                </p>

            </div>
   
        </div>

        `;

    }

    catch(error){

        console.log(error);

        document.getElementById(
            "animeVideo"
        ).innerHTML = `

        <p class="loading">

            Failed To Load Anime

        </p>

        `;

    }

}
setTimeout(()=>{
loadAnime();
},2000);
