import { catsData } from "./data.js"
const emotionRadiosDiv = document.getElementById('emotion-radios')
const isGifOnly = document.getElementById('gifs-only-option')
const getImageBtn = document.getElementById('get-image-btn')
const memeImageModal = document.getElementById('meme-modal-inner')

//we have to get the emotions from cats data - Done
//remove duplicate emotions - Done
//create radio button against the emotion - Done
//style the selected radio button - Done
//add the logic to return the object based on selection on isGifOnly Checkbox when clicked on Get Image button
//get the image from images and render into HTML by using the cat object we are getting, when clicked on Get Image button

function getEmotionsArrayFromCatsData(cats){
    const emotionsArray = []
    cats.forEach(function(cat){
        cat.emotionTags.forEach(function(emotion){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        })
    })
    return emotionsArray
}


function renderEmotionsInHTML(cats){
    const emotions = getEmotionsArrayFromCatsData(cats)//it would be an array
    const fragment = document.createDocumentFragment()
    for(let emotion of emotions){
        // console.log(emotion)
        const label = document.createElement('label')
        // adding properties to label element
        Object.assign(label, {
            htmlFor: emotion,
            textContent: emotion,
            // id: emotion
        })
        const inputRadioButton = document.createElement('input')
        // adding properties to radio element
        Object.assign(inputRadioButton, {
            type: 'radio',
            id: emotion,
            value: emotion,
            name: 'emotion-group'
        })
        const parentDiv = document.createElement('div')
        parentDiv.classList.add('radio')//Adding class called 'radio' to holder of label and radio
        parentDiv.appendChild(label)
        parentDiv.appendChild(inputRadioButton)
        fragment.appendChild(parentDiv)
    }
    emotionRadiosDiv.appendChild(fragment)
}

renderEmotionsInHTML(catsData)

emotionRadiosDiv.addEventListener('change', function(event){
    //when we use 'click' listener and clicked on div, we are getting two IDs in this case
    //so using 'change' listener
    const id = event.target.id
    highlightCheckedRadioButton(id)
})

function highlightCheckedRadioButton(id){
    const emotionDivCollection = document.getElementsByClassName('radio')
    for(let emotionDiv of emotionDivCollection){
        // console.log(emotion)
        // if(emotion.className.includes('highlight')){
            emotionDiv.classList.remove('highlight')
        // }
    }
    if(id){
        document.getElementById(id).parentElement.classList.add('highlight')
    }
}

getImageBtn.addEventListener('click', getCatObjectsAsPerUserSelection)

function getCatObjectsAsPerUserSelection(){
    const checkedEmotionValue = getCheckedRadioButton().value
    console.log(checkedEmotionValue)
    let catObjects
    if(isGifOnly.checked){
        catObjects = catsData.filter(function(cat){
            return cat.emotionTags.includes(checkedEmotionValue) && cat.isGif //=== isGifOnly.checked//obvs true and cat.isGif works
        })
    }else{
        catObjects = catsData.filter(function(cat){
            return cat.emotionTags.includes(checkedEmotionValue)
        })
    }
    console.log(catObjects)
    getSingleCatObjectAsPerUserSelection(catObjects)
}

function getCheckedRadioButton(){
    return document.querySelector("input[type='radio']:checked")
}

function getSingleCatObjectAsPerUserSelection(catObjects){
    const lengthOfArray = catObjects.length
    const selectedCatObject = selectRandomCatObject(catObjects, lengthOfArray)
    console.log("selectedCatObject: " + selectedCatObject)
    console.log(selectedCatObject)
    const imageFromSelectedObject = selectedCatObject.image
    console.log(imageFromSelectedObject)
    renderImageModal(imageFromSelectedObject)
}

function selectRandomCatObject(catObjects, lengthOfArray){
   const randomIndex = Math.floor(Math.random() * lengthOfArray)
   return catObjects[randomIndex]
}

function renderImageModal(imageName){
    const image = document.createElement('img')
    image.setAttribute('src', './images/'+imageName)
    image.classList.add('cat-img')
    memeImageModal.appendChild(image)
    memeImageModal.parentElement.style.display = 'flex'
}