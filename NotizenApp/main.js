import './style.css'

document.addEventListener('DOMContentLoaded', (event) => {
  // Initialisieren der ToDo-Liste
  const meineToDoListe = new ToDoList();
});

/* Wenn die Variable für mehrere Instanzen der Klasse oder für andere Teile des Codes gemeinsam genutzt werden soll.
let gemeinsameAufgaben = [];
*/

//Erstellen eines constructors 
class ToDoList {
  constructor(){
    this.aufgabe = []; /*Wird hier deklariert, damit es innerhalb der Klasse zugänglich zu haben*/
    this.aufgabenListe = document.getElementById('aufgabenListe');
    this.aufgabenForm = document.getElementById('aufgabenForm');
    this.aufgabenTitel = document.getElementById('aufgabenTitel');
    this.aufgabenBeschreibung = document.getElementById('aufgabenBeschreibung');

    //Aufgabe hinzufügen auf Submit Btn. -> hinzufuegenAufgabe Methode definieren. 
    this.aufgabenForm.addEventListener('submit', (event) => {
      event.preventDefault(); //Verhindert, dass die Seite neu geladen wird. 
      /* this.hinzufuegenAufgabe weil Methode Teil der Klasse ist */
      //this.hinzufuegenAufgabe(aufgabenTitel.value, aufgabenBeschreibung.value); 
      this.hinzufuegenAufgabe({ aufgabenTitel: this.aufgabenTitel, aufgabenBeschreibung: this.aufgabenBeschreibung }); 
      this.aufgabenTitel.value = ''; 
      this.aufgabenBeschreibung.value = ''; 
      console.log("Test1");
    });
  }

  
  //hinzufuegenAufgabe Methode
  hinzufuegenAufgabe(titel, beschreibung) {
    const notiz = {titel, beschreibung, isAbgeschlossen: false};
    this.aufgabe.push(notiz);
    //aktualisiereListe Methode definieren und Eingafeld leeren 
    this.aktualisiereListe(); /* Warum this.?! */
    console.log("Test2");
  };


  aktualisiereListe() {
    // Erstellen Sie ein temporäres Array, um die neuen Listenelemente zu speichern
    const neueListe = [];
    //Erstelle für jedes Objekt im Array ein Listenelement 
    this.aufgabe.forEach((aufgabe, index) => {
      const li = document.createElement('li');
      li.textContent = `${aufgabe.titel} - ${aufgabe.beschreibung}`;
      
      if (aufgabe.isAbgeschlossen) {
        li.classList.add('abgeschlossen');
      }

      // Fügen Sie das Listenelement zum temporären Array hinzu
      neueListe.push(li);

      //Füge allen li´s Methode abschliessenAufgabe() hinzu. 
      li.addEventListener('click', () => { /* WARUM IST HIER KEIN EVENT NOTWENDIG */
        //Methode wird aufgerufen und index wird als Argument mitgegeben. 
        this.abschliessenAufgabe(index); /* FRAGE: Warum this */
      });

      //Verschwindet, sobald ein Elenent erzeugt wurde
      this.aufgabenListe.innerHTML = '';

      // Fügen Sie die neuen Listenelemente zum aufgabenListe-Element hinzu
      neueListe.forEach(li => {
        this.aufgabenListe.appendChild(li);
      });
    })  
  };


  abschliessenAufgabe(index){
    this.aufgabe[index].isAbgeschlossen = !this.aufgabe[index].isAbgeschlossen; /* FRAGE */
    this.aktualisiereListe(); 
    console.log("Test4");
  }; 
}