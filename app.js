// Film Class : represents a film
class Film {
  constructor(title, year, thoughts) {
    this.title = title;
    this.year = year;
    this.thoughts = thoughts;
  }
}

//UI Class : handle ui tasks
class UI {
  static displayFilms() {
    const storedFilms = [
      {
        title: "Film one",
        year: 2000,
        thoughts: "It was just ok.",
      },
      {
        title: "Film Two",
        year: 2001,
        thoughts: "It was just bad.",
      },
    ];

    const films = Store.getFilms();
    films.forEach((film) => UI.addFilmToList(film));
  }
  static addFilmToList(film) {
    const list = document.querySelector("#film-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${film.title}</td>
        <td>${film.year}</td>
        <td>${film.thoughts}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  //event propagation
  static deleteFilm(el) {
    if (el.classList.contains("delete")) {
      //el.parentElement.parentElement being the created tr (row)
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
      const div = document.createElement("div")
      //this for the bootstrap class
      div.className = `alert alert-${className}`
      //create a child with the message that's passed in
      div.appendChild(document.createTextNode(message))
      const container = document.querySelector(".container")
      const form = document.querySelector("#film-form");

      //insert div in container before form 
      container.insertBefore(div, form)

      //remove in 3 seconds (using alert class from above)
      setTimeout(() => document.querySelector(".alert").remove(), 3000)
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#year").value = "";
    document.querySelector("#thoughts").value = "";
  }
}

//Store Class : handle storage
class Store{
    static getFilms() {
        let films;
        if(localStorage.getItem("films") === null) {
            films = [];
        } else {
            films = JSON.parse(localStorage.getItem("films"));  
        }
        return films;

    }

    static addFilm(film) {
        const films = Store.getFilms();
        films.push(film);
        localStorage.setItem("films", JSON.stringify(films));
    }

    /* //this part is not working
    static removeFilm(title) {
        const films = Store.getFilms();

        films.forEach((film, index) => {
            if(film.title === title) {
               films.splice(index, 1);
            }
        });

        localStorage.setItem("films", JSON.stringify(films));
    } */
}

/****Event: Display films ******/
document.addEventListener("DOMContentLoaded", UI.displayFilms);

/****Event: Add a book******/
document.querySelector("#film-form").addEventListener("submit", (e) => {
    e.preventDefault();

  //get values
  const title = document.querySelector("#title").value;
  const year = document.querySelector("#year").value;
  const thoughts = document.querySelector("#thoughts").value;

  //validate
  if ((title === "") | (year === "") | (thoughts === "")) {
       //using the showAlert method when validation IS NOT successful to display the message below and add bootstrap class to element (the created  element (div))
    UI.showAlert("Please fill in all the fields", "danger")
  } else {
    //instantiate film
    const film = new Film(title, year, thoughts);

    //Add film to UI
    UI.addFilmToList(film);

    //Add film to store (local storage) 
    Store.addFilm(film);

    //Show success message
    //using the showAlert method when validation IS successful to display the message below and add bootstrap class to (the created  element (div))
    UI.showAlert("Film Added!", "success")

    //clear field
    UI.clearFields(film);
  }
});

/****Event: Remove a book******/
//film-list created in addFilmToList()
document.querySelector("#film-list").addEventListener("click", (e) => {
    //remove film from UI
  UI.deleteFilm(e.target);

  UI.showAlert("Film removed!", "success")

  /* //this part is not working
  //remove book from store
UI.removeFilm(e.target.parentElement.previousElementSibling.textContent)

*/
});
