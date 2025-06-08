class Movie {
  name: string;
  rate: number;

  constructor(name: string, rate: number) {
    this.name = name;
    this.rate = rate;
  }
}

class MovieManager {
  private movies: Movie[];

  constructor() {
    this.movies = [];
  }

  addMovie(name: string, rate: number) {
    const newMovie = new Movie(name, rate);
    this.movies.push(newMovie);
    this.sortMovies('rate'); 
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.sortMovies('rate');  
  }

  getMovies() {
    return this.movies;
  }

  sortMovies(sortBy: 'rate' | 'name') {
    if (sortBy === 'rate') {
      this.movies.sort((a, b) => b.rate - a.rate); 
    } else if (sortBy === 'name') {
      this.movies.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}

export { Movie, MovieManager };