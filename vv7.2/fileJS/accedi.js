function Accedi() {
    const emailInput = document.getElementById("email").value;
    const passInput = document.getElementById("password").value;
    const ruoloInput = document.getElementById("ruolo").value;

    const listUser = JSON.parse(localStorage.getItem("account")) || [];
    
    // Cerchiamo l'utente che corrisponde a tutte e tre le credenziali
    const utenteTrovato = listUser.find(u => 
        u.email === emailInput && 
        u.password === passInput && 
        u.tipo === ruoloInput
    );

    if (utenteTrovato) {
        sessionStorage.setItem("accountLoggato", JSON.stringify(utenteTrovato));
        window.location.href = "visualizzazioneAccount.html";
    } else {
        alert("Credenziali errate o ruolo non corrispondente.");
    }
}