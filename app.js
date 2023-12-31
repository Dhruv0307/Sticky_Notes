console.log('Welcome to sticky notes')

showNotes()

let addBtn = document
    .getElementById('addBtn')
    .addEventListener('click', function () {
        let addTxt = document.getElementById('addTxt')
        let notes = localStorage.getItem('notes')
        if (notes == null) {
            notesObj = []
        } else {
            notesObj = JSON.parse(notes)
        }
        notesObj.push(addTxt.value)
        localStorage.setItem('notes', JSON.stringify(notesObj))
        addTxt.value = ''
        showNotes();
})

// function to show notes
function showNotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ''
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card my-3 mx-3 noteCard" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>
        `;
    })
    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    } else {
        notesElm.innerHTML = `<h5>Nothing to show! Add note first</h5>`
    }
}

// function to delete note
function deleteNote(index) {
    console.log(`Note ${index} deleted`)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}

let search = document.getElementById('search');
search.addEventListener('input',function(){
    let inputval = search.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

})
