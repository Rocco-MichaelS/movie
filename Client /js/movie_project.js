const htmlLoad = document.getElementById('movieList');
const posterLoad = document.getElementById('poster');
const selectedMovie = [];


const apiURL = 'https://saber-tiny-open.glitch.me/movies'
const serverAPI = 'http://127.0.0.1:5000/movies'
// Api request for Json movie objects/////////////

// {"title": "Movie 1", "genre": "Action", "year": 2020},
// {"title": "Movie 2", "genre": "Comedy", "year": 2019},
// {"title": "Movie 3", "genre": "Drama", "year": 2018}
const getServerMovies = () => {
    fetch(serverAPI)
        .then(response => response.json())
        .then(data => {
            // Extract movies from the response data
            const movies = data.movies;
            console.log(movies);
            // Loop through the movies array
            movies.forEach(movie => {
                // Create a <div> element for each movie
                let divCreate = document.createElement("div");
                divCreate.classList.add("movieList", "w-50");

                // Populate the <div> with movie information
                divCreate.innerHTML = `
                    <div class="movieList w-50">
                        <p class="movieClass" id="movieTitle">${movie.title}</p>
                        <p>Rating: ${movie.rating}</p>
                        <p>Rating: ${movie.genre}</p>
                        <p>Rating: ${movie.year}</p>
                        <img src="${movie.imageUrl}" alt="${movie.title}">
                        <button onclick="Delete(this)" data-rmv="${movie.title}" class="rmvBtn px-1">Remove</button>
                        <button onclick="updateData(this)">Update</button>
                    </div>`;
                
                // Append the created <div> to the HTML element with id "htmlLoad"
                htmlLoad.appendChild(divCreate);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

// Call the function to fetch and display movies
getServerMovies();

// const getMovies = () => {
//     return fetch(apiURL)
//         .then(response => response.json())
//         .then(movies => {
//             //console.log('get movies',movies)
//             movies.forEach(({title, rating, image, id}) => {
//                 let divCreate = document.createElement("div")
//                // console.log(` ${title} - rating: ${rating}`)
//                 divCreate.innerHTML = `<div class="movieList w-50">
//                                            <p class=" movieClass" id="movieTitle"> ${title} 
//                                            <br> rating: ${rating}
//                                             <br>
//                                             <img src=${image}></img>
//                                             <button onclick="Delete(this)" 
//                                             data-rmv=${id} id='remove' class="rmvBtn px-1">Remove</button><button onclick="updateData(this)">Update
//                                             </p>
//                                             </button>
//                                             </div>`
//                 htmlLoad.appendChild(divCreate)
//             })
//         })
//         .then(msg => {
//             $('.loader').hide();
//         });
// }


//console.log(getMovies())

//Add Movie Function***********

const addMovie = () => {
    const userInput = document.getElementById('searchMovieInput').value;
    // const url = 'https://www.omdbapi.com/?apikey=' + '9065481d' + '&s=' + userInput + ''
    let stars = document.getElementById('movieRating').value;
    console.log(userInput)
    let createInput = document.createElement("div")
    createInput.innerHTML = `<p class="movieClass col-lg-2 col-sm-12">${userInput} <br> rating: ${stars} <br> 
                            <button onclick="Delete(this)" 
                            id = "movieDel" class="rmvBtn">Remove</button> <button onclick="updateData(this)">Update</button></p>`
    htmlLoad.appendChild(createInput)
    createInput.addEventListener("click", createInput.remove)

    searchMovie();




//*****ADD to Glitch JSON Objects***********

    let addTitle = {
        id: '',
        title: userInput,
        rating: stars,
        image: selectedMovie
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addTitle),
    };
    fetch(apiURL, options)
        .then(response => console.log(response)) /* review was created successfully */
        .catch(error => console.error(error));
}

const showSearch = document.getElementById("poster")
//OMDB Movie Data********************
const searchMovie = () =>{
    const userInput = document.getElementById('searchMovieInput').value;
    const url = 'https://www.omdbapi.com/?apikey=' + '9065481d' + '&s=' + userInput + ''
    const omdbDATA = () => fetch(url)
    .then(response => response.json())
    .then((data) => {
         clearResults();
           // console.log('data', data);
                for (let i = 0; i < 5; i++) {
                    let search = data.Search[i].Poster
                    let title = data.Search[i].Title
                    let year = data.Search[i].Year
                    showSearch.innerHTML += `<div class='searchResultItem'>
                    <img src="${search}" class="searchResultItem"><h2>${title} - ${year}</h2></img>
                    </div>`
                }
               // console.log(data.Search)
            }
        )
        .catch(error => console.log(error))

        omdbDATA();
  
}
function clearResults() {
    showSearch.innerHTML = ''; // Clear past results
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        searchMovie();
    }
}

function displayArrayContent(movies) {
console.log(movies);
}
    // Function to handle the click event on images
 const handleImageClick = (event) => {
       
        const clickedImage = event.target;
        const imageUrl = clickedImage.src;

        // Add the image URL to the array
        if(imageUrl){
            selectedMovie.push(imageUrl)

        }
       // console.log('selectedmovies',selectedMovie);

        // Update the display of array content
        displayArrayContent(selectedMovie);
    };

    document.addEventListener('click', handleImageClick);
   // Add click event listener to all images with class "clickable-image"
   const clickableImages = document.querySelectorAll('.searchResultItem');
   clickableImages.forEach(image => {
       image.addEventListener('click', handleImageClick);
   });

//delete from Api******************
const Delete = (id, elem) => {
    let movieId = $(id).data('rmv')
    fetch(`${apiURL}/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response)
        .then(() => {
           id.parentNode.remove();
            alert(`deleted movie!!`)
        })
        .catch(error => console.error('didnt work'));

}

const updateData = (movie) => {
    fetch(`${apiURL}/${movie.id}`, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie.id)
    })
        .then(res => res.json())
        .then(data => {
            console.log('success')
        })
        .catch(console.log('error'));
}
