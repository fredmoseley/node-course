const fs = require('fs')
const chalk = require('chalk');


const addNote = (title, body) => {
    //load existing note
    let notes = loadNotes();
    //console.log(`Read Notes:`,notes);
    debugger;

    const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find(note => note.title === title);
    //console.log(`duplicate notes `, duplicateNotes)
    if (!duplicateNote) { //returns undefined
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes) ? console.log(chalk.bgGreen(`New note with title ${title} added`)) : console.log(`Something went wrong!!!`);
    } else {
        console.log(chalk.red(`ERROR: A note with the title: "${title}" already exists`));
    }
}
const removeNote = (title) => {
    let remainingNotes;
    //get existing notes -- returns array of notes
    const notes = loadNotes();
    const index = notes.findIndex((note) => note.title === title)
    if (index !== -1) {
        remainingNotes = notes.filter((note) => note.title !== title);
        saveNotes(remainingNotes) ? console.log(chalk.green.inverse(`Deleted note with title: ${title}`)) : console.log(`SOMETHING WENT WRONG!!!`)

    } else {
        console.log(chalk.red.inverse(`Error I could not find a note with title: ${title}`));
    }

}


const saveNotes = (notes) => {
    //Stringify JSON
   // try {
        const dataJSON = JSON.stringify(notes);
        fs.writeFileSync('notes.json', dataJSON);
        return true
   // } catch (e) {
    //    console.log(chalk.red(`Could not save notes!!!\n${e}`))
    //}
}

const loadNotes = () => {
    //defensive code to catch error
    let dataBuffer, dataJSON;
    try {
        dataBuffer = fs.readFileSync('notes.json')
        dataJSON = dataBuffer.toString()
        //console.log(dataJSON);
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }

}

const listNotes = () => {
    //get notes
    notes = loadNotes();
    if (notes) {
        console.log(chalk.green.inverse(`Your Notes:`))
        notes.forEach(note => console.log(note.title));
    }
}

const readNote = (title) => {
    notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title);
    //log the note to console
    try {
        if (noteToRead) {
            console.log(chalk.inverse(noteToRead.title));
            console.log(noteToRead.body);
        } else {
            console.log(chalk.red.inverse(`Note with title ${title} does not exist`));
        }
    } catch (e) {
        console.log(chalk.red.inverse(`Unable to read note ${e}`));
    }

}
module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote,
}