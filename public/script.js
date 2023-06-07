// NOTE ABOUT DOUBLE STORING THE DATA -- scope of this assignment. in long run backend database with API?.
// I needed my own database to store user-generated data such as favorites

// Movie DATABASES
const url = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies-2020s.json";

// Array to store movie names
let movieNames = [];
var moviesData; // Global variable to store movies data
let movieWatchedArray = []; // Array to store watched movie data

// Colours
var secondaryColour = "rgb(116, 116, 116)" // Grey
var accentColour = "rgb(204, 121, 255)" // Purple

// Getting elements
const movieInput = document.getElementById('film-name'); // Get the movie input element
const popupPoster = document.getElementById('popupPoster'); // Get the popup poster element
const popupTitle = document.getElementById('popupTitle'); // Get the popup box elements
const popupYear = document.getElementById('popupYear');
const popupDescription = document.getElementById('popupDescription');

// Add event listener for Enter key press or form submission
movieInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    const movieName = movieInput.value.trim(); // Get the trimmed movie name

    showPopup()

    if (movieName !== '') {
      // Check if the movie is already stored in movieData
      const existingMovieIndex = findMovieIndex(movieName);

      updateWatchedButton(movieName) // check & change the background colour to indicate if watched already
      updateFavoriteButton(movieName)
      refreshReview(movieName); 

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

const watchedButton = document.getElementById('watched'); // Get the "watched" button element

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
  displayWatched(); // refreshes homescream displayed movies
})

const favoriteButton = document.getElementById('favorite'); // Get the "favorite" button element

// Event listener for the favorite button click event
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
  displayFavorites()
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
  const moviesContainer = document.getElementById('moviesContainer'); // Get the movies container element
  moviesContainer.innerHTML = ''; // Clear existing movies container

  // Iterate over movieWatchedArray and create img elements for each watched movie
  movieWatchedArray.forEach((movie) => {
    if (movie.watched) { // Check if the movie is watched
      const img = document.createElement('img');
      img.src = movie.poster;
      img.alt = movie.title;
      moviesContainer.appendChild(img);
    }
  });
}

function displayFavorites() {
  const favoritesContainer = document.getElementById('moviesContainerFavorites');
  favoritesContainer.innerHTML = ''; // Clear existing favorites container

  movieWatchedArray.forEach((movie) => {
    if (movie.favorited) { // Check if the movie is favorited
      const img = document.createElement('img');
      img.src = movie.poster;
      img.alt = movie.title;
      favoritesContainer.appendChild(img);
    }
  });
}

// Generate a random unique identifier using date and time
function generateUniqueID() {
  const now = new Date();
  return now.toISOString(); // Example format: "2023-05-12T14:36:30.000Z"
}

// Function to find if a movie has already been watched and thus exists in local array. Prevents double-ups.
// Plus returns its index so i can display the user generated data
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
      watchedButton.style.backgroundColor = accentColour; // Purple color for watched movie
    } else {
      watchedButton.style.backgroundColor = secondaryColour; // Dark color for unwatched movie
    }
  } else {
    watchedButton.style.backgroundColor = secondaryColour; // Dark color if movie is not found
  }
}

function updateFavoriteButton(movieTitle) {
  const movieIndex = findMovieIndex(movieTitle);
  if (movieIndex !== -1) {
    const movie = movieWatchedArray[movieIndex];
    if (movie.favorited == true) {
      favoriteButton.style.backgroundColor = accentColour; // Purple color for watched movie
    } else {
      favoriteButton.style.backgroundColor = secondaryColour; // Dark color for unwatched movie
    }
  } else {
    favoriteButton.style.backgroundColor = secondaryColour; // Dark color if movie is not found
  }
}

const saveButton = document.getElementById('saveButton'); // Get the "Save" button element
// Attach the event listener to the saveButton
saveButton.addEventListener('click', saveReview);

function saveReview() {
  // hides the popup and background overlay
  hidePopup();

  const myReview = document.getElementById('myReview'); // Get the <p> element to display the review
  const popupInput = document.getElementById('reviewInput'); // Get the popup input element
  const movieTitle = popupTitle.textContent; // Get the movie title
  const movieIndex = findMovieIndex(movieTitle); // Find the index of the movie in movieWatchedArray
  
  if (movieIndex !== -1) {
    const movie = movieWatchedArray[movieIndex];
    const review = popupInput.value.trim(); // Get the review text from the input field
    movie.reviews = review; // Update the reviews property with the review text
    
    // Clear the input field
    popupInput.value = '';
    
    // Display the review in the <p> element
    myReview.textContent = "Your previous review: " + review;
    
    // Print the updated movieWatchedArray for testing
    console.log('Updated movieWatchedArray:', movieWatchedArray);

    //popupBox.style.display = 'none';
    //overlay.style.display = 'none';  
  }
}

function refreshReview(movieTitle) {
  const myReview = document.getElementById('myReview'); // Get the <p> element to display the review
  const movieIndex = findMovieIndex(movieTitle); // Find the index of the movie in movieWatchedArray
  
  if (movieIndex !== -1) {
    const movie = movieWatchedArray[movieIndex];
    const review = movie.reviews; // Get the review from the movie object
    
    // Display the review in the <p> element
    myReview.textContent = "Your previous review: " + review;
  } else {
    // Clear the <p> element if the movie is not found
    myReview.textContent = '';
  }
}

const popupBox = document.getElementById('popupBox');
const overlay = document.getElementById('overlay');

// Function to show the popup
function showPopup() {
  popupBox.style.display = "flex";
  overlay.style.display = "block";
}

// Function to hide the popup
function hidePopup() {
  popupBox.style.display = "none";
  overlay.style.display = "none";
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
