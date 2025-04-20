let movies = [];
let sortDirection = 'asc'; 

function addMovie() {
  const name = document.getElementById("movieName").value.trim();
  const rate = parseFloat(document.getElementById("movieRate").value);

  if (name && !isNaN(rate)&& rate>=0 && rate <=10) {
    movies.push({ name, rate });
    document.getElementById("movieName").value = '';
    document.getElementById("movieRate").value = '';
    renderTable();
  }
}

function deleteMovie(index) {
  movies.splice(index, 1); 
  renderTable();
}

function sortTable() {

  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';

 
  movies.sort((a, b) => {
    if (a.name < b.name) return sortDirection === 'asc' ? -1 : 1;
    if (a.name > b.name) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  renderTable();
}

function renderTable() {
  const table = document.getElementById("movieTable");
  table.innerHTML = ''; 

  
  movies.forEach((movie, index) => {
    table.innerHTML += `
      <tr>
        <td>${movie.name}</td>
        <td>${movie.rate}</td>
        <td><button class="delete-btn"   onclick="deleteMovie(${index})">Delete</button></td>
      </tr>
    `;
  });
}