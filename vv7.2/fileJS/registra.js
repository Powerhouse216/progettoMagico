// Se già loggato, vai al profilo
if (sessionStorage.getItem("accountLoggato")) {
    window.location.href = "visualizzazioneAccount.html";
}

function registrati() {
    const erroreBox = document.getElementById("Errore");
    
    const user = {
        name: document.getElementById("nome").value,
        surname: document.getElementById("cognome").value,
        email: document.getElementById("email").value,
        codF: document.getElementById("codice_fiscale").value,
        password: document.getElementById("password").value,
        confPassword: document.getElementById("confPassword").value,
        tipo: document.getElementById("ruolo").value // ID aggiornato
    };

    // Validazione
    if (Object.values(user).some(val => !val)) {
        alert("Per favore, compila tutti i campi.");
        return;
    }

    if (user.password !== user.confPassword) {
        erroreBox.innerText = "Le password non corrispondono!";
        return;
    }

    const listUser = JSON.parse(localStorage.getItem("account")) || [];
    
    if (listUser.some(u => u.email === user.email)) {
        alert("Questa email è già registrata.");
        return;
    }

    listUser.push(user);
    localStorage.setItem("account", JSON.stringify(listUser));
    alert("Registrazione completata! Ora puoi accedere.");
    window.location.href = "accesso.html";
}