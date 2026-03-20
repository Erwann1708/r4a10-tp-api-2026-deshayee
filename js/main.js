import View from './views/View.js';
import Controller from './controllers/Controller.js';

//Initialisation de l'architecture MVC
const appView = new View();
const appController = new Controller(appView);

//Récupération des éléments du HTML
const champRecherche = document.getElementById('champ-recherche');
const btnRecherche = document.getElementById('btn-lancer-recherche');

//Désactiver le bouton si le champ est vide
champRecherche.addEventListener('input', () => {
    if (champRecherche.value.trim() === '') {
        btnRecherche.disabled = true;
        btnRecherche.classList.remove('btn_clicable');
    } else {
        btnRecherche.disabled = false;
        btnRecherche.classList.add('btn_clicable');
    }
});

// On désactive le bouton par défaut au chargement de la page
btnRecherche.disabled = true;
btnRecherche.classList.remove('btn_clicable');

//Lancement de la recherche au clic sur le bouton
btnRecherche.addEventListener('click', () => {
    const recherche = champRecherche.value.trim();
    appController.rechercherProduit(recherche);
});

//Lancement de la recherche au clic sur "Entrée" dans le champ de recherche
champRecherche.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !btnRecherche.disabled) {
        btnRecherche.click();
    }
});