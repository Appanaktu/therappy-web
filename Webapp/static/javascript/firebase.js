// Initialize Cloud Firestore through Firebase
var config = {
  "apiKey": "AIzaSyAUHFqNblYKWTCrje07bkdNeorlQ4IuNEs",
  "appId": "1:728300584033:web:ed2bf8534da27bacc53e20",
  "authDomain": "iamphysiotherappy-17757.firebaseapp.com",
  "databaseURL": "https://iamphysiotherappy-17757.firebaseio.com",
  "measurementId": "G-SR5XN6N10J",
  "messagingSenderId": "728300584033",
  "projectId": "iamphysiotherappy-17757",
  "storageBucket": "iamphysiotherappy-17757.appspot.com"
};

// Initialisiere Datenank
firebase.initializeApp(config);
var db = firebase.firestore()

// Schreib-Funktion
function write_json_to_collection(collection_name, document_name, values) {

  // Hole Collectionreferenz
  var collectionRef = db.collection(collection_name)

  // Schreibzugriff
  if document_name == null{
    collectionRef.add(values).then(function(docRef) {
        console.log("Werte gespeichert unter der ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Fehler beim schreiben der Daten: ", error);
    });
  } else {
    collectionRef.doc(document_name).set(values).then(function() {
        console.log("Werte wurden erfolgreich auf die Datenbank geschrieben");
    }).catch(function(error) {
        console.error("Fehler beim schreiben der Daten: ", error);
    });
  };
};

// Lese-Funktionen
function get_all_docs_from_collection(collection_name){

  // Hole Collectionreferenz
  var collectionRef = db.collection(collection_name)

  // Lesezugriff
  collectionRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});
};

function get_json_from_collection_by_query(collection_name, trait, operator, value) {

  // Hole Collectionreferenz
  var collectionRef = db.collection(collection_name)

  // Lesezugriff
  collectionRef.where(trait, operator, value)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
};

function get_json_from_collection_by_doc(collection_name, document_name) {;

  // Hole Collectionreferenz
  var collectionRef = db.collection(collection_name)

  // Hole Dokumentenreferzenz
  var docRef = collectionRef.doc(document_name);

  // Lesezugriff
  docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
};

//Wenn Website geladen
document.addEventListener("DOMContentLoaded", function() {
	firebase.initializeApp(config);
	var db = firebase.firestore();
	const inputTextField = document.querySelector("#testtext");
  const outputHeader = document.querySelector("#dbtest");
	const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");
  const allButton = document.querySelector("#allButton");
  const docRef = db.doc("Nutzer/Person");

  //In DB speichern
	saveButton.addEventListener("click", function() {
		const textToSave = inputTextField.value;
		console.log("Folgender Name wird gespeichert " + textToSave);
		db.collection("Nutzer").add({
        Vorname: textToSave,
    }).then(function(docRef) {
        console.log("Name gespeichert mit ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
	});

  //Von DB laden
  loadButton.addEventListener("click", function() {
    const textToLoad = inputTextField.value;
    console.log("Folgender Text wird geladen " + textToLoad);
    db.collection("Nutzer").where("Vorname", "==", textToLoad)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }).catch(function(error) {
      console.log("Fehler: ", error);
    });
  });

  // ALle Einträge ausgeben erstmal in Konsole
  // allButton.addEventListener("click", function() {
  //   db.collection("Nutzer").get().then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
  //       });
  //   });
  });
});
