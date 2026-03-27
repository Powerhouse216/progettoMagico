document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("theme-toggle");
    const body = document.body;
    const img = document.querySelector(".logo-img");

    // Carica preferenza salvata
    const savedTheme = localStorage.getItem("theme");
    const LinkImg = localStorage.getItem("link");

    if (savedTheme === "dark") {
        body.classList.add("dark");
        toggle.checked = true;
    }

    toggle.addEventListener("change", function () {

        if (toggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
         
        } else {
            body.classList.remove("dark");
            localStorage.setItem("theme", "light");      
        }

    });

});