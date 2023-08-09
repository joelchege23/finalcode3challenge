document.addEventListener("DOMContentLoaded", () => {
    fetchFilms();
  });

  const dataUrl =
    "https://peter-sila1.github.io/WK3-Code-Challenge-Flatdango/db.json";

  //Fetch all films
  function fetchFilms() {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        // render the first element of films array once document loaded
        renderOneFilm(data.films[0]);

        // display list of all available films on the page load
        data.films.map((film) => renderFilms(film));
      });
  }

  function renderFilms(film) {
    let availableTickets;

    availableTickets = film.capacity - film.tickets_sold;
    let div = document.createElement("div");
    div.id = "film_item";
    div.classList.add("flex", "gap-3");

    div.innerHTML = `
          <img
          id="film_thumb"
          src=${film.poster}
          class="object-fill w-168 h-28 rounded cursor-pointer" />
          <div class="flex flex-col space-y-1">
            <h1 class="text-md font-bold cursor-pointer">${film.title}</h1>
            <div class="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_5_44)">
                  <path
                    d="M13.2222 6.52557C13.3668 6.41789 13.474 6.26768 13.5288 6.096C13.5837 5.92432 13.5834 5.73978 13.5281 5.56824C13.4728 5.39671 13.3652 5.24679 13.2204 5.13951C13.0755 5.03222 12.9008 4.97295 12.7206 4.97001L9.22056 4.83779C9.20335 4.8366 9.18685 4.83046 9.17305 4.82011C9.15925 4.80976 9.14874 4.79564 9.14278 4.77945L7.93334 1.51279C7.87257 1.34659 7.7622 1.20308 7.61717 1.10169C7.47214 1.0003 7.29946 0.945923 7.1225 0.945923C6.94555 0.945923 6.77286 1.0003 6.62783 1.10169C6.4828 1.20308 6.37244 1.34659 6.31167 1.51279L5.10611 4.79112C5.10015 4.80731 5.08964 4.82143 5.07584 4.83178C5.06204 4.84213 5.04554 4.84827 5.02834 4.84945L1.52834 4.98168C1.34813 4.98462 1.17336 5.04389 1.02853 5.15117C0.883708 5.25846 0.776092 5.40838 0.720772 5.57991C0.665453 5.75144 0.665205 5.93599 0.720062 6.10767C0.77492 6.27935 0.882133 6.42956 1.02667 6.53723L3.77222 8.69557C3.78596 8.70638 3.79623 8.72098 3.80176 8.73757C3.80729 8.75416 3.80784 8.772 3.80333 8.7889L2.85834 12.1372C2.80937 12.3077 2.81411 12.4892 2.87192 12.6569C2.92973 12.8246 3.03781 12.9704 3.18144 13.0746C3.32508 13.1787 3.4973 13.236 3.67467 13.2388C3.85205 13.2415 4.02597 13.1896 4.17278 13.09L7.07389 11.1456C7.08818 11.1357 7.10514 11.1304 7.1225 11.1304C7.13987 11.1304 7.15682 11.1357 7.17111 11.1456L10.0722 13.09C10.217 13.193 10.3903 13.2483 10.5681 13.2483C10.7458 13.2483 10.9191 13.193 11.0639 13.09C11.2076 12.9869 11.3157 12.8418 11.3735 12.6746C11.4313 12.5075 11.4359 12.3265 11.3867 12.1567L10.4339 8.79668C10.4288 8.77981 10.4291 8.76179 10.4347 8.74509C10.4403 8.72839 10.4508 8.71381 10.465 8.70334L13.2222 6.52557Z"
                    fill="#F5C518"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5_44">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p class="text-sm">8.2</p>
            </div>
            <p class="text-sm">Duration : ${film.runtime} min</p>
          </div>
            `;
      document.querySelector("#film_list").appendChild(div);

      // perfom display of details of clicked film
      div.addEventListener("click", showDetails);

      // display details of clicked movie from list of films
      function showDetails() {
        let about = document.querySelector("#about");
        let title = document.querySelector("#title");
        let img = document.querySelector("#poster_img");
        let showtime = document.querySelector("#showtime");
        let capacity = document.querySelector("#capacity");
        let available = document.querySelector("#available_tickets");
        let duration = document.querySelector("#duration");

        title.textContent = film.title;
        about.textContent = film.description;
        img.src = film.poster;
        showtime.textContent = film.showtime;
        capacity.textContent = film.capacity;
        available.textContent = availableTickets;
        duration.textContent = film.runtime;

        let ticketBtnDet = document.createElement("button");
        ticketBtnDet.id = "ticketBtnDet";
        ticketBtnDet.classList.add(
          "bg-clifford",
          "px-2",
          "py-0.5",
          "mt-3",
          "rounded",
          "text-white"
        );
        ticketBtnDet.textContent = "Buy Ticket";
        document.querySelector("#ticket").appendChild(ticketBtnDet);

        ticketBtnDet.addEventListener("click", buyTicket);

        // number of available tickets counter decrement during onclick of buy ticket button
        function buyTicket(e) {
          if (availableTickets >= 1) {
            availableTickets--;
            updatedTickets = availableTickets;
            available.textContent = availableTickets;
          } else if (availableTickets <= 0) {
            available.textContent = "Sold Out!";
            e.target.remove();
          }
        }

        if (document.querySelector("#ticket").children.length > 1) {
          document.querySelector("#ticket").children[0].remove();
        }
      }
    }
    // Display the first film element on page load
function renderOneFilm(film) {
    let availableTickets = film.capacity - film.tickets_sold;
    let about = document.querySelector("#about");
    let title = document.querySelector("#title");
    let img = document.querySelector("#poster_img");
    let showtime = document.querySelector("#showtime");
    let capacity = document.querySelector("#capacity");
    let available = document.querySelector("#available_tickets");
    let duration = document.querySelector("#duration");

    title.textContent = film.title;
    about.textContent = film.description;
    img.src = film.poster;
    showtime.textContent = film.showtime;
    capacity.textContent = film.capacity;
    available.textContent = film.capacity - film.tickets_sold;
    duration.textContent = film.runtime;

    let ticketBtn = document.createElement("button");
    ticketBtn.classList.add(
      "bg-clifford",
      "px-2",
      "py-0.5",
      "mt-3",
      "rounded",
      "text-white"
    );
    ticketBtn.textContent = "Buy Ticket";
    document.querySelector("#ticket").appendChild(ticketBtn);

    ticketBtn.addEventListener("click", buyTicket);

    // decrease number of available tickets for first element
    function buyTicket(e) {
      if (availableTickets >= 1) {
        availableTickets--;
        updatedTickets = availableTickets;
        available.textContent = availableTickets;
      } else if (availableTickets <= 0) {
        available.textContent = "Sold Out!";
        e.target.remove();
      }
    }
}