/**
 * La Vue
 * Gère uniquement l'affichage sur la page HTML.
 */
export default class View {
    
    /**
     * Le constructeur de la vue récupère les éléments HTML nécessaires pour afficher les résultats et le GIF de chargement.
     */
    constructor() {
        // On récupère les éléments de la page HTML grâce à leurs IDs
        this.conteneurResultats = document.getElementById('bloc-resultats');
        this.gifAttente = document.getElementById('bloc-gif-attente');
    }

    /**
     * Affiche ou cache le GIF de chargement
     * @param {boolean} enChargement - true pour afficher, false pour cacher
     */
    afficherChargement(enChargement) {
        if (enChargement) {
            this.gifAttente.style.display = 'block';
            this.conteneurResultats.innerHTML = ''; // On vide les anciens résultats
        } else {
            this.gifAttente.style.display = 'none';
        }
    }

    /**
     * Affiche une liste de produits sur la page
     * @param {Array} produits - Un tableau d'objets Produit
     */
    afficherProduits(produits) {
        let htmlComplet = '';

        // Définition des icônes SVG modernes pour les nutriments
        const iconEnergy = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
        const iconProtein = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`; // Structure abstract
        const iconCarbs = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>`; // Icone d'épis de blé stylisé
        const iconFat = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`; // Bouclier/goutte

        produits.forEach(produit => {
            htmlComplet += `
                <div class="produit-card">
                    <div class="header-card">
                        <h3>${produit.nom}</h3>
                        <p class="marque">${produit.marque}</p>
                    </div>
                    
                    ${produit.image ? `
                        <div class="image-container">
                            <img src="${produit.image}" alt="${produit.nom}">
                        </div>
                    ` : ''}
                    
                    <ul class="macros-grid">
                        <li>
                            ${iconEnergy}
                            <span class="value">${produit.calories}</span>
                            <strong>Énergie (kcal)</strong>
                        </li>
                        <li>
                            ${iconProtein}
                            <span class="value">${produit.proteins}g</span>
                            <strong>Protéines</strong>
                        </li>
                        <li>
                            ${iconCarbs}
                            <span class="value">${produit.glucides}g</span>
                            <strong>Glucides</strong>
                        </li>
                        <li>
                            ${iconFat}
                            <span class="value">${produit.lipides}g</span>
                            <strong>Lipides</strong>
                        </li>
                    </ul>
                </div>
            `;
        });

        this.conteneurResultats.innerHTML = htmlComplet;
    }

    /**
     * Affiche un message d'erreur ou d'information (ex: "Aucun résultat trouvé")
     * @param {string} message - Le message à afficher
     */
    afficherMessage(message) {
        this.conteneurResultats.innerHTML = `<p class="info-vide">${message}</p>`;
    }


    // --- GESTION DES FAVORIS ---

    /**
     * Met à jour le bouton étoile (Allumé, Eteint, ou Désactivé)
     */
    majEtatEtoile(estFavori, desactiver = false) {
        const btnFavoris = document.getElementById('btn-favoris');
        btnFavoris.disabled = desactiver;

        if (desactiver) {
            btnFavoris.classList.remove('btn_clicable');
            // Etoile grise 
            btnFavoris.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" style="width: 24px; height: 24px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
            return;
        }

        btnFavoris.classList.add('btn_clicable');
        
        if (estFavori) {
            btnFavoris.innerHTML = `<svg viewBox="0 0 24 24" fill="var(--teal-main)" stroke="var(--teal-main)" stroke-width="2" style="width: 24px; height: 24px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        } else {
            btnFavoris.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-main)" stroke-width="2" style="width: 24px; height: 24px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        }
    }

    /**
     * Affiche la liste des favoris sur la droite de la page
     */
    afficherFavoris(favoris) {
        const liste = document.getElementById('liste-favoris');
        const pInfoVide = document.querySelector('#section-favoris .info-vide');

        liste.innerHTML = ''; // On vide les anciens favoris statiques

        if (favoris.length === 0) {
            pInfoVide.style.display = 'block'; // Affiche "(Aucune recherche)"
        } else {
            pInfoVide.style.display = 'none';
            //Fabrique un <li> pour chaque mot enregistré
            favoris.forEach(fav => {
                //Crée une croix en SVG inline
                const croixSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" class="btn-croix" data-nom="${fav}" style="width:18px; height:18px; cursor:pointer; margin-left:10px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

                liste.innerHTML += `
                    <li>
                        <span class="nom-favori" title="Cliquer pour relancer">${fav}</span>
                        ${croixSvg}
                    </li>
                `;
            });
        }
    }
}