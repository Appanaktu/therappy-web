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

var db = ""
//Wenn Website geladen
document.onreadystatechange = function() {
  if (document.readyState === 'complete')
    {
        firebase.initializeApp(config);
        db = firebase.firestore();
        while(db==""){
        }
    };
};

// Schreib-Funktion
function write_json_to_collection(collection_name, document_name, values) {

  // Hole Collectionreferenz
  var collectionRef = db.collection(collection_name)

  // Schreibzugriff
  if ( document_name == null ) {
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
async function get_all_docs_from_collection(collection_name, callback_function) {

  // Hole Collectionreferenz
  var collectionRef = db.collection(collection_name)

  // Rueckgabeobjekt
  var docs = new Array()

  // Lesezugriff
  collectionRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        docs.push([doc.id, doc.data()]);
    });
    callback_function(querySnapshot);
  });
  return docs;
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
        return querySnapshot;
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
        return doc;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
};
