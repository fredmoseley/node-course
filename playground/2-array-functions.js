const event = {
    name : 'Birthday Party',
    guestList : ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log(`Guest list for ${this.name}`);
        this.guestList.forEach(function(guest){
            console.log(`${guest} is attending ${this.name}`)
        },this)
    }
}

event.printGuestList()