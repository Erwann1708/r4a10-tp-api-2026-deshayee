import Produit from '../models/Produit.js';
import Api from '../models/Api.js';

export default class Controller {
    constructor(vue) {
        this.vue = vue;
        this.api = new Api(); 
        
        // 1. On charge les favoris depuis la mémoire du navigateur au démarrage
        this.favoris = JSON.parse(localStorage.getItem('mesFavoris')) || [];
        this.rechercheActuelle = ''; // Garde en mémoire le mot actuellement affiché

        // 2. On dessine la liste des favoris dès le lancement
        this.vue.afficherFavoris(this.favoris);
        this.vue.majEtatEtoile(false, true);
    }

    async rechercherProduit(nomRecherche, limite = 5) {
        if (!nomRecherche || nomRecherche.trim() === '') return;

        this.rechercheActuelle = nomRecherche.trim().toLowerCase();
        this.vue.afficherChargement(true);

        try {
            const produitsBruts = await this.api.chercherProduits(nomRecherche);

            if (produitsBruts.length > 0) {
                const listeFiltree = produitsBruts
                    .slice(0, limite) // <--- MODIFICATION : On utilise la limite ici !
                    .map(donneeBrute => new Produit(donneeBrute));

                this.vue.afficherProduits(listeFiltree);
                this.vue.majEtatEtoile(this.favoris.includes(this.rechercheActuelle));
            } else {
                this.vue.afficherMessage("(Aucun résultat trouvé)");
                this.vue.majEtatEtoile(false, true); // On désactive l'étoile
            }
        } catch (erreur) {
            this.vue.afficherMessage("Erreur de connexion au serveur.");
        } finally {
            this.vue.afficherChargement(false);
        }
    }

    // --- FONCTIONS POUR LES FAVORIS ---

    /**
     * Ajoute ou retire la recherche actuelle des favoris
     */
    gererFavori() {
        if (!this.rechercheActuelle) return;

        const index = this.favoris.indexOf(this.rechercheActuelle);

        // Si ce n'est pas un favori, on l'ajoute. Sinon, on le supprime.
        if (index === -1) {
            this.favoris.push(this.rechercheActuelle);
        } else {
            this.favoris.splice(index, 1);
        }

        // On sauvegarde la nouvelle liste dans le navigateur
        localStorage.setItem('mesFavoris', JSON.stringify(this.favoris));

        // On demande à la vue de redessiner l'étoile et la liste
        this.vue.afficherFavoris(this.favoris);
        this.vue.majEtatEtoile(this.favoris.includes(this.rechercheActuelle));
    }

    /**
     * Supprime un favori spécifique depuis la liste
     */
    supprimerFavori(nom) {
        this.favoris = this.favoris.filter(fav => fav !== nom);
        localStorage.setItem('mesFavoris', JSON.stringify(this.favoris));
        this.vue.afficherFavoris(this.favoris);

        // Si on vient de supprimer le favori qu'on est en train de regarder, on vide l'étoile
        if (this.rechercheActuelle === nom) {
            this.vue.majEtatEtoile(false);
        }
    }
}