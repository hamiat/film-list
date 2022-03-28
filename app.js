// Film Class : represents a film
class Film {
    constructor(title, year, thoughts) {
        this.title = title;
        this.year = year;
        this.thoughts = thoughts
    }
}

//UI Class : handle ui tasks
class UI {
    static displayFilms() {
        const storedFilms = [
            {
                title: "Film one",
                year: 2000,
                thoughts: "It was just ok."
            },
            {
                title: "Film Two",
                year: 2001,
                thoughts: "It was just bad."
            },
        ];

        const films = storedFilms;
        films.forEach(film => UI.addFilmToList(film))
        
    }
    static addFilmToList(film) {
        const list = document.querySelector("#film-list");
        const row = document.createElement("tr");

        row.innerHTML =   `
        <td>${film.title}</td>
        <td>${film.year}</td>
        <td>${film.thoughts}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `; 
        list.appendChild(row);
        
    }

    //event propagation
    static deleteFilm(el) {
        
        if(el.classList.contains("delete")) {
            //el.parentElement.parentElement being the created tr (row)
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#year").value = "";
        document.querySelector("#thoughts").value = "";
    }
}

//Store Class : handle storage


/****Event: Display films ******/
document.addEventListener("DOMContentLoaded", UI.displayFilms)

 
/****Event: Add a book******/
const form = document.querySelector("#film-form");
form.addEventListener("submit", (e) => {
   

   
    //get values
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const thoughts = document.querySelector("#thoughts").value;

    console.log(title, year, thoughts)

    //instantiate film
    const film =  new Film(title, year, thoughts);
  
    //Add film to UI
    UI.addFilmToList(film);

    //clear field
    UI.clearFields(film);  

    

}) 




/****Event: Remove a book******/
//film-list created in addFilmToList()
document.querySelector("#film-list").addEventListener("click", e => {
    UI.deleteFilm(e.target)
})
