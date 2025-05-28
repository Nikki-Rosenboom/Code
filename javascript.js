
const zinnen = [      //array
    "Decrypt#Code99!",
    "AccessGranted_2024",
    "Terminal@Root>_",
    "ByteForce-112%",
    "Hack$The$Mainframe",
    "Proxy?Bypass=TRUE;",
    "Admin=Override!88",
    "Firewall-Defeat#OK",
    "MeNu5+counting.Time",
    "Overheid25%%Access",
    "MisSioN-start!@",
    "fREE-Money$$$ ",
    "MainFRAME-Continue21",
  ]; 
  
  const intro = document.getElementById("intro"); //HTML-elementen ophalen - manipuleren in js - startknop eventlistener
  const game = document.getElementById("game"); //toont spelgedeelte, wordt zichtbaar na start
  const zinElement = document.getElementById("zin"); //laat zin zien die speler moet overtypen
  const invoerElement = document.getElementById("invoer"); //inputveld waar speler in moet overtypen
  const timerElement = document.getElementById("timer"); //tijd die nog over is
  const levensElement = document.getElementById("levens"); //toont aantal pogingen/levens
  const feedbackElement = document.getElementById("feedback"); //code gekraakt bijv.
  const startKnop = document.getElementById("startKnop"); //start het spel
  const verzendKnop = document.getElementById("verzendKnop"); //controleert of invoer compleet is, als je hierop klikt
  const codeLog = document.getElementById("codeLog"); //lijst waar gekraakte codes inkomen

  const geluidKlik = new Audio("audio/startknop.mp3"); //geluid startknop
  const geluidSucces = new Audio("audio/succes-sound.mp3"); //geluid code gekraakt
  const geluidFout = new Audio("audio/false-sound.mp3") //geluid fout
  const geluidFaal = new Audio("audio/game-over.mp3") //geluid gefaald

  let huidigeZin = ""; //huidige zin die getypt moet worden
  let timer = 20; //standaard timerwaarde
  let tijdOver; //tijd die nog over is
  let levens = 3; //aantal levens die je nog hebt
  let timerInterval; //intervaltimer wordt hierin opgeslagen (starten/ stoppen)
  
  function kiesZin() {
    const randomIndex = Math.floor(Math.random() * zinnen.length);
    huidigeZin = zinnen[randomIndex]; //kiest de zin op die plek
    zinElement.textContent = huidigeZin; //toont zin op scherm
    invoerElement.value = ""; //wist de tekst die de speler had staan
    feedbackElement.textContent = ""; //wist de vorige feedback (fout/goed)

  }
  
  function startTimer() {
    tijdOver = 20;
    timerElement.textContent = `Tijd: ${tijdOver}`; //toont de tijd
  
    timerInterval = setInterval(() => {
      tijdOver--;
      timerElement.textContent = `Tijd: ${tijdOver}`;
      if (tijdOver === 0) {
        clearInterval(timerInterval); //stopt timer
        controleerInvoer(); 
      }
    }, 1000);
  }

  function controleerInvoer() {
    clearInterval(timerInterval); 
    if (invoerElement.value === huidigeZin) { 
      geluidSucces.play(); //speelt succes geluid af
      feedbackElement.textContent = "✅ Code gekraakt!";
      logCode(huidigeZin);
      kiesZin();
      startTimer();

    } else {
      levens--;
      geluidFout.play(); //speelt faal geluid af
      levensElement.textContent = `Pogingen: ${levens}`; //toont hoeveel levens je nog hebt
      // feedbackElement.textContent = "❌ Fout of te laat!";

      if (levens === 0) {
        feedbackElement.textContent = "💀 Missie gefaald. Probeer opnieuw.";
        geluidFaal.play()
        verzendKnop.disabled = true;
      } else {
        kiesZin();
        startTimer();
      }
    }
  }
  // bron: Chatgpt
  // prompt: ik wil graag een functie toevoegen waarbij de gekraakte codes zichtbaar worden in een lijst die de speler kan zien
  function logCode(code) { 
    const item = document.createElement("li"); //maakt een nieuw element (nieuw li aan)
    item.textContent = code;
    codeLog.appendChild(item); //DOM
  }
  
  startKnop.addEventListener("click", () => { //geluid startknop + start game (arrow functie () => )
    geluidKlik.play();
    intro.style.display = "none";
    game.style.display = "flex";
    levens = 3;
    levensElement.textContent = "Pogingen: 3";
    verzendKnop.disabled = false;
    kiesZin();
    startTimer();
  });
  
  verzendKnop.addEventListener("click", controleerInvoer)
  
