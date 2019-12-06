export function applyAutosize(textarea) {

    const hiddenDiv = document.createElement('div')

    hiddenDiv.classList.add('hiddenDiv')

    textarea.addEventListener('input', function() {   
        autosize(this, hiddenDiv)     
    });
}


function autosize(textarea, hiddenDiv) {

    // Append hiddendiv to parent of textarea, so the size is correct
    textarea.parentNode.appendChild(hiddenDiv);

    // The <br ..> part is for old IE
    // This fixes the jumpy way the textarea grows if line-height isn't included
    hiddenDiv.innerText = textarea.value + '<br style="line-height: 10px;">'

    // Briefly make the hidden div block but invisible
    // This is in order to read the height
    requestAnimationFrame(() => {
        hiddenDiv.style.visibility = 'hidden';
        hiddenDiv.style.display = 'block';
        textarea.style.height = hiddenDiv.getBoundingClientRect().height + 'px'

        // Make the hidden div display:none again
        hiddenDiv.style.visibility = 'visible'
        hiddenDiv.style.display = 'none'
    })
}