'use strict'

// Random title mechanism
const titles = [`Time to shine!`, `Look at you go, cupcake!`, `Coffee break!`, `Congrats, champ !`]
const faces = ['(⌐■_■)', 'ᕕ(ʘvʘ)ᕗ', '|■ᨎ■|', '( ͡° ͜ʖ ͡°)']
window.onload = () => {
    const title = document.getElementById('title')
    title.innerText = titles[Math.floor(Math.random() * titles.length)]

    const lennyFace = document.getElementById('lenny_face')
    lennyFace.innerText = faces[Math.floor(Math.random() * faces.length)]
}

// Autosize textarea mechanism
let textareas = document.getElementById('message_textarea'),
    hiddenDiv = document.createElement('div')

hiddenDiv.classList.add('hiddenDiv')

textareas.addEventListener('input', function() {
    const submitMessageBtn = document.getElementById('submit_message')

    if (!!this.value.trim()) {
        submitMessageBtn.removeAttribute('disabled')
    } else {
        submitMessageBtn.setAttribute('disabled', true)
    }

    // Append hiddendiv to parent of textarea, so the size is correct
    this.parentNode.appendChild(hiddenDiv);

    // The <br ..> part is for old IE
    // This fixes the jumpy way the textarea grows if line-height isn't included
    hiddenDiv.innerText = this.value + '<br style="line-height: 10px;">'

    // Briefly make the hidden div block but invisible
    // This is in order to read the height
    requestAnimationFrame(() => {
        hiddenDiv.style.visibility = 'hidden';
        hiddenDiv.style.display = 'block';
        this.style.height = hiddenDiv.getBoundingClientRect().height + 'px'

        // Make the hidden div display:none again
        hiddenDiv.style.visibility = 'visible'
        hiddenDiv.style.display = 'none'
    })
});


// Post a message mechanism
const submitMessageBtn = document.getElementById('submit_message')

submitMessageBtn.addEventListener('click', function() {
    const textArea = document.getElementById('message_textarea')
    const messageTemplate = document.getElementById('message_template')
    const listMessages = document.getElementsByClassName('list_messages')[0]

    if (!textArea.value.trim()) {
        return
    }

    const message = createNodeFromMessageTemplate(messageTemplate, textArea)
    addMessageToList(message, listMessages)

    resetTextArea(textArea)

    this.setAttribute('disabled', true)
})

function createNodeFromMessageTemplate(messageTemplate, textArea) {
    const div = messageTemplate.content.querySelector("div.message");
    const node = document.importNode(div, true)

    // Time
    const time = document.createElement('time')
    const localeDate = `${(new Date()).toLocaleString('en-EN')}`
    time.innerText = `${localeDate}`
    time.setAttribute('title', `Posted on ${localeDate}`)
    time.classList.add('message_time')

    // BR
    const br = document.createElement('br')

    //Text
    const p = node.querySelector('div.message_content > p')
    p.innerText = `${textArea.value.trim()}`
    p.appendChild(br)
    p.appendChild(time)



    // Avatar
    const avatar = node.querySelector('.avatar > span')
    avatar.innerText = 'TT'

    return node
}

function addMessageToList(message, listMessages) {
    listMessages.appendChild(message)
}

function resetTextArea(textArea) {
    textArea.value = ''
    requestAnimationFrame(() => {
        // < IE 9 compatibility
        if (textArea.style.removeProperty) {
            textArea.style.removeProperty('height');
        } else {
            textArea.style.removeAttribute('height');
        }
    })
}