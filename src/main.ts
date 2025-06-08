import './style.css'
import { MovieManager, Movie } from './movieManager';

class UI {
  private movieManager: MovieManager;

  constructor(movieManager: MovieManager) {
    this.movieManager = movieManager;
  }

  renderMovies() {
    const movieList: Movie[] = this.movieManager.getMovies();
    const movieTableBody = document.getElementById('movie-list') as HTMLTableSectionElement;
    movieTableBody.innerHTML = '';

    movieList.forEach((movie: Movie, index: number) => {
      const row = document.createElement('tr');
      row.classList.add('border-b');
      if(index%2 ===0){
        row.classList.add("bg-whith")
      } else{
        row.classList.add("bg-gray-100")
        
      }
      
      const nameCell = document.createElement('td');
      nameCell.classList.add('px-4', 'py-2');
      nameCell.textContent = movie.name;

      const rateCell = document.createElement('td');
      rateCell.classList.add('px-4', 'py-2');
      rateCell.textContent = movie.rate.toString();

      const deleteCell = document.createElement('td');
      deleteCell.classList.add('px-4', 'py-2');
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('bg-red-500',"text-center", 'text-white','w-full', 'p-2', 'rounded');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => {
        this.movieManager.deleteMovie(index);
        this.renderMovies(); 
      };

      deleteCell.appendChild(deleteButton);
      row.appendChild(nameCell);
      row.appendChild(rateCell);
      row.appendChild(deleteCell);

      movieTableBody.appendChild(row);
    });
  }

  addMovieFromForm(event: Event) {
    event.preventDefault(); 

    const nameInput = document.getElementById('movie-name') as HTMLInputElement;
    const rateInput = document.getElementById('movie-rate') as HTMLInputElement;

    if (nameInput && rateInput) {
      const name = nameInput.value;
      const rate = parseFloat(rateInput.value);

      if (name && !isNaN(rate)) {
        this.movieManager.addMovie(name, rate);
        this.renderMovies(); 
        nameInput.value = '';
        rateInput.value = '';
      }
    }
  }

  addEventListeners() {
    const movieForm = document.getElementById('movie-form') as HTMLFormElement;
    if (movieForm) {
      movieForm.addEventListener('submit', (event) => this.addMovieFromForm(event));
    }

    const nameHeader = document.getElementById('name-header') as HTMLElement;
    const rateHeader = document.getElementById('rate-header') as HTMLElement;

    if (nameHeader) {
      nameHeader.addEventListener('click', () => {
        this.movieManager.sortMovies('name');
        this.renderMovies(); 
      });
    }

    if (rateHeader) {
      rateHeader.addEventListener('click', () => {
        this.movieManager.sortMovies('rate');
        this.renderMovies(); 
      });
    }
  }
}

const movieManager = new MovieManager();
const ui = new UI(movieManager);


ui.renderMovies();
ui.addEventListeners();