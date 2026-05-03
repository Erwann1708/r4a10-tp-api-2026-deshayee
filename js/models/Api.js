export default class Api {

    /**
     * Le constructeur de l'API initialise l'URL de base pour les requêtes à l'API OpenFoodFacts.
     *Cette URL inclut déjà les paramètres pour obtenir une réponse au format JSON.
     * ici on limite le nombre de résultats à 20, et  o, spécifie les champs que nous voulons récupérer pour chaque produit.
     */
    constructor() {
        // Ajout de `sort_by=unique_scans_n` pour trier les résultats par popularité et améliorer la pertinence.
        this.urlBase = "https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=20&sort_by=unique_scans_n&fields=product_name_fr,product_name,brands,image_front_url,nutriments&search_terms=";
    }

    /**
     * Recherche des produits selon un nom.
     * @param {*} nom nom du produit à rechercher
     * @returns 
     */
    async chercherProduits(nom, tentatives = 3) {
        const urlCible = this.urlBase + encodeURIComponent(nom);
        
        // Boucle qui retente automatiquement l'appel à l'API en cas d'erreur
        for (let i = 0; i < tentatives; i++) {
            try {
                const reponse = await fetch(urlCible);
                
                if (!reponse.ok) {
                    throw new Error(`Serveur injoignable (Code: ${reponse.status})`);
                }

                const donnees = await reponse.json();
                return donnees.products || [];
                
            } catch (erreur) {
                if (i === tentatives - 1) {
                    console.error("Erreur réseau API après plusieurs tentatives :", erreur);
                    throw erreur; 
                }
                // On attend 500 millisecondes avant de retenter silencieusement
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }
}