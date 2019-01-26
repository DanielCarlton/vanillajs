const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// Function not created by me, taken from stack overflow.
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Select UI elements
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// add event listeners
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

const cities = [];
// fetch the cities data and store in array
fetch(endpoint)
  .then(blob => blob.json())
  .then(cityData => cities.push(...cityData));

// Create function to find city or state matches based on user input. Array filter and regex.
function findMatches(wordToMatch, cities) {
  const regex = new RegExp(wordToMatch, 'gi');
  return cities.filter(place => {
    return place.city.match(regex) || place.state.match(regex);
  });
}

// Create function to display found matches in browser window. Array map city name, state and population.
function displayMatches() {
  const matches = findMatches(this.value, cities);
  const html = matches
    .map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class=hl>${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class=hl>${this.value}</span>`
      );
      const populationWithCommas = numberWithCommas(place.population);
      return `
    <li>
    <span class="name">${cityName}, ${stateName}</span>
    <span class="population">${populationWithCommas}</span>
    </li>
    `;
    })
    .join('');
  suggestions.innerHTML = html;
}
