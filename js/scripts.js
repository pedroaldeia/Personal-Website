const scriptUrl = new URL(document.currentScript?.src ?? window.location.href);
const siteRootUrl = new URL("../", scriptUrl);

function resolveSiteHref(path) {
    return new URL(path.replace(/^\//, ""), siteRootUrl).href;
}

// wave look header
function drawWave() {
    const canvas = document.getElementById("wave");
    const dpr = window.devicePixelRatio || 1;

    const displayWidth = document.documentElement.clientWidth;
    const displayHeight = window.innerHeight / 16;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";


    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    
    let amplitude = 20;
    let wavelength = 200;
    let offset = displayHeight / 2;
    let phase = 0;
    let width = 5;
    
    
    ctx.beginPath();
    ctx.lineWidth = 4;
    for (let x = 0; x <= displayWidth; x++) {
        let y = amplitude * Math.sin((x + phase) * 2 * Math.PI / wavelength) + offset;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "darkslateblue"
    ctx.stroke();
}

// load header
const headerContainer = document.getElementById("header");
if (headerContainer) {
    fetch(new URL("../fragments/header.html", scriptUrl))
        .then(res => res.text())
        .then(html => {
            headerContainer.innerHTML = html;
            headerContainer.querySelectorAll("a[href]").forEach(link => {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("http")) {
                    link.href = resolveSiteHref(href);
                }
            });
            drawWave();
            window.addEventListener("resize", drawWave);
        });
}


// load footer
const footerContainer = document.getElementById("footer");
if (footerContainer) {
    fetch(new URL("../fragments/footer.html", scriptUrl))
        .then(res => res.text())
        .then(html => {
            footerContainer.innerHTML = html;

            const date = new Date(document.lastModified);
            const formatted = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            const lastUpdated = document.getElementById("last_updated");
            if (lastUpdated) {
                lastUpdated.textContent = formatted;
            }
        });
}


