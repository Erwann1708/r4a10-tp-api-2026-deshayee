/**
 * La Vue
 * Gère uniquement l'affichage sur la page HTML.
 */
export default class View {
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

        // Définition des icônes SVG modernes (style Lucide/Feather)
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
}