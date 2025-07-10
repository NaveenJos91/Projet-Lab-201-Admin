import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestoreDatabase } from "../firebase/firebaseconfig"; // correspond à db renommé ici

export default function Dashboard() {
  // Contrôle l'affichage du formulaire (ajout ou modification)
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Liste des dates de concerts récupérées depuis Firestore
  const [concertDates, setConcertDates] = useState([]);

  // Index de la date que l'on veut supprimer (null si aucune)
  const [indexToDelete, setIndexToDelete] = useState(null);

  // Index de la date en cours d'édition (null si ajout)
  const [indexBeingEdited, setIndexBeingEdited] = useState(null);

  // Charge les données depuis Firestore au premier rendu
  useEffect(() => {
    async function loadDates() {
      try {
        const snapshot = await getDocs(collection(firestoreDatabase, "dates"));
        const loadedDates = [];
        snapshot.forEach((docItem) => {
          loadedDates.push({ id: docItem.id, ...docItem.data() });
        });
        setConcertDates(loadedDates);
      } catch (error) {
        console.error("Erreur lors du chargement des dates :", error);
      }
    }
    loadDates();
  }, []);

  // Supprime la date sélectionnée de Firestore et met à jour l'état local
  async function confirmDelete() {
    try {
      const dateId = concertDates[indexToDelete].id;
      await deleteDoc(doc(firestoreDatabase, "dates", dateId));

      const updatedDates = concertDates.filter((_, i) => i !== indexToDelete);
      setConcertDates(updatedDates);
      setIndexToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }

  // Ouvre le formulaire en mode édition
  function openEditForm(index) {
    setIndexBeingEdited(index);
    setIsFormVisible(true);
  }

  // Gère l'envoi du formulaire, que ce soit pour ajouter ou modifier une date
  async function handleFormSubmit(dateData) {
    try {
      if (indexBeingEdited !== null) {
        // Modification
        const currentId = concertDates[indexBeingEdited].id;
        const docRef = doc(firestoreDatabase, "dates", currentId);
        await updateDoc(docRef, dateData);

        const updatedDates = [...concertDates];
        updatedDates[indexBeingEdited] = { id: currentId, ...dateData };
        setConcertDates(updatedDates);
        setIndexBeingEdited(null);
      } else {
        // Ajout
        const docRef = await addDoc(collection(firestoreDatabase, "dates"), dateData);
        setConcertDates([...concertDates, { id: docRef.id, ...dateData }]);
      }
      setIsFormVisible(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou modification :", error);
    }
  }

  // Ferme le formulaire sans enregistrer
  function closeForm() {
    setIsFormVisible(false);
    setIndexBeingEdited(null);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      {/* Bouton pour ouvrir le formulaire en mode ajout */}
      <button
        onClick={() => {
          setIndexBeingEdited(null);
          setIsFormVisible(true);
        }}
        className="mb-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
      >
        Ajouter une date
      </button>

      {/* Liste des dates de concerts */}
      <ul>
        {concertDates.map((concert, index) => (
          <li
            key={concert.id}
            className="mb-3 flex justify-between items-center border p-3 rounded"
          >
            {/* Infos du concert */}
            <div className="flex-grow">
              <strong>Date:</strong> {concert.date} |{" "}
              <strong>Ville:</strong> {concert.city} |{" "}
              <strong>Pays:</strong> {concert.country} |{" "}
              <strong>Lieu:</strong> {concert.location} |{" "}
              <strong>Sold out:</strong> {concert.soldOut ? "Oui" : "Non"}
            </div>

            {/* Actions Modifier et Supprimer */}
            <div className="flex flex-wrap gap-2 ml-4 flex-shrink-0">
              <button
                onClick={() => openEditForm(index)}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Modifier
              </button>
              <button
                onClick={() => setIndexToDelete(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulaire d'ajout / modification */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            {/* Bouton pour fermer le formulaire */}
            <button
              aria-label="Fermer le formulaire"
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
            >
              ×
            </button>
            <DateForm
              initialValues={indexBeingEdited !== null ? concertDates[indexBeingEdited] : null}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {indexToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-60">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <p className="mb-6 text-lg font-semibold">
              Êtes-vous sûr de vouloir supprimer cette date ?
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setIndexToDelete(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Formulaire pour saisir/modifier une date de concert
function DateForm({ initialValues, onSubmit }) {
  const [date, setDate] = useState(initialValues?.date || "");
  const [city, setCity] = useState(initialValues?.city || "");
  const [country, setCountry] = useState(initialValues?.country || "");
  const [location, setLocation] = useState(initialValues?.location || "");
  const [soldOut, setSoldOut] = useState(initialValues?.soldOut || false);

  // Gestion de la soumission du formulaire
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ date, city, country, location, soldOut });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4">
        {initialValues ? "Modifier la date" : "Ajouter une date"}
      </h3>

      <label className="block mb-3">
        Date du concert
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="block w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-3">
        Nom de la ville
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="block w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-3">
        Pays
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="block w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-3">
        Lieux / nom du festival
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="block w-full p-2 border rounded"
        />
      </label>

      <label className="flex items-center mb-4 space-x-2">
        <input
          type="checkbox"
          checked={soldOut}
          onChange={(e) => setSoldOut(e.target.checked)}
          className="h-5 w-5"
        />
        <span>Sold out</span>
      </label>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Enregistrer
      </button>
    </form>
  );
}
