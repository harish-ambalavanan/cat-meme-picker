import { catsData } from "./data.js"
// console.log(catsData);
const emotionRadiosDiv = document.getElementById('emotion-radios')
const isGifOnly = document.getElementById('gifs-only-option')
const getImageBtn = document.getElementById('get-image-btn')

//we have to get the emotions from cats data
//remove duplicate emotions
//create radio button against the emotion
//style the selected radio button
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


function renderEmotionsInHTML(){
    const emotions = getEmotionsArrayFromCatsData(catsData)//it would be an array
    const fragment = document.createDocumentFragment()
    for(let emotion of emotions){
        console.log(emotion)
        const label = document.createElement('label')
        // adding properties to label element
        Object.assign(label, {
            htmlFor: emotion,
            textContent: emotion
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
        parentDiv.classList.add('radio')
        parentDiv.appendChild(label)
        parentDiv.appendChild(inputRadioButton)
        fragment.appendChild(parentDiv)
    }
    emotionRadiosDiv.appendChild(fragment)
}

renderEmotionsInHTML()











































































































// function getEmotionsArray(cats){
//     const emotionsArray = []
//     for (let cat of cats){
//         for (let emotion of cat.emotionTags){
//             emotionsArray.push(emotion)
//         }
//     }
//     return emotionsArray
// }


// function renderEmotionsRadios(cats){
//     const emotions = getEmotionsArray(cats)
//     console.log(emotions)
//     let emotionsData = ""
//     for(let emotion of emotions){
//         emotionsData += `
//         <div class="radio">
//             <label for="${emotion}">${emotion}<label/>
//             <input type="radio" name="emotion-choice" id="${emotion}" value="${emotion}">
//         </div>
//         `
//     }
//     emotionRadiosDiv.innerHTML = emotionsData
// }

// renderEmotionsRadios(catsData)
