// NOTE ABOUT DOUBLE STORING THE DATA -- scope of this assignment. in long run backend database with API?.
// I needed my own database to store user-generated data such as favorites

// Movie DATABASES
const url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json";

// Array to store movie names
let movieNames = [];
var moviesData; // Global variable to store movies data
let movieWatchedArray = []; // Array to store watched movie data

// Getting elements
const movieInput = document.getElementById('film-name'); // Get the movie input element
const popupPoster = document.getElementById('popupPoster'); // Get the popup poster element
const popupTitle = document.getElementById('popupTitle'); // Get the popup box elements
const popupYear = document.getElementById('popupYear');
const popupDescription = document.getElementById('popupDescription');
const moviesContainer = document.getElementById('moviesContainer'); // Get the movies container element
const watchedButton = document.getElementById('watched'); // Get the "watched" button element

// Add event listener for Enter key press or form submission
movieInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    const movieName = movieInput.value.trim(); // Get the trimmed movie name

    if (movieName !== '') {
      // Check if the movie is already stored in movieData
      const existingMovieIndex = findMovieIndex(movieName);

      updateWatchedButton(movieName) // check & change the background colour to indicate if watched already
      updateFavoriteButton(movieName)

      if (existingMovieIndex !== -1) {
        console.log("already found!")
        // Movie already exists in movieData, use the existing data
        const existingMovie = movieWatchedArray[existingMovieIndex];
        // Update the image, title, release year, and description with existing movie data
        popupPoster.src = existingMovie.poster;
        popupTitle.textContent = existingMovie.title;
        popupYear.textContent = existingMovie.year;
        popupDescription.textContent = existingMovie.description;
      } else {
        console.log("new movie")
        // Movie not found in movieData, proceed with matching moviesData
        const matchedMovies = moviesData.filter(movie => movie.title.toLowerCase().includes(movieName.toLowerCase()));

        if (matchedMovies.length > 0) {
          // Get the first matched movie
          const movie = matchedMovies[0];
          // Update the image, title, release year, and description
          popupPoster.src = movie.thumbnail;
          popupTitle.textContent = movie.title;
          popupYear.textContent = movie.year;
          popupDescription.textContent = movie.extract;
        }
      }
    }
  }
});

// Add event listener for the watched button click event
watchedButton.addEventListener('click', function() {
  const movieTitle = popupTitle.textContent;
  const movieIndex = findMovieIndex(movieTitle); // when user presses "watched" button
  if (movieIndex !== -1) { // check if movie exists in my array
    const movie = movieWatchedArray[movieIndex];
    if (movie.watched == true) { // if it does. they hit watch again, so change to havent watched
      movie.watched = false 
      updateWatchedButton(movieTitle) // checks & changes background "watched" button colour
    } else {
      movie.watched = true
      updateWatchedButton(movieTitle) // checks & changes background "watched" button colour
    }
  } else {
    storeMovieData(); // If movie not found in user database, call the function to store the movie data
    updateWatchedButton(movieTitle) // checks & changes background "watched" button colour
  }
})

const favoriteButton = document.getElementById('favorite'); // Get the "favorite" button element
favoriteButton.addEventListener('click', function() {
  console.log("clicked");
  const movieTitle = popupTitle.textContent;
  const movieIndex = findMovieIndex(movieTitle);
  if (movieIndex !== -1) { // check if movie exists in my array
    const movie = movieWatchedArray[movieIndex];
    if (movie.favorited === true) {
      movie.favorited = false
      updateFavoriteButton(movieTitle)
    } else {
      movie.favorited = true
      updateFavoriteButton(movieTitle)
    }
  } else {
    storeMovieData();
    updateFavoriteButton(movieTitle)
  }
});

function storeMovieData() { // for this site, this could be in the search event listener. But i had planned to add a watchlater feild ect where users could pressed watched. 
  // Get the movie data
  const movieTitle = popupTitle.textContent;
  const movieYear = popupYear.textContent;
  const movieDescription = popupDescription.textContent;
  const movieImage = popupPoster.src;

  // Should be redundant but just in case checks if the movie already exists in movieWatchedArray
  const existingMovieIndex = findMovieIndex(movieTitle.toLowerCase());
  if (existingMovieIndex !== -1) {
    // Movie already exists, do not add it again
    console.log('Movie already exists:', movieTitle);
    return;
  }

  // Create an object with the movie data
  const movieData = {
    title: movieTitle,
    year: movieYear,
    description: movieDescription,
    poster: movieImage,
    watched: true,
    favorited: false,
    id: generateUniqueID(),
    rating: 0,
    reviews: ''
  };

  // Push the movie data object into the array
  movieWatchedArray.push(movieData);
  console.log('Movie Data Array:', movieWatchedArray);

  displayWatched(); // function to refresh displayed watched movies
}

function displayWatched() {
  moviesContainer.innerHTML = ''; // Clear existing movies container

  // Iterate over movieWatchedArray and create img elements for each movie. ISSUE: displays movies with "watched: false" 
  movieWatchedArray.forEach((movie) => {
    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = movie.title;
    moviesContainer.appendChild(img);
  });
}

// Generate a random unique identifier using date and time
function generateUniqueID() {
  const now = new Date();
  return now.toISOString(); // Example format: "2023-05-12T14:36:30.000Z"
}

// Function to find if a movie has already been watched and thus exists in local array. Prevents double-ups.
// Plus returns its index so i can display the user generated data
// Plus changes watched button to purple if found
function findMovieIndex(movieTitle) {
  for (let i = 0; i < movieWatchedArray.length; i++) {
    if (movieWatchedArray[i].title.toLowerCase() === movieTitle.toLowerCase()) {
      return i; // Return the index of the matching object
    }
  }
  return -1; // Return -1 if no match is found
}

// changes colour of button to purple/grey depending on if watched. checks each time run. Needs to be called mutiple times, eg when searched/watched clicked... so needs to be its own function
function updateWatchedButton(movieTitle) {
  const movieIndex = findMovieIndex(movieTitle);
  if (movieIndex !== -1) {
    const movie = movieWatchedArray[movieIndex];
    if (movie.watched == true) {
      watchedButton.style.backgroundColor = 'rgb(172, 5, 255)'; // Purple color for watched movie
    } else {
      watchedButton.style.backgroundColor = 'rgb(38, 38, 38)'; // Dark color for unwatched movie
    }
  } else {
    watchedButton.style.backgroundColor = 'rgb(38, 38, 38)'; // Dark color if movie is not found
  }
}

function updateFavoriteButton(movieTitle) {
  const movieIndex = findMovieIndex(movieTitle);
  if (movieIndex !== -1) {
    const movie = movieWatchedArray[movieIndex];
    if (movie.favorited == true) {
      favoriteButton.style.backgroundColor = 'rgb(172, 5, 255)'; // Purple color for watched movie
    } else {
      favoriteButton.style.backgroundColor = 'rgb(38, 38, 38)'; // Dark color for unwatched movie
    }
  } else {
    favoriteButton.style.backgroundColor = 'rgb(38, 38, 38)'; // Dark color if movie is not found
  }
}

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Unable to access API. Error: ${response.status}`);
    }
  })
  .then((movies) => {
    moviesData = movies; // Store the movies data in the global variable
  })

  .catch((error) => {
    console.log(error);
  });
