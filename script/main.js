const json = [
    {
        name: 'L. Messi',
        country: 'Argentina',
        club: 'PSG',
        rating: '93',
        jersey: '30',
        position: 'RW',
    },
    {
        name: 'R. Lewandowski',
        country: 'Poland',
        club: 'Bayern Munchen',
        rating: '92',
        jersey: '9',
        position: 'ST',
    },
    {
        name: 'Cristiano Ronaldo',
        country: 'Portugal',
        club: 'Manchester United',
        rating: '91',
        jersey: '7',
        position: 'ST',
    },
    {
        name: 'Neymar Jr',
        country: 'Brazil',
        club: 'PSG',
        rating: '91',
        jersey: '10',
        position: 'LW',
    },
    {
        name: 'K. De Bruyne',
        country: 'Belgium',
        club: 'Manchester City',
        rating: '91',
        jersey: '7',
        position: 'CM',
    },
    {
        name: 'J. Oblak',
        country: 'Slovenia',
        club: 'Atletico de Madrid',
        rating: '91',
        jersey: '13',
        position: 'GK',
    },
    {
        name: 'K. Mbappe',
        country: 'France',
        club: 'PSG',
        rating: '91',
        jersey: '7',
        position: 'ST',
    },
    {
        name: 'M. Neuer',
        country: 'Germany',
        club: 'Bayern Munchen',
        rating: '90',
        jersey: '1',
        position: 'GK',
    },
    {
        name: 'M. ter Stegen',
        country: 'Germany',
        club: 'Barcelona',
        rating: '90',
        jersey: '1',
        position: 'GK',
    },
    {
        name: 'H. Kane',
        country: 'England',
        club: 'Tottenham Hotspur',
        rating: '90',
        jersey: '10',
        position: 'ST',
    },
]


// ----------------
// Global Variables
const randomPlayer = json[Math.floor(Math.random() * json.length)]
let countryList = []
let clubList = []
const diff = {
    same: 1,
    near: 2,
    far: 3
}

const button = document.querySelector('button')
const inputText = document.querySelector('input')
const select = document.querySelector('select');
const datalist = document.querySelector('datalist')
const guesser = document.querySelector('.guesser')
let guessCount = 0
let guessedPlayer = inputText.value

// ------------
// HTML related
for (let i = 0; i < json.length; i++) {
    let opt = document.createElement('option')
    opt.value = json[i].name;
    datalist.appendChild(opt)
    countryList.push(json[i].country)
    clubList.push(json[i].club)
}

button.addEventListener('click', (e) => {
    if (guessCount == 6) {
        guesser.innerHTML = "<div class=\"looser\" style=\"color: var(--fg2);\">You LOOSE!!!</div><br><div>Refresh to retry</div>"
        return;
    }
    guessedPlayer = inputText.value
    const clazz = document.querySelector('.player' + (guessCount + 1))
    clazz.firstElementChild.innerHTML = guessedPlayer
    if (randomPlayer.name == guessedPlayer) {
        check(randomPlayer, guessedPlayer, guessCount+1)
        guesser.innerHTML = "<div class=\"winner\">You WON!!!</div><br><div>Refresh to play again</div>"
        return
    } else {
        check(randomPlayer, guessedPlayer, guessCount+1)
    }
    guessCount++
})

// ---------
// Functions
const getDiff = (rNum = '', gNum = '') => {
    if (Math.abs(parseInt(rNum) - parseInt(gNum)) == 0) {
        return diff.same
    }
    if (Math.abs(parseInt(rNum) - parseInt(gNum)) < 5) {
        return diff.near
    } else {
        return diff.far
    }
}

function check(random = {}, guessed = "", guessC=1) {
    let idx = 0;
    for (let i = 0; i < json.length; i++) {
        if (json[i].name == guessed) {
            idx = i
            break
        }
    }
    let isSameCountry = (json[idx].country == random.country) ? diff.same : diff.far;
    let isSameClub = (json[idx].club == random.club) ? diff.same : diff.far;
    let isSameNumber = getDiff(json[idx].jersey, random.jersey);
    let isSameRating = getDiff(json[idx].rating, random.rating);
    let isSamePosition = (json[idx].position == random.position) ? diff.same: diff.far;

    const country = document.querySelector('.country'+guessC);
    const club = document.querySelector('.club'+guessC);
    const fut = document.querySelector('.fut'+guessC);
    const jersey = document.querySelector('.jer'+guessC);
    const position = document.querySelector('.pos'+guessC);


    if(isSameCountry==diff.same) {
        country.classList.toggle('same')
    } else {country.classList.toggle('far')}

    if(isSameClub==diff.same) {
        club.classList.toggle('same')
    } else {club.classList.toggle('far')}

    if(isSameNumber==diff.same) {
        jersey.classList.toggle('same')
    } else if(isSameNumber==diff.near) {
        jersey.classList.toggle('near')
    } else {jersey.classList.toggle('far')}

    if(isSameRating==diff.same) {
        fut.classList.toggle('same')
    } else if(isSameRating==diff.near) {
        fut.classList.toggle('near')
    } else {fut.classList.toggle('far')}

    if(isSamePosition==diff.same) {
        position.classList.toggle('same')
    } else {position.classList.toggle('far')}
}

