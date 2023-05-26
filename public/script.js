// Movie DATABASES
const url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json";

// Array to store movie names
let movieNames = [];
var moviesData; // Global variable to store movies data

// Get the movie input element
const movieInput = document.getElementById('film-name');

// Get the movies container
const moviesContainer = document.getElementById('moviesContainer');

// Get the popup poster element
const popupPoster = document.getElementById('popupPoster');
// Get the popup box elements
const popupTitle = document.getElementById('popupTitle');
const popupYear = document.getElementById('popupYear');
const popupDescription = document.getElementById('popupDescription');

// Add event listener for Enter key press or form submission
movieInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    movieInput.value = ''; // Clear the input field

    const movieName = movieInput.value.trim(); // Get the trimmed movie name

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

            /*
      movieNames.push(movieName); // Add movie name to the array
      movieInput.value = ''; // Clear the input field
      console.log(movieNames); // Display the array in the console

      // Clear the movies container
      moviesContainer.innerHTML = '';

      // Loop through each entered movie and create an img element with the movie poster URL
      movieNames.forEach((enteredMovie) => {
        // Match the entered movie name with the movies from the database
        const matchedMovies = moviesData.filter(movie => movie.title.toLowerCase().includes(enteredMovie.toLowerCase()));

        matchedMovies.forEach((movie) => {
          const img = document.createElement('img');
          img.src = movie.thumbnail;
          img.alt = movie.title;
          moviesContainer.appendChild(img);
        });
      });
      */

    }
  }
});

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
