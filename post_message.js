export function submitMessage(listMessages, msgTemplate, textarea) {
    if (!textarea.value.trim()) {
        return
    }
    const message = createNodeFromMessageTemplate(msgTemplate, textarea)
    addMessageToList(message, listMessages)
    resetTextArea(textarea)

    disableBtn(this)
}

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

export function resetTextArea(textArea) {
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

export function disableBtn(btn) {
    btn.setAttribute('disabled', true)
}

export function enableBtn(btn) {
    btn.removeAttribute('disabled')
}