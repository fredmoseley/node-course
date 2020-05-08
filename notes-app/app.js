//const validator = require('validator');
//1. Core packages
const fs = require('fs');
//2. NPM packages
const chalk = require('chalk');
const yargs = require('yargs');

//3 Our packages
const notes = require('./notes');


//Customize yargs version
yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'The body of my note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const {title, body} = argv
        notes.addNote(title,body);
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
});


yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        console.log('List all notes');
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

//to use argument other than yargs.  Will use what is used by command handlers.
yargs.parse();


