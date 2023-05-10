import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = { databaseURL: "https://endorsments-e69a7-default-rtdb.europe-west1.firebasedatabase.app/" }

const app = initializeApp(appSetting)
const database = getDatabase(app)
const endorsmentsInDB = ref(database, "endorsementsList")
const deletePost = document.getElementById("bin-img")
const endorsmentsInput = document.getElementById("input-msg")
const publishBtn = document.getElementById("publish")
const noEntriesError = document.getElementById("endorsement-conatiner")
const toInput = document.getElementById("to")
const fromInput = document.getElementById("from")

let likeInc = 0;




publishBtn.addEventListener('click', function() {
    let inputEndorsment = endorsmentsInput.value
    let inputFrom = fromInput.value
    let inputTo = toInput.value
    let likesGiven = 0
    
    push(endorsmentsInDB, {namefrom: inputFrom, nameTo: inputTo, endorment:inputEndorsment, likes: likeInc})
    clearInput()
   
})


onValue(endorsmentsInDB, function(snapshot) {

    
    
    if (snapshot.exists() === true) {
        let endorsmentArray = Object.entries(snapshot.val())
        clearPage()

    for (let i = 0; i < endorsmentArray.length; i++ ) {
        let currentEndorsement = endorsmentArray[i]
        
        let dataKey = endorsmentArray[0]
        let dataVal = endorsmentArray[1]

        createElement(currentEndorsement)
    }
        }else {
            noEntriesError.innerHTML = "There are no endorsments..."
        }


})


function clearInput() {
    endorsmentsInput.value = '';
}

function clearPage() {
    noEntriesError.innerHTML = ''
}


function createElement(item) {
    
    let itemId = item[0]
    let itemValEndorse = item[1].endorment
    let itemValTo = item[1].nameTo
    let itemValFrom = item[1].namefrom
    let likeInc = item[1].likes


    const createEl = document.createElement("div")

    const endorsementText = document.createElement("p")
    const fromEl = document.createElement("h5")
    const toEl = document.createElement("h5")
    const likesEl = document.createElement('p')
    const binContainer = document.createElement('div')
    const bin = document.createElement("img")

    toEl.setAttribute("id", "to-person")
    createEl.setAttribute("class", "endorsment-holder")
    endorsementText.setAttribute("id", "endorsment-message")
    fromEl.setAttribute("id", "from-person")
    likesEl.setAttribute("id", "likes-given")
    binContainer.setAttribute('id', "bin-container")
    bin.setAttribute("id", "bin-img")
    bin.setAttribute("src", "bin_closed-removebg-preview.png")


    fromEl.textContent = `From ${itemValFrom}`
    toEl.textContent = `To ${itemValTo}`
    endorsementText.textContent = itemValEndorse
    likesEl.textContent = likeInc


    createEl.append(toEl)
    createEl.append(endorsementText)
    binContainer.append(fromEl)
    binContainer.append(likesEl)
    binContainer.append(bin)
    createEl.append(binContainer)
    
    bin.addEventListener('dblclick', function() {
        let exactPositionOfPostInDB = ref(database, `endorsementsList/${itemId}`)
         remove(exactPositionOfPostInDB)
    
    
     })
   
    
    likesEl.addEventListener('click', function() {
      likesEl.textContent= likeInc++
      update(database, `endorsementsList/${itemId}/likes`)  

    })
   
   

    noEntriesError.prepend(createEl)

 

}








