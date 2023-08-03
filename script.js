
fetch('/films/1')
  .then(response => response.json())
  .then(movieData => {
    const moviePoster = document.getElementById('moviePoster');
    const movieTitle = document.getElementById('movieTitle');
    const movieRuntime = document.getElementById('movieRuntime');
    const movieShowtime = document.getElementById('movieShowtime');
    const availableTickets = document.getElementById('availableTickets');
    const buyTicketBtn = document.getElementById('buyTicketBtn');

    moviePoster.src = movieData.poster;
    movieTitle.textContent = movieData.title;
    movieRuntime.textContent = `${movieData.runtime} min`;
    movieShowtime.textContent = movieData.showtime;
    
    const remainingTickets = movieData.capacity - movieData.tickets_sold;
    availableTickets.textContent = `${remainingTickets} tickets available`;

    buyTicketBtn.addEventListener('click', () => {
      if (remainingTickets > 0) {
        availableTickets.textContent = `${remainingTickets - 1} tickets available`;

        // Add logic for purchasing tickets (if needed)

        if (remainingTickets - 1 === 0) {
            buyTicketBtn.textContent = 'Sold Out';
            buyTicketBtn.disabled = true;

        }
      }
    });
  });


  fetch('/films')
  .then(response => response.json())
  .then(movieList => {
    const filmsList = document.getElementById('films');
    
    movieList.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.textContent = movie.title;
      listItem.classList.add('film', 'item');

      
      listItem.addEventListener('click', () => {
          fetch(`/films/${movie.id}`)
              .then(response => response.json())
              .then(clickedMovie => {
                  moviePoster.src = clickedMovie.poster;
                  movieTitle.textContent = clickedMovie.title;
                  movieRuntime.textContent = `${clickedMovie.runtime} min`;
                  movieShowtime.textContent = clickedMovie.showtime;

                  const remainingTickets = clickedMovie.capacity - clickedMovie.tickets_sold;
                  availableTickets.textContent = `${remainingTickets} tickets available`;

                  if (remainingTickets === 0) {
                      buyTicketBtn.textContent = 'Sold Out';
                      buyTicketBtn.disabled = true;
                      listItem.classList.add('sold-out');
                  } else {
                      buyTicketBtn.textContent = 'Buy Ticket';
                      buyTicketBtn.disabled = false;
                      listItem.classList.remove('sold-out');
                  }
              });
      });

      filmsList.appendChild(listItem);
    });
  });
