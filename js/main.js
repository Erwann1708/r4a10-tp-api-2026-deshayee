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


// ==========================================
// GESTION DES FAVORIS
// ==========================================
const btnFavoris = document.getElementById('btn-favoris');
const listeFavoris = document.getElementById('liste-favoris');

// 1. Clic sur l'étoile
btnFavoris.addEventListener('click', () => {
    appController.gererFavori();
});

// 2. Clic dans la liste des favoris
listeFavoris.addEventListener('click', (event) => {
    
    // Cas A : L'utilisateur a cliqué sur la petite croix (ou le dessin de la croix)
    const elementCroix = event.target.closest('.btn-croix');
    if (elementCroix) {
        const nom = elementCroix.getAttribute('data-nom');
        appController.supprimerFavori(nom);
        return; // On arrête l'action ici pour ne pas relancer la recherche
    }

    // Cas B : L'utilisateur a cliqué n'importe où sur la ligne du favori (le <li>)
    const elementLi = event.target.closest('li');
    if (elementLi) {
        const span = elementLi.querySelector('.nom-favori');
        if (span) {
            const nom = span.innerText;
            champRecherche.value = nom; // Met le mot dans la barre de recherche
            
            // On réactive visuellement le bouton loupe
            btnRecherche.disabled = false;
            btnRecherche.classList.add('btn_clicable');
            
            // On lance directement la recherche !
            appController.rechercherProduit(nom); 
        }
    }
});