// Questo file legge i dati che l'utente scrive nel FORM della pagina
// e li salva nel "magazzino" del browser (localStorage)
function sendForm() {
    
    // document.getElementById() trova l'elemento nel HTML dal suo ID .value legge il valore che l'utente ha scritto dentro Adesso riunisco tutti i valori in un oggetto (una struttura dati)
    const segnalazione = {
        // Un oggetto è come una scatola con etichette: etichetta : valore
        titolo : document.getElementById('Title').value,
        descrizione : document.getElementById('Desc').value,
        tipo : document.getElementById('Type').value,
        luogo : document.getElementById('Luogo').value,
        ruolo : document.getElementById('Ruolo').value,
        data : document.getElementById('data').value,
	gravita: document.querySelector('input[name="Gravita"]:checked').value,
        stato : 'In attesa'  // Lo stato iniziale è sempre "In attesa"
    };
    
    // Se QUALSIASI campo manca, mostro un messaggio di errore e ferma
    if (!segnalazione.titolo || !segnalazione.gravita || !segnalazione.descrizione || !segnalazione.tipo || !segnalazione.luogo || !segnalazione.ruolo || !segnalazione.data) {
        alert("Compila tutti i campi");
        // return esce dalla funzione, non fa nulla di più
        return;
    }
    if(segnalazione.luogo === "-- Seleziona un luogo --"){
        alert("Seleziona un luogo valido");
        return;
    }

    // Come funziona:
    //   localStorage.getItem(key)  <-- prende i dati salvati con quella chiave
    //   JSON.parse()               <-- converte il testo JSON in un oggetto JS
    //   || []                      <-- se non trova nulla, usa un array vuoto []
    const key = 'segnalazioni';  // il nome della chiave (etichetta del magazzino)
    const list = JSON.parse(localStorage.getItem(key)) || [];
    // list è un array 
    // .push() è un metodo degli array che aggiunge un elemento alla fine]
    list.push(segnalazione);
   
    // localStorage.setItem(chiave, valore) salva i dati nel  localStorage può salvare solo testo, non oggetti per questo uso JSON.stringify():
    //   JSON.stringify() converte l'oggetto JavaScript in testo JSON Dopo questa riga, i dati rimarranno salvati anche se l'utente chiude il browser e torna domani. Sono permanenti!
    
    localStorage.setItem(key, JSON.stringify(list));
    // window.location.href cambia la pagina che sta vedendo l'utente 
    window.location.href = 'viewSegnalazione.html';
}
//Inserimento di dati di esempio
function inizializzaDatiEsempio() {
    const key = 'segnalazioni';
    const datiEsistenti = localStorage.getItem(key);

    // Procediamo solo se il localStorage è vuoto o la chiave non esiste
    if (!datiEsistenti || JSON.parse(datiEsistenti).length === 0) {
        const segnalazioniEsempio = [
            {
                titolo: "LIM non funzionante",
                luogo: "T06-2Am",
                data: "2026-02-20",
                gravita: "Alta",
                descrizione: "La lavagna non si accende, sembra un problema di alimentazione.",
                stato: "In attesa",
                tipo: "Guasto"
            },
            {
                titolo: "Mancanza carta igienica",
                luogo: "T10-WC Donne",
                data: "2026-02-23",
                gravita: "Media",
                descrizione: "Mancano i rotoli nel bagno del piano terra.",
                stato: "In lavorazione",
                tipo: "Mancanza"
            },
            {
                titolo: "Sedia rotta",
                luogo: "2.17-4Ai",
                data: "2026-02-24",
                gravita: "Bassa",
                descrizione: "Una sedia nell'ultima fila ha una gamba instabile.",
                stato: "Risolta",
                tipo: "Guasto"
            }
        ];

        localStorage.setItem(key, JSON.stringify(segnalazioniEsempio));
        console.log("Dati di esempio caricati correttamente.");
    } 
}

inizializzaDatiEsempio();
