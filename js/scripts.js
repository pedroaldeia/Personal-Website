// load header
fetch("/fragments/header.html")
    .then(res => res.text())
    .then(html => document.getElementById("header").innerHTML = html)


// load footer
fetch("/fragments/footer.html")
    .then(res => res.text())
    .then(
        html => {
        document.getElementById("footer").innerHTML = html;

        const date = new Date(document.lastModified);
        const formatted = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        document.getElementById("last_updated").textContent = formatted;
    });

// load wip ascii art

