# Spesa — memoria di progetto

**Questo file è una copia di `CLAUDE.md`**, fatta il 2026-09-22 perché Manlio
vuole provare il progetto con un altro programma (Antigravity), che legge
`AGENTS.md` invece di `CLAUDE.md`. Il contenuto è lo stesso: non è scritto
apposta per Claude, vale per chiunque lavori su questo progetto. **Chi legge
questo file da qui in poi tenga aggiornati entrambi** (`CLAUDE.md` e
`AGENTS.md`) quando cambia qualcosa in questa sezione, altrimenti finiscono
per raccontare due cose diverse e la prossima sessione — di qualunque
programma — parte da informazioni sbagliate.

Leggi tutto questo file prima di toccare qualsiasi cosa.
La storia lunga, col perché di ogni scelta, sta in **`NOTE.md`** (1200 righe):
vacci quando questo file non basta, e **prima di rifare qualcosa che sembra
mancare** — quasi sempre è già stato provato e c'è scritto com'è andata.

## Chi è l'utente e come lavora

Manlio. **Non legge il codice** e non usa il terminale. Verifica il lavoro in un
solo modo: apre l'indirizzo sul telefono e guarda se l'app fa quello che deve.

Conseguenze operative, e non sono formalità:
- **Spiegagli cosa cambia PER LUI, non cosa hai fatto tu.** Il 2026-09-06 gliel'ho
  raccontata al contrario — pagine lette, controlli aggiunti, percentuali — e lui:
  «io da quello che c'è scritto non lo capisco, io ti ho chiesto di migliorare
  un'applicazione». Aveva ragione. Quanto lavoro è costato non è un risultato.
- Non chiedergli di leggere un diff, un file, un numero di riga.
- Un file in una cartella temporanea, per lui, **non esiste**: se deve averlo,
  serve un indirizzo pubblico.
- Scrivi in italiano.
- Non lasciare mai il repo in uno stato non funzionante fra una sessione e l'altra.

## Cos'è

Una pagina che cerca i prodotti suoi nei volantini dei supermercati vicini a
casa (Torino, corso Siracusa). Ogni prodotto è un bottone: lo tocchi ed escono
le offerte, dalla più conveniente in giù, col prezzo per unità. Chi non trova
quello che vuole lo accende da un catalogo di 67 voci diviso per reparto.

Pubblicata in due posti, **e vanno aggiornati tutti e due**:
- il sito, `https://manliograndi-del.github.io/spesa/` — un commit su `main`
- l'artifact, il link che ha anche sua moglie — `Artifact` con lo stesso URL

## Vincoli tecnici — non negoziabili senza chiederglielo

1. **I prezzi si leggono a occhio dalle pagine dei volantini.** L'OCR non legge
   le scritte grandi: serve a trovare la pagina, non il prezzo. I riassunti
   online sbagliano — tre errori trovati e documentati in NOTE.md.
2. **Non si pubblicano i PDF né le immagini dei volantini.** Solo collegamenti
   ai siti di chi li mette online.
3. **Mai scrivere il tag di chiusura dello script per esteso** dentro il codice
   della pagina, commenti compresi: spezza la pagina a metà, in silenzio.
4. **Nel CSS non esiste `prefers-color-scheme: dark`.** Il telefono di Manlio è
   in modalità notte e la pagina gli si apriva nera.
5. **Prima di rigenerare, si legge la lista viva dalla pagina pubblicata.** Se
   non si riesce a leggerla, ci si ferma senza pubblicare: rigenerare a vuoto
   cancella la lista di prodotti loro.
6. **A ogni rilascio si alza il numero di cache in `sw.js`** (`spesa-v29` →
   `spesa-v30`), se no resta in giro la copia vecchia.
7. Il progetto della palestra (`manliograndi-del/palestra`) **non si tocca**.

## Regole della pagina decise con lui

- **L'elenco è in ordine di prezzo e basta.** Niente eccezioni in fondo. Il
  bollino verde «il meno caro» va al meno caro **che vale oggi**, che può non
  essere la prima riga.
- **Ogni riga dice fino a quando vale.** I volantini durano periodi diversi.
- Le offerte scadute spariscono da sole: il giudizio lo dà il browser di chi
  guarda, con la sua data, non il programma che genera.
- **«Cerca fra i prezzi» cerca fra TUTTE le offerte, non nel catalogo.** È il
  tasto tratteggiato accanto a «+ altri prodotti», ed è un'altra cosa dalla
  casella dentro il cassetto: quella accende i prodotti della lista, questa
  trova una singola offerta fra tutte quelle lette (marca, formato, insegna,
  note). Chiesto il 2026-09-15: «trovare esattamente un singolo prodotto fra
  tutte le offerte». Due regole sue, da non cambiare:
  - **nei risultati NON c'è il bollino verde «il meno caro»**. Lì dentro il
    verde vorrebbe dire «il meno caro di quello che hai scritto», e uno
    leggerebbe «il meno caro della categoria»: una novità falsa.
  - **il pannello sta FUORI dalla `.barra`**, per la stessa ragione del
    cassetto: la barra è appiccicata in alto e se le cresce dentro qualcosa
    il telefono si blocca a ogni scorrimento.
  Cassetto e ricerca **non stanno aperti insieme**: aprirne uno chiude l'altro.
  - **il tasto è rosso pieno e su una riga tutta sua** (`.tasto.trova`), dal
    2026-09-15: tratteggiato e grigio come «+ altri prodotti» Manlio non lo
    vedeva. Rosso pieno **in mezzo alle pastiglie** non si poteva: lì il rosso
    pieno vuol dire «prodotto acceso». Da solo, largo quanto lo schermo, no.
    Il bottone **tiene anche la classe `agg`**: è con quella che tutte le
    prove riconoscono i bottoni che non sono prodotti della lista.
- **In fondo, ogni volantino dell'elenco ha due tasti** (chiesti il 2026-09-18):
  **«Le offerte (N)»** apre le offerte lette da quel volantino, divise per
  reparto, e **«Il volantino ↗»** apre la sua prima pagina sul sito di chi lo
  pubblica. Tutti e due in una **pagina nuova**, come ha chiesto lui. Regole da
  non cambiare: il numero sul tasto è quello che vale **oggi** (un volantino
  scaduto non ha il tasto, ha la scritta spenta «offerte scadute»); dentro
  quelle offerte **non c'è il bollino verde**, che lì vorrebbe dire «il meno
  caro di questo negozio» e si leggerebbe «di tutti»; il pannello è quello
  della ricerca, che sta **fuori dalla `.barra`**. La pagina nuova è la pagina
  stessa con `#volantino=...` in coda: non ci sono pagine generate in più.
- **La pagina Novità comincia dai volantini, non dai prezzi** (chiesto il
  2026-09-19): in cima il riquadro **«Volantini aggiornati»** (nuovi, riletti,
  finiti) sulla finestra scelta — i tasti sono **Oggi / 3 giorni / 7 giorni** —
  poi la **tabella di tutti i volantini** (in corso, in arrivo, appena finiti)
  e solo dopo il diario dei prezzi. I volantini che so in arrivo ma non ho
  ancora letto stanno in **`VOLANTINI_ATTESI`** in `dati.py` e in tabella sono
  segnati «prezzi non ancora letti»: si tolgono di lì appena il volantino
  entra in `VOLANTINI`. La prova è `prova-novita.js`.
- **Il tasto «Aiuto» sta in cima, accanto a «Novità»** (chiesto il 2026-09-21)
  e apre una finestra che spiega come si usa la pagina. **Non si apre mai da
  sola e si riapre sempre**: è il contrario della finestra «Cosa c'è di
  nuovo». Il tasto è **vuoto, non rosso pieno**: il rosso pieno qui vuol dire
  «premi qui adesso», e l'aiuto non lo è. **Il testo l'ha letto e approvato
  Manlio prima che lo mettessi**: se va cambiato, si rifà così. La prova è
  `prova-aiuto.js`.
- **Il tasto «Personalizza» sta in cima nella barra** (chiesto il 2026-09-22):
  permette a ciascun utente di indicare dove vive (città/quartiere) e di
  scegliere dalla lista quali supermercati abilitare. Le preferenze vengono
  salvate localmente nel browser/telefono di chi naviga (`localStorage`):
  in questo modo ciascuna persona (Manlio, sua moglie, amici) può filtrare solo
  i propri supermercati preferiti senza alterare quelli degli altri.
  Quando nuovi volantini e prezzi vengono aggiunti al catalogo generale,
  la pagina di ciascuno si aggiorna automaticamente mostrando solo le novità
  dei supermercati da lui attivati.
- **La finestra «Cosa c'è di nuovo» si apre alla prima apertura** (chiesta il
  2026-09-18) e racconta **l'interfaccia, non i prezzi**: cosa si può fare
  adesso che prima non si poteva, a partire dalla casella di ricerca. I prezzi
  nuovi restano nel tasto «Novità» in alto a destra. **Dentro non ci vanno
  offerte né prezzi**, e la prova `prova-novita-pagina.js` se ne accorge. Le
  novità nuove si aggiungono in fondo a `NOVITA_PAGINA` in `pagina.py`, con la
  data davanti all'id: chi le ha già viste vedrà comparire **solo quella
  nuova**.
- **La marca ha un bollino colorato ed è scritta TUTTA IN MAIUSCOLO** (chiesto il
  2026-09-22): risalta subito in ogni offerta (indaco/blu), sia nell'elenco che
  nella ricerca e nelle offerte del volantino.
- **Suino, Pollo e Salmone sempre presenti con offerte dedicate** (chiesto il
  2026-09-22): Suino (lonza, arista, braciole, costine) e Pollo (petto a fette,
  cosce, fusi) in Macelleria & Salumi, Salmone (fresco, tranci, affumicato) in
  Pesce & Surgelati. Tutti e tre sono accesi di default nei prodotti principali.
- **Una novità falsa è peggio di nessuna novità: manda uno in negozio.** Vale
  per il diario e per i prezzi: se un conto è ambiguo (peso sgocciolato, prezzo
  valido solo comprandone tre), si sceglie il numero che NON fa sembrare
  l'offerta più conveniente di quello che è, e lo si scrive nella nota.

## Dove va Manlio

**Mercatò di via Filadelfia 232**, insegna Mercatò semplice — confermato da lui
il 2026-09-05, non dedotto. A Torino ci sono anche Mercatò Local, Big ed Extra,
con volantini diversi: il più vicino a corso Siracusa è un Local, quindi la
distanza da sola avrebbe scelto il negozio sbagliato.
