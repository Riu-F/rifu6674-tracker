// NOTE ABOUT DOUBLE STORING THE DATA -- scope of this asignment. in long run backend database with API?. 
// I needed my own database to store user generated data such as favorite

// Movie DATABASES
const url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json";

// Array to store movie names
let movieNames = [];
var moviesData; // Global variable to store movies data

// Array to store watched movie data
let movieWatchedArray = [];

// Get the movie input element
const movieInput = document.getElementById('film-name');

// Get the popup poster element
const popupPoster = document.getElementById('popupPoster');
// Get the popup box elements
const popupTitle = document.getElementById('popupTitle');
const popupYear = document.getElementById('popupYear');
const popupDescription = document.getElementById('popupDescription');

// Get the movies container element
const moviesContainer = document.getElementById('moviesContainer');

// Add event listener for Enter key press or form submission
movieInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    //movieInput.value = ''; // Clear the input field
    const movieName = movieInput.value.trim(); // Get the trimmed movie name
    //console.log(movieName); // Display the array in the console

    if (movieName !== '') {
      // Match the entered movie name with the movies from the database
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
});

// Get the "watched" button element
const watchedButton = document.getElementById('watched');

// Add event listener for the click event
watchedButton.addEventListener('click', function() {
  // Call the function to store the movie data
  storeMovieData();
});

function storeMovieData() {
  // Get the movie data
  const movieTitle = popupTitle.textContent; // <- these might not be nessersary. can i just do... title: popupTitle.textContent
  const movieYear = popupYear.textContent;
  const movieDescription = popupDescription.textContent;
  const movieImage = popupPoster.src;

  // Create an object with the movie data
  const movieData = {
    title: movieTitle,
    year: movieYear,
    description: movieDescription,
    poster: movieImage,
    watched: false, // i need something to stop movies being entered twice
    favorited: false,
    id: generateUniqueID(),
    rating: 0,
    reviews: ''
  };

  // Push the movie data object into the array
  movieWatchedArray.push(movieData);
  
  console.log('Movie Data Array:', movieWatchedArray);

  displayWatched() // refresh diplayed watched movies
}



function displayWatched() { // display watched movies. function so it will only refresh when run...
  // Clear the movies container
  moviesContainer.innerHTML = '';

  // Iterate over moviesData and create img elements for each movie
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
