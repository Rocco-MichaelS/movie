const htmlLoad = document.getElementById('movieList');
const apiURL = 'https://saber-tiny-open.glitch.me/movies'
// Api request for Json movie objects/////////////


const getMovies = () => {
    return fetch(apiURL)
        .then(response => response.json())
        .then(movies => {
            movies.forEach(({title, rating, id}) => {
                let divCreate = document.createElement("div")
                console.log(` ${title} - rating: ${rating}`)
                divCreate.innerText = `
                                         
                                    
                                         <div class="movieList w-25">
                                           <p class=" movieClass" id="poster"> ${title} <br> rating: ${rating} <br>
                                         <button onclick="Delete(this)" 
                                         data-rmv=${id} id='remove' class="rmvBtn px-1">Remove</button><button onclick="updateData(this)">Update</button></p>
                                    </>
                                 
                                         
                                         `
                htmlLoad.appendChild(divCreate)
                divCreate.addEventListener("click", divCreate.remove)
                divCreate.addEventListener("click", Delete)
            })

        })
        .then(msg => {
            $('.loader').hide();
        });
}


console.log(getMovies())

//Add Movie Function***********

const addMovie = () => {
    let stars = document.getElementById('movieRating').value;
    let userInput = document.getElementById('addMovie').value;
    console.log(userInput)
    let createInput = document.createElement("div")
    createInput.innerHTML = `<p class="movieClass col-lg-6 col-sm-12 ">${userInput} <br> rating: ${stars} <br> 
                            <button onclick="Delete(this)" 
                            id = "movieDel" class="rmvBtn">Remove</button> <button onclick="updateData(this)">Update</button></p>`
    htmlLoad.appendChild(createInput)
    createInput.addEventListener("click", createInput.remove)


    //OMDB Movie Data********************

    const url = 'https://www.omdbapi.com/?apikey=' + '9065481d' + '&s=' + userInput + ''
    const omdbDATA = () => fetch(url)
        .then(response => response.json())

        .then((data) => {

                for (let i = 0; i < 5; i++) {
                    let search = data.Search[i].Poster
                    let title = data.Search[i].Title
                    let year = data.Search[i].Year
                    let showSearch = document.getElementById("poster")
                    showSearch.innerHTML = `<img src="${search}"><h2>${title} - ${year}</h2></img>` + getMovies()
                    htmlLoad.appendChild(showSearch)
                }

                console.log(data.Search)
            }
        )
        .catch(error => console.log(error))

    console.log(omdbDATA())

//*****ADD to Glitch JSON Objects***********

    let addTitle = {
        id: '',
        title: userInput,
        rating: stars
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
//delete from Api******************
const Delete = (id) => {
    let movieId = $(id).data('rmv')
    fetch(`${apiURL}/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response)
        .then(() => {
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
