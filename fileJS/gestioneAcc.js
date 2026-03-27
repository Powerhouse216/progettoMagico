    // Funzione che carica i dati dell'utente: usa l'utente appena loggato (sessionStorage)
    window.onload = function() {
        const sessionKey = "accountLoggato"; // la chiave in sessionStorage usata da Accedi
        const sessionUser = JSON.parse(sessionStorage.getItem(sessionKey));

        // Se l'utente non è loggato, reindirizzalo alla pagina di accesso
        if (!sessionUser) {
            window.location.href = "accesso.html";
            return;
        }

        const key2 = "account"; // La chiave del localStorage dove sono salvati i dati
        const listUser = JSON.parse(localStorage.getItem(key2)) || [];
        let currentUser = null;

        // Trova l'utente corrispondente in localStorage (match via email e tipo)
        const idx = listUser.findIndex(u => u.email === sessionUser.email && u.tipo === sessionUser.tipo);
        if (idx !== -1) {
            currentUser = listUser[idx];
        } else {
            // Se non lo trovi in localStorage, usa direttamente l'oggetto della sessione
            currentUser = sessionUser;
        }

        document.getElementById("profile-name").innerText = currentUser.name ;
        document.getElementById("profile-surname").innerText = currentUser.surname ;
        document.getElementById("profile-email").innerText = currentUser.email ;
        document.getElementById("profile-codF").innerText = currentUser.codF ;
        document.getElementById("profile-ruolo").innerText = currentUser.tipo;

        // Mostra l'immagine del profilo
        const profileImg = document.getElementById("profile-img");
        if (currentUser.profileImage) {
            profileImg.src = currentUser.profileImage; // Mostra l'immagine dal localStorage
        } else {
            profileImg.src = "immagini/account.png"; // Immagine di default se l'utente non ha caricato una foto
        }
    };

    // Funzione per caricare l'immagine profilo
    function caricaImmagine() {
        const fileInput = document.getElementById('profile-image-input');
        const file = fileInput.files[0];

        if (!file) {
            alert('Per favore seleziona un\'immagine');
            return;
        }

        // Leggi il file come Data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;

            // Carica l'immagine nel DOM
            document.getElementById('profile-img').src = imageData;

            // Salva l'immagine nel localStorage per l'utente loggato
            const key2 = "account";
            const sessionKey = "accountLoggato";
            const listUser = JSON.parse(localStorage.getItem(key2)) || [];
            const sessionUser = JSON.parse(sessionStorage.getItem(sessionKey));

            if (sessionUser) {
                // trova l'utente in listUser e aggiorna
                const idx = listUser.findIndex(u => u.email === sessionUser.email && u.tipo === sessionUser.tipo);
                if (idx !== -1) {
                    listUser[idx].profileImage = imageData;
                    localStorage.setItem(key2, JSON.stringify(listUser));
                    // aggiorna anche la sessione
                    sessionUser.profileImage = imageData;
                    sessionStorage.setItem(sessionKey, JSON.stringify(sessionUser));
                    alert('Immagine profilo salvata con successo!');
                    location.reload(); 
                }
            }else {
                alert('Nessun account su cui salvare l\'immagine.');
            }
        };
        reader.readAsDataURL(file);
    }

    // Funzione per effettuare il logout: rimuove l'utente loggato dalla sessione e reindirizza
    function logout() {
        const sessionKey = "accountLoggato";
        sessionStorage.removeItem(sessionKey);
        window.location.href = "accesso.html";
    }