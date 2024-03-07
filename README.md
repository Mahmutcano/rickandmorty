# Rick and Morty Character Explorer

This React application allows users to explore characters from the "Rick and Morty" series. It leverages the Rick and Morty API to fetch character details, supports searching and filtering characters, and includes pagination for navigating through characters. Additionally, users can add characters to their favorites.

## Features

- **Character Listing**: Display all characters with their image, name, status, and species.
- **Search Functionality**: Users can search for characters by name.
- **Filtering Options**: Users can filter characters based on status, species, type, and gender.
- **Pagination**: Navigate through characters in a paginated manner.
- **Favorites**: Logged-in users can add characters to their favorites. This requires authentication.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

git clone https://github.com/Mahmutcano/rickandmorty.git

2. Navigate to the project directory:

cd rickandmorty

3. Install dependencies:

npm install

4. Start the development server:

npm start

The application will be available at `http://localhost:3000`.

## Usage

Upon launching the application, users are presented with a grid of characters from the "Rick and Morty" series. The following functionalities are available:

- **Search**: Type in the search box to find characters by name. The search is debounced to improve performance.
- **Filters**: Use the dropdown menus to filter characters by status, gender, species, and type.
- **Pagination**: Use the "Previous" and "Next" buttons to navigate through pages of characters.
- **View Details**: Click on "View Details" to see more information about a character.
- **Add to Favorites**: Logged-in users can add characters to their favorites by clicking on "Add to Favorites".
- **Remove from Favorites**: Users can also remove characters from their favorites, managing their preferred list more effectively.

## Authentication

The application includes a simple authentication flow:

- **Sign Up**: New users can create an account.
- **Sign In**: Existing users can sign in to access their favorites.
- **Add to Favorites**: Only authenticated users can add characters to their favorites. Attempting to add a character without being logged in redirects the user to the login page.
- **Remove from Favorites**: Users can remove characters from their favorites at any time, allowing for dynamic preference management.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Redux Toolkit: State management library for React.
- React Router: A collection of navigational components for React applications.
- React Bootstrap: A frontend framework rebuilt for React.
- Axios: A promise-based HTTP client for making requests to the Rick and Morty API.
- Lodash: A JavaScript utility library providing debounce functionality.

## API Reference

The application uses the Rick and Morty API, available at `https://rickandmortyapi.com/api`. It offers endpoints for fetching characters, locations, and episodes. The API supports pagination and filtering, which are utilized in this application.

## Contributing

Contributions are welcome! If you have a suggestion or want to contribute to the codebase, feel free to create an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.
