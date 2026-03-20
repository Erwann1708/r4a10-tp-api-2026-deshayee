import Produit from '../models/Produit.js';
import Api from '../models/Api.js';

export default class Controller {

    constructor(vue) {
        this.vue = vue;
        this.api = new Api(); 
    }

    async rechercherProduit(nomRecherche) {
        if (!nomRecherche || nomRecherche.trim() === '') return;

        this.vue.afficherChargement(true);

        try {
            const produitsBruts = await this.api.chercherProduits(nomRecherche);

            if (produitsBruts.length > 0) {
                const motCle = nomRecherche.toLowerCase();
                
                const listeFiltree = produitsBruts
                    .map(donneeBrute => new Produit(donneeBrute))
                    .filter(p => p.nom.toLowerCase().includes(motCle) || p.marque.toLowerCase().includes(motCle))
                    .slice(0, 5);

                // LA CORRECTION EST ICI : On empêche l'écran blanc
                if (listeFiltree.length > 0) {
                    this.vue.afficherProduits(listeFiltree);
                } else {
                    // Si le filtre a tout supprimé, on affiche un message propre
                    this.vue.afficherMessage(`(Aucun produit précis trouvé pour "${nomRecherche}")`);
                }
            } else {
                this.vue.afficherMessage("(Aucun résultat renvoyé par l'API)");
            }
        } catch (erreur) {
            this.vue.afficherMessage("Erreur de connexion au serveur.");
        } finally {
            this.vue.afficherChargement(false);
        }
    }
}