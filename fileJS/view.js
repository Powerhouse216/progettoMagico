document.addEventListener("DOMContentLoaded", function() {
    const key = 'segnalazioni';
    const list = JSON.parse(localStorage.getItem(key)) || [];
    const utenteAdmin = JSON.parse(sessionStorage.getItem('accountLoggato'));
    const contenitore = document.getElementById('form');

    if (list.length === 0) {
        contenitore.innerHTML = "<p style='text-align:center'>Nessuna segnalazione presente.</p>";
        return;
    }

    contenitore.innerHTML = ""; // Puliamo il caricamento

    list.forEach((element, index) => {
        const card = document.createElement('div');
        card.className = 'data-view-form'; // Usa la classe che abbiamo fatto nel CSS

        card.innerHTML = `
            <div class="report-item">
                <strong>Titolo:</strong> <span>${element.titolo}</span><br>
                <strong>Luogo:</strong> <span>${element.luogo}</span><br>
                <strong>Data:</strong> <span>${element.data}</span><br>
                <strong>Gravità:</strong> <span class="badge-${element.gravita.toLowerCase()}">${element.gravita}</span><br>
                <p><strong>Descrizione:</strong> ${element.descrizione}</p>
                <hr>
                <label>Stato:</label>
            </div>
        `;

        // Creazione Select dello Stato
        const selectStato = document.createElement('select');
        selectStato.disabled = !(utenteAdmin && utenteAdmin.tipo === "admin");
        
        ['In attesa', 'In lavorazione', 'Risolta'].forEach(opt => {
            const o = document.createElement('option');
            o.value = opt;
            o.text = opt;
            if(element.stato === opt) o.selected = true;
            if(opt === "In attesa"){
                o.style.color = "red";
            }
            if(opt === "In lavorazione"){
                o.style.color = "orange";
            }
            if(opt === "Risolta"){
                o.style.color = "green";
            }
            selectStato.appendChild(o);
        });
            if(selectStato.value === "In attesa"){
                selectStato.style.color = "red";
            }
            if(selectStato.value === "In lavorazione"){
                selectStato.style.color = "orange";
            }
            if(selectStato.value === "Risolta"){
                selectStato.style.color = "green";
            }
        card.appendChild(selectStato);

        // Se l'utente è Admin, aggiungiamo i bottoni Modifica ed Elimina
        if (utenteAdmin && utenteAdmin.tipo === "admin") {
            const btnBox = document.createElement('div');
            btnBox.className = 'button-group center-buttons';

            const btnMod = document.createElement('button');
            btnMod.textContent = "Aggiorna Stato";
            btnMod.className = "btn-primary";
            btnMod.style.padding = "5px 10px";
            btnMod.onclick = () => {
                list[index].stato = selectStato.value;
                localStorage.setItem(key, JSON.stringify(list));
                alert("Stato aggiornato!");
                location.reload();
            };

            const btnDel = document.createElement('button');
            btnDel.textContent = "Elimina";
            btnDel.className = "btn-secondary";
            btnDel.style.padding = "5px 10px";
            btnDel.onclick = () => {
                if(confirm("Eliminare questa segnalazione?")) {
                    list.splice(index, 1);
                    localStorage.setItem(key, JSON.stringify(list));
                    location.reload();
                }
            };

            btnBox.appendChild(btnMod);
            btnBox.appendChild(btnDel);
            card.appendChild(btnBox);
        }

        contenitore.appendChild(card);
    });
});