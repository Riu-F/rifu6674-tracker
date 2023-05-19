// Movie DATABASES
const url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json";


// Array to store movie names
let movieNames = [];

// Get the movie input element
const movieInput = document.getElementById('film-name');

// Add event listener for Enter key press or form submission
movieInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission

    const movieName = movieInput.value.trim(); // Get the trimmed movie name

    if (movieName !== '') {
        movieNames.push(movieName); // Add movie name to the array
        movieInput.value = ''; // Clear the input field
        console.log(movieNames); // Display the array in the console

        // Match the entered movie name with the movies from the database
        const matchedMovies = movies.filter(movie => movie.title.toLowerCase().includes(movieName.toLowerCase()));
        console.log(matchedMovies); // Display the matched movies in the console
      
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

    // Get the div where we want to display the movie posters
    const moviesDiv = document.getElementById('moviesContainer');

    // Loop through each movie and create an img element with the movie poster URL
    movies.forEach((movie) => {
      const img = document.createElement('img');
      img.src = movie.thumbnail;
      img.alt = movie.title;
      moviesDiv.appendChild(img);
    });
  })
  .catch((error) => {
    console.log(error);
  });
