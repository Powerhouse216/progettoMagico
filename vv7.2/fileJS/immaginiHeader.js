// Mostra l'immagine profilo nell'header in tutte le pagine
document.addEventListener("DOMContentLoaded", function () {

    const headerImg = document.getElementById("header-profile-img");
    if (!headerImg) return;

    const sessionUser = JSON.parse(sessionStorage.getItem("accountLoggato"));

    if (sessionUser && sessionUser.profileImage) {
        headerImg.src = sessionUser.profileImage;
    } else {
        headerImg.src = "immagini/account.png";
    }

});
