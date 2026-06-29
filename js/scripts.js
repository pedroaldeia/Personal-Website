const scriptUrl = new URL(document.currentScript?.src ?? window.location.href);
const siteRootUrl = new URL("../", scriptUrl);

function resolveSiteHref(path) {
    return new URL(path.replace(/^\//, ""), siteRootUrl).href;
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

// load wip ascii art

