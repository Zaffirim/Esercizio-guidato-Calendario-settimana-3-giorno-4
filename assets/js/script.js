// Generazione della griglia del calendario

// Oggi che giorno è?
const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth() //variabile globale contenente il numero del mese in corso ceh sarà utilizzata in più diu una funzione


/* Sappiamo in che mese siamo e dobiamo stabilire quanti giorni ha questo mese; inoltre dobbiamo anche creare un array del mese che conterrà tanti array quanti sono i giorni del mese 
il numero di giorni quindi genererà la griglia visiva e l'array; */

const appointments = [];

// L'oggetto Date() restituisce il numero del mese da 0 a 11; ho bisogno di un array con i nomi dei mesi;
const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
]

// scriviamo il nome del mese nelkl'h1 dell'html

const printCurrentMonthInH1 = () => {
    const title = document.querySelector('h1');
    const monthIndex = now.getMonth(); // mi restituirà il numero corrispndente al mese per esempio per febbraio 1.
    const currentMonth = monthNames[getMonth]; // Con il numero del mese presente nella variabile globale pesco nel mio array il mese corrispondente
    title.innerText = currentMonth;
}

printCurrentMonthInH1();

/* Dobbiamo calcolare il numero dei giorni del mese trovato per generare la griglia e l'array
 mi serve prendere il primo giorno del mese successivo al mese torvato e poi ottenere il giorno prima, che sarà l'ultimo giorno del mese in corso; 
il numero dell'ultimo giorno del mese in corso corrisponderà al numero di giorno totali */

const dayInThisMonth = () => {
    const lastDayInTheMonth = new Date(getYear, getMonth + 1, 0);// lo 0 è l'ultimo giorno del mese
    const numberOfTheDay = lastDayInTheMonth.getDate(); //getDate restituisce il numero dei giorni 
    return numberOfTheDay;
}

dayInThisMonth();
//ho bisogno di eliminare la classe selected se presente altrimenti quando clicco su un giorno il giorno precedente rimane selezionato

const unselectAllDays = () => {

    const previousSelected = document.querySelector('.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
}

// Funzione per gestire la sezione meetingday
const changeMeetingDaySection = (indexOfTheDay) => {
    const rightSpan = document.getElementById('newMeetingDay');
    rightSpan.classList.add('hasDay');
    rightSpan.innerText = indexOfTheDay + 1;
}

const showAppointments = (indexOfTheDay) => {
    //questa funzione deve popolare la lista degli impegni del giorno
    //1. Leggere gli appuntamenti nell'array corrispondente
    const appointmentsForThisDay = appointments[indexOfTheDay];
    //2.selezionare il contenitore lista 
    const appointmentsList = document.querySelector('#appointments ul');
    // 3. ciclare gli appuntamenti del giorno e creare gli elementi di lista
    appointmentsList.innerHTML = '';
    appointmentsForThisDay.forEach((appointment) => {
        const newLi = document.createElement('li');
        newLi.innerText = appointment;
        appointmentsList.appendChild(newLi);
    });
    // A CSS il div degli impegni è display none, quindi adesso devo mostrarlo
    const appointmentsDiv = document.getElementById('appointments');
    appointmentsDiv.style.display = 'block';


}


const createDays = (numberOfTheDays) => {
    const calendarDiv = document.getElementById('calendar');
    //ciclando il numero di giorni creo e appendo i div corrispondenti al numero di giorni nel contenitore padre calendar

    for (let i = 0; i < numberOfTheDays; i++) {
        const dayCellDiv = document.createElement('div');
        dayCellDiv.classList.add('day');
        //rendiamo il div del giorno cliccabile
        dayCellDiv.addEventListener('click', function () {
            unselectAllDays();
            dayCellDiv.classList.add('selected');
            // adesso deve comparire la sezione meetingday, con gli eventuali impegni del giorno
            changeMeetingDaySection(i);

            /* se nella giornata ci sono già impegni li devo mostrare */
            if (appointments[i].length > 0) {
                showAppointments(i);
            } else {
                const appointmentDiv = document.getElementById('appointments');
                appointmentDiv.style.display = 'none';
            }
        });
         // Creo i div dei singoli giorni
         // 1. scrivo il numero del giorno
         const cellValue = document.createElement('h3');
         cellValue.innerText = i + 1;
         dayCellDiv.appendChild(cellValue);
        // 2. appendo il div del singolo giorno al calendar
        calendarDiv.appendChild(dayCellDiv);
        // Popolo l'array con lárray corrispondente al singolo giorno
        appointments.push([]);
    }
    console.log(appointments);
}

createDays(dayInThisMonth());


const handleFormSubmit = (e) => {
    e.preventDefault();
    // leggere il giorno selezionato
    const selectedDay = document.getElementById('newMeetingDay').innerText;
    // leggere l'ora selezionata
    const meetingTime = document.getElementById('newMeetingTime').value;
    // leggere il testo dell'impegno
    const meetingName = document.getElementById('newMeetingName').value;
    // in un'unica stringa scrivo orario e testo dell'impegno
    const meetingString = `${meetingTime} - ${meetingName}`;
    // scrivo la stringa nell'array dentro appointments corrispondente al giorno
    const indiceGiorno = parseInt(selectedDay) - 1;
    appointments[indiceGiorno].push(meetingString);


    // Voglio indicare con un pallino i giorni nei quali ci sono impegni
    const dot = document.createElement('span');
    dot.classList.add('dot');
    // trovo la cella del giorno cliccato
    const selectedCell = document.querySelector('.selected');

    /* se il giorno ha già il pallino non devo aggiungerlo */

    if (!selectedCell.querySelector('.dot')) {
        selectedCell.appendChild(dot)
    }
     // Mostra gli impegni del giorno aggiornati
     showAppointments(indiceGiorno);

}

// Avviamo il tutto creando un eventListener sul submit del form
const meetingForm = document.querySelector('form');
meetingForm.addEventListener('submit', handleFormSubmit);