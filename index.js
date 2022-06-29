const APIURL='https://api.themoviedb.org/3/discover/movie?/sort_by=popularity.desc&api_key=549700c46caf77e61916cc23c8f74382&page=1'
const SEARCHAPI='https://api.themoviedb.org/3/search/movie?&api_key=549700c46caf77e61916cc23c8f74382&query=';
const IMGPATH='https://image.tmdb.org/t/p/w1280/';

const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");

//initially get fav movies
getMovies(APIURL);

async function getMovies(url){
    const resp=await fetch(url);
    const respData=await resp.json();
    //console.log(respData.results);
    showMovies(respData.results)
}

function showMovies(movies) {
    //clr main
    main.innerHTML= "";
    movies.forEach((movie) =>{
        const { poster_path, title, vote_average } = movie;

        const movieEl=document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
               
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote){
    if(vote>=8){
        return "green";
    }else if(vote>=5){
        return "orange";
    }else{
        return "red"
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});