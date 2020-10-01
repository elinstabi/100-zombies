var infectedHousesArray = [], //array of all the houses that is infected in each round
    infectedHousesFilterArray = [], //filtered array, no duplicate for counting how many new zombies to send out each round. 
    houses = 100, //the houses
    zombies = 0, //zombies value change in each round in function runUntilEveryoneIsZombies
    roundsUntilAllAreZombies = 0, //counting each time function runUntilEveryoneIsZombies runs
    roundsUntilAllAreZombiesArray = [], // when counting is done putted in this array
    sendingTheFirstZombie = document.querySelector('#sendZombie'); //selector for sending a zombie

//function sending out a zombie on click
sendingTheFirstZombie.addEventListener('click', function(){
    zombies = 1; //Sends a zoombie
    //If clicking the button one more time, array counting to ten is emptied
    if (roundsUntilAllAreZombiesArray.length > 0 ) {
        roundsUntilAllAreZombiesArray = [];
    }
    runUntilEveryoneIsZombies(); //this function will run until all houses are infected
});

function runUntilEveryoneIsZombies() {
    //if the program has run 10 times it till stop here
    if ((roundsUntilAllAreZombiesArray.length + 1) > 10) {
        everyOneHasBeenZombiesTenTimes();
        return;
    }
    if (infectedHousesFilterArray.length < 100) { //only runs if infected houses is below 100
        setTimeout(function(){ 
            //Sends amounth of zombies, from the beginning one then sets new value depending on how many new unique houses are infected. 
            for (var i = 0; i < zombies; i++) { 
                //Pick new random numbers same as amounth of zombies and push to infectedhouse array
                var newInfectedHousesFilterArray = 0,
                    randomHousesToInfect = Math.floor(Math.random() * houses + 1);
                for (var j = 0; j < randomHousesToInfect; j++) {
                    newInfectedHousesFilterArray++;
                }
                infectedHousesArray.push(newInfectedHousesFilterArray);
            }
            infectedHousesFilterArray = infectedHousesArray.filter(remoevDuplicateInfectedHousesFilterArrayFromArray); //Filter to unique array for infectedHousesFilterArray
            zombies = infectedHousesFilterArray.length + 1; //set new amounth of zombies for new round + the one that turned up from the beginning
            roundsUntilAllAreZombies++; //count times this function has been running
            zombifyChoosenHouses(); //sets new infected color of houses
            runUntilEveryoneIsZombies(); //keep running until hitting 100 zombies
        }, 100);
    } else { 
        console.log(infectedHousesFilterArray);
        zombifyChoosenHouses(); //sets new infected color of houses
        runUntilEveryOneHasBeenZombiesTenTimes(); //clear values and then keep running up to ten times
    } 
}

//zombifys houses by adding zombyfied class to houses with same nr in data attr as value in unique array for infectedHousesFilterArray
function zombifyChoosenHouses() {
    for (var i = 0; i < infectedHousesFilterArray.length; i++) { 
        var zombifyHouses = document.querySelector('[data-housenr*="'+infectedHousesFilterArray[i]+'"]');
        zombifyHouses.classList.add('zombyfied');
    }
}

//this runs untill all houses has been infected ten times
function runUntilEveryOneHasBeenZombiesTenTimes() {
    roundsUntilAllAreZombiesArray.push(roundsUntilAllAreZombies); //push 
    clearValuesToNextRun();
    cleanHouseFromZombie();
    runUntilEveryoneIsZombies();
}

//runs when everyone has been zombies ten times. Counts avarage value of function run before all houses are infected.
function everyOneHasBeenZombiesTenTimes() {
    var sumAllValues = roundsUntilAllAreZombiesArray.reduce(function (a, b) {return a + b;}, 0),
        devideSumAllValues = sumAllValues / 10,
        resultAvarageTimeToZombiesHundred = document.querySelector('[data-timesuntilallzombies]');
    resultAvarageTimeToZombiesHundred.innerHTML = 'Times each round ' + roundsUntilAllAreZombiesArray + '<br>Average value <strong>' + devideSumAllValues +'</strong>';
    cleanHouseFromZombie();
    clearValuesToNextRun();
} 

//clear values for next time to infect all houses 
function clearValuesToNextRun() {
    infectedHousesArray = [];
    infectedHousesFilterArray = [];
    zombies = 1;
    roundsUntilAllAreZombies = 0;
}

//reset color of houses to not infected
function cleanHouseFromZombie() {
    var cleanHouseFromZombie = document.querySelectorAll('.icon');
        for (var i = 0; i < cleanHouseFromZombie.length; i++) {
            cleanHouseFromZombie[i].classList.remove('zombyfied');
        }
}

//functions for removing duplicated value in array
function remoevDuplicateInfectedHousesFilterArrayFromArray(value, index, self) {
    return self.indexOf(value) === index;
}