const baseURL = "https://www.thecolorapi.com"
const schemeEndpoint = "/scheme"

document.getElementById('color-scheme-btn').addEventListener('click', (evt) => {
    const color = document.getElementById('color-input').value;
    const schemeType = document.getElementById("color-scheme-input").value;

    const apiURL = `${baseURL}${schemeEndpoint}?hex=${color.slice(1)}&mode=${encodeURIComponent(schemeType)}`
    fetch(apiURL).then(res => res.json()).then(data => {
        redrawColors(data.colors);
    });
})

document.getElementById('color-output').addEventListener('click',(evt) => {
    if(evt.target.dataset.color) {
        navigator.clipboard.writeText(evt.target.dataset.color);
        notify('Copied to clipboard!');
    }
})

function redrawColors(colors) {
    document.getElementById('color-output').innerHTML = colors.map((color) => (`
        <div class="color-col">
            <div class="color-panel" style="background: ${color.hex.value}" data-color="${color.hex.value}"></div>
            <div class="color-label" data-color="${color.hex.value}">${color.hex.value}</div>
        </div>
    `)).join("");
}

function notify(content)
{
    const noteEl = document.getElementById('notify');
    noteEl.textContent = content;
    noteEl.classList.remove('hidden');
    setTimeout((e) => {
       noteEl.classList.add('hidden');
    },500)
}
