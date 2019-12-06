// titles module

const default_messages = [`Time to shine!`, `Look at you go, cupcake!`, `Coffee break!`, `Congrats, champ !`]
const default_faces = ['(⌐■_■)', 'ᕕ(ʘvʘ)ᕗ', '|■ᨎ■|', '( ͡° ͜ʖ ͡°)']

export function subhead(selector, messages = default_messages, faces = default_faces) {
    // Random title mechanism
    window.onload = () => {
        const subheadEl = document.querySelector(selector)
        const face = faces[Math.floor(Math.random() * faces.length)]
        const message = messages[Math.floor(Math.random() * messages.length)]            
        subheadEl.innerHTML = `<span>${face} -- [ ${message} ]</span>`
    }
}
