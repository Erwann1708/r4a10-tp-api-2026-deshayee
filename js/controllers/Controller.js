import Produit from '../models/Produit.js';
import Api from '../models/Api.js';

export default class Controller {

    /**
     * Le constructeur du controller reçoit une instance de la vue pour pouvoir lui demander de mettre à jour l'affichage.
     */
    constructor(vue) {
        this.vue = vue;
        this.api = new Api(); 
        
        //Charge les favoris depuis la mémoire du navigateur au démarrage
        this.favoris = JSON.parse(localStorage.getItem('mesFavoris')) || [];
        this.rechercheActuelle = ''; // Garde en mémoire le mot actuellement affiché

        // liste les favoris au démarrage
        this.vue.afficherFavoris(this.favoris);
        this.vue.majEtatEtoile(false, true);
    }

    /**
     * Recherche des produits selon un nom et une limite.
     * @param {*} nomRecherche est le mot à rechercherr dans les produits
     * @param {*} limite la quantité maximale de produits à afficher (par défaut 5)
     */
    async rechercherProduit(nomRecherche, limite = 5) {
        if (!nomRecherche || nomRecherche.trim() === '') return;

        this.rechercheActuelle = nomRecherche.trim().toLowerCase();
        this.vue.afficherChargement(true);

        try {
            const produitsBruts = await this.api.chercherProduits(nomRecherche);

            if (produitsBruts.length > 0) {
                // On transforme les données brutes en instances de la classe Produit, et on limite le nombre d'affichages selon la limite donnée
                const listeFiltree = produitsBruts.slice(0, limite).map(donneeBrute => new Produit(donneeBrute));

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
     * Gere l'ajout ou la suppression d'un favori selon son état actuel. Si le mot n'est pas un favori, on l'ajoute. 
     * Sinon, on demande confirmation avant de le supprimer.
     * @returns
     */
    gererFavori() {
        if (!this.rechercheActuelle) return;

        const index = this.favoris.indexOf(this.rechercheActuelle);

        // Si ce n'est pas un favori, on l'ajoute.
        if (index === -1) {
            this.favoris.push(this.rechercheActuelle);
        } else {
            // Confirmation avant de supprimer le favori
            const confirmation = confirm(`Voulez-vous vraiment supprimer "${this.rechercheActuelle}" de vos favoris ?`);
            if (confirmation) {
                this.favoris.splice(index, 1);
            } else {
                return;
            }
        }

        //Sauvegarde la nouvelle liste dans le navigateur
        localStorage.setItem('mesFavoris', JSON.stringify(this.favoris));

        //La vue affiche la nouvelle liste de favoris et met à jour l'état de l'étoile
        this.vue.afficherFavoris(this.favoris);
        this.vue.majEtatEtoile(this.favoris.includes(this.rechercheActuelle));
    }

    /**
     * Supprime un favori spécifique depuis la liste
     */
    supprimerFavori(nom) {
    
        const confirmation = confirm(`Voulez-vous vraiment supprimer "${nom}" de vos favoris ?`);
        
        if (confirmation) {
            this.favoris = this.favoris.filter(fav => fav !== nom);
            localStorage.setItem('mesFavoris', JSON.stringify(this.favoris));
            this.vue.afficherFavoris(this.favoris);

            // Si on vient de supprimer le favori qu'on est en train de regarder, on vide l'étoile
            if (this.rechercheActuelle === nom) {
                this.vue.majEtatEtoile(false);
            }
        }
    }
}