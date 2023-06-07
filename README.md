# rifu6674-tracker

## SETUP
1. To run the application, open the console and type "npm run dev".
2. Open your web browser and visit "http://localhost:1234".

Since the application only displays movies released since 2020, it might be challenging to come up with movie titles for testing. Here are some movie ideas you can use:
- John Wick
- Batman
- Dune
- Tenet
- Avatar
- Everything
- All Quiet

## DATA CONSTRAINTS
The website has certain limitations and shortcomings regarding data retrieval and storage due to the scope of the assignment and my limited abilities. These constraints include:
- Usage of JSON data instead of a more appropriate API: The course focused on importing JSON data, so I utilized JSON as the data source. However, in a real-world scenario, it would be more suitable to use a dedicated API for retrieving movie data.
- Limited to movies released from 2020 onwards: Since the available JSON database was divided into different files by decade, it was challenging to search across multiple files with overlapping results (e.g., Spiderman movies). To simplify the assignment, I decided to limit the displayed movies to those released from 2020 onwards.
- Double storing of data: To handle both user-generated data (e.g., watched status) and data retrieved from the JSON file (e.g., movie posters), there is some overlap in the stored data. Currently, only the watched status is double stored to minimize redundancy. In future development, implementing a backend database and utilizing an API, such as IMDB, would be a more efficient solution.

## FUTURE DEVELOPMENT
Despite my best efforts, the current website lacks several features outlined in the website mockup. Some of the planned future developments include:

- Mobile responsiveness: Although the webpage is partially responsive due to flexible grids, it requires significant work to enhance mobile responsiveness through media queries. The UI for mobile devices may involve hiding or rearranging certain elements.
- Movie rating system: Implementing a rating system using 5-star icons, where users can hover over and click to assign a rating. This can be achieved using checkbox elements.
- Sorting watched movies by rating: Enable sorting of the watched movies array based on the assigned ratings using the `sort()` function.
- Displaying additional movie information: Display the star rating, review symbol, favorite symbol, and date watched underneath each movie poster on the home page.
- Movie popup interaction: Allow users to click on movie posters to open the movie popup window for more details. This can be implemented by adding an event listener to each movie poster element.
- Counters for movies and reviews: Implement functional counters to keep track of the number of movies watched and reviews left by the user.
- Separate popup window for watched movies: Create a separate popup window specifically for watched movies, providing additional functionality and options.
- Predictive text in the movie search field: Enhance the search experience by implementing predictive text suggestions as users type in the movie search field.
- Symbol-based buttons: Replace the text-based buttons for watched, favorite, and watch later with symbols for a more visually appealing interface.
- Improved popup window closing: Allow users to close the popup window by clicking anywhere outside the window, making it more intuitive and user-friendly.
- Empty search results page: Design a dedicated page to display search results when no matching movies are found. Provide explanations and suggestions for refining the search criteria.

## ISSUES/ERRORS
- Limitation on leaving only one review: Currently, the application only allows one review to be saved at a time. This means that writing a new review or closing the movie popup window will override the previous review, even if the review field is left blank. To address this issue, a separate button
