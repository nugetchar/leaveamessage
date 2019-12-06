'use strict'

import { subhead } from './titles.js'
import { applyAutosize } from './textarea.js'
import { resetTextArea, submitMessage, disableBtn, enableBtn } from './post_message.js'

const submitMessageBtn = document.getElementById('submit_message')
const textarea = document.getElementById('message_textarea')
const messageTemplate = document.getElementById('message_template')
const listMessages = document.querySelector('.list_messages')

subhead('h2#subhead')
applyAutosize(textarea)

submitMessageBtn.addEventListener('click', function() {
    submitMessage.call(this, listMessages, messageTemplate, textarea)
})

textarea.addEventListener('keydown', function(e) {   
    if (e.keyCode === 13 && !textarea.value.trim()) {
        e.preventDefault()
        resetTextArea(textarea)
        return
    }

    if (!e.shiftKey && e.keyCode === 13) {
        e.preventDefault()
        submitMessage.call(submitMessageBtn, listMessages, messageTemplate, textarea)
        return
    }
})

textarea.addEventListener('input', function(e) {
    if (!!e.target.value.trim()) {
        enableBtn(submitMessageBtn)
    } else {
        disableBtn(submitMessageBtn)
    }
})

// everytime the user just type something, we put the focus on
// textarea
window.addEventListener('keypress', function(e) {
    if (document.activeElement !== textarea && !textarea.value && e.keyCode !== 13) {
        textarea.focus()
    }
})