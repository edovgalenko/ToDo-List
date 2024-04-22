const notes = [
    {
        text: 'To do something',
        status: true
    },
    {
        text: 'To do something else',
        status: false
    }
]

const input = document.getElementById('note-text')
const create = document.getElementById('note-add')
const output = document.getElementById('notes-list')

function render() {
    output.innerHTML = ''
    if (notes.length === 0) {
        output.innerHTML = '<p>Looks like all done</p>'
    }
    for (let i = 0 ; i < notes.length ; i++) {
        output.insertAdjacentHTML('beforeend', noteTemplate(notes[i], i))
    }
}
render()

create.onclick = function () {
    if (input.value.length === 0) {
        return
    }

    const newNote = {
        text: input.value,
        status: false
    }
    notes.push(newNote)
    input.value = ''
    render()
}

output.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === 'toggle') {
            notes[index].status = !notes[index].status
        } else if (type === 'delete') {
            notes.splice(index)
        }

        render()
    }
}

function noteTemplate(note, i) {
    return `
    <div class="single-note">
        <div class="note-title ${note.status ? 'done' : ''}">${note.text}</div>
        <button class="note-toggle" data-type="toggle" data-index="${i}">✅</button>
        <button class="note-delete" data-type="delete" data-index="${i}">❌</button>
    </div>
    `
}