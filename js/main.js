import View from './views/View.js';
import Controller from './controllers/Controller.js';

// Initialisation de l'architecture MVC
const appView = new View();
const appController = new Controller(appView);

// Récupération des éléments du HTML
const champRecherche = document.getElementById('champ-recherche');
const btnRecherche = document.getElementById('btn-lancer-recherche');

// Désactiver le bouton si le champ est vide
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

// Lancement de la recherche au clic sur le bouton
btnRecherche.addEventListener('click', () => {
    const recherche = champRecherche.value.trim();
    
    // On utilise la valeur sauvegardée par le menu sur mesure !
    appController.rechercherProduit(recherche, window.limiteRecherche);
});

// Lancement de la recherche au clic sur "Entrée" dans le champ de recherche
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
            champRecherche.value = nom; 
            
            btnRecherche.disabled = false;
            btnRecherche.classList.add('btn_clicable');
            
            // On lance la recherche avec la limite actuelle du menu !
            appController.rechercherProduit(nom, window.limiteRecherche); 
        }
    }
});


// ==========================================
// MENU DÉROULANT SUR MESURE (Custom Select)
// ==========================================
const selectCustom = document.getElementById('custom-select-limite');
const selectSelected = selectCustom.querySelector('.select-selected');
const selectItems = selectCustom.querySelector('.select-items');
window.limiteRecherche = 5; // Valeur par défaut sauvegardée globalement

// Ouvrir/Fermer le menu au clic
selectSelected.addEventListener('click', function(e) {
    e.stopPropagation(); // Empêche le clic de se propager
    selectItems.classList.toggle('select-hide');
});

// Quand on clique sur une option (5, 10, 20)
selectItems.querySelectorAll('div').forEach(item => {
    item.addEventListener('click', function() {
        // 1. On met à jour le texte du bouton principal
        selectSelected.innerHTML = this.innerHTML;
        
        // 2. On sauvegarde le nombre choisi en mémoire globale
        window.limiteRecherche = parseInt(this.getAttribute('data-val'), 10);
        
        // 3. On referme la liste déroulante
        selectItems.classList.add('select-hide');
        
        // 4. On relance automatiquement la recherche si un mot est déjà tapé !
        const motActuel = champRecherche.value.trim();
        if (motActuel !== '') {
            appController.rechercherProduit(motActuel, window.limiteRecherche);
        }
    });
});

// Fermer le menu si on clique n'importe où ailleurs sur la page
document.addEventListener('click', () => {
    selectItems.classList.add('select-hide');
});