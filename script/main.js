const json = []
let randomPlayer
let countryList = []
let clubList = []
const diff = { same: 1, near: 2, far: 3 }
const button = document.querySelector('button')
const inputText = document.querySelector('.searchbox')
const select = document.querySelector('select')
const datalist = document.querySelector('datalist')
const guesser = document.querySelector('.guesser')
let guessCount = 0
// let guessedPlayer = inputText.value
let guessedPlayer = ""
button.addEventListener('click', (e) => {
    guessedPlayer = select.options.item(select.options.selectedIndex).innerText
    const clazz = document.querySelector('.player' + (guessCount + 1))
    clazz.firstElementChild.innerHTML = guessedPlayer
    if (randomPlayer.name == guessedPlayer) {
        check(randomPlayer, guessedPlayer, guessCount + 1)
        guesser.innerHTML =
            '<div class="winner" style="color: var(--fg1);">You WON!!!</div><br>'
        const repeat = document.createElement('div')
        repeat.innerHTML = 'Refresh to play again'
        repeat.style.display = 'flex'
        repeat.style.alignItems = 'center'
        repeat.style.justifyContent = 'center'
        guesser.after(repeat)
        return
    } else {
        check(randomPlayer, guessedPlayer, guessCount + 1)
    }
    guessCount++
    if (guessCount == 6) {
        guesser.innerHTML =
            '<div class="looser" style="color: var(--fg2);">You LOOSE!!!</div><br>'
        const retry = document.createElement('div')
        const playerbox = document.createElement('p')
        playerbox.innerHTML = "Correct players was <b>" + randomPlayer.name + "</b>"
        playerbox.style.textAlign = 'center'
        retry.innerText = 'Refresh to retry'
        retry.style.display = 'flex'
        retry.style.alignItems = 'center'
        retry.style.justifyContent = 'center'
        guesser.after(retry)
        guesser.after(playerbox)
        return
    }
})
const getDiff = (rNum = '', gNum = '') => {
    if (Math.abs(parseInt(rNum) - parseInt(gNum)) == 0) {
        return diff.same
    } else if (Math.abs(parseInt(rNum) - parseInt(gNum)) < 3) {
        return diff.near
    } else {
        return diff.far
    }
}
function check(random = {}, guessed = '', guessC = 1) {
    let idx = 0
    for (let i = 0; i < json.length; i++) {
        if (json[i].name == guessed) {
            idx = i
            break
        }
    }
    let isSameCountry =
        json[idx].country == random.country ? diff.same : diff.far
    let isSameClub = json[idx].club == random.club ? diff.same : diff.far
    let isSameNumber = getDiff(json[idx].jersey, random.jersey)
    let isSameRating = getDiff(json[idx].rating, random.rating)
    let isSamePosition =
        json[idx].position == random.position ? diff.same : diff.far
    const country = document.querySelector('.country' + guessC)
    const club = document.querySelector('.club' + guessC)
    const fut = document.querySelector('.fut' + guessC)
    const jersey = document.querySelector('.jer' + guessC)
    const position = document.querySelector('.pos' + guessC)
    if (isSameCountry == diff.same) {
        country.style.backgroundColor = 'var(--fg1)'
    } else {
        country.style.backgroundColor = 'var(--fg4)'
    }
    country.innerHTML = json[idx].country
    if (isSameClub == diff.same) {
        club.style.backgroundColor = 'var(--fg1)'
    } else {
        club.style.backgroundColor = 'var(--fg4)'
    }
    club.innerHTML = json[idx].club
    if (isSameNumber == diff.same) {
        jersey.style.backgroundColor = 'var(--fg1)'
    } else if (isSameNumber == diff.near) {
        jersey.style.backgroundColor = 'orange'
    } else {
        jersey.style.backgroundColor = 'var(--fg4)'
    }
    jersey.innerHTML = json[idx].jersey
    if (isSameRating == diff.same) {
        fut.style.backgroundColor = 'var(--fg1)'
    } else if (isSameRating == diff.near) {
        fut.style.backgroundColor = 'orange'
    } else {
        fut.style.backgroundColor = 'var(--fg4)'
    }
    fut.innerHTML = json[idx].rating
    if (isSamePosition == diff.same) {
        position.style.backgroundColor = 'var(--fg1)'
    } else {
        position.style.backgroundColor = 'var(--fg4)'
    }
    position.innerHTML = json[idx].position
}
async function Load() {
    const response = await fetch('resources/players.json')
    const js = await response.json()
    js.forEach(function (val, idx, arr) {
        json.push(val)
    })
    randomPlayer = Object.assign(
        {},
        json[Math.floor(Math.random() * json.length)]
    )
    json.forEach((player) => {
        let option = document.createElement('option')
        option.value = player.name
        option.innerText = player.name
        // datalist.appendChild(option)
        select.options.add(option)
    })
}
Load()
