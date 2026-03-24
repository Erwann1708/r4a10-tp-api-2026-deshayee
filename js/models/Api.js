export default class Api {

    /**
     * Le constructeur de l'API initialise l'URL de base pour les requêtes à l'API OpenFoodFacts.
     *Cette URL inclut déjà les paramètres pour obtenir une réponse au format JSON.
     * ici on limite le nombre de résultats à 20, et  o, spécifie les champs que nous voulons récupérer pour chaque produit.
     */
    constructor() {
        this.urlBase = "https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=20&fields=product_name_fr,product_name,brands,image_front_url,nutriments&search_terms=";
    }

    /**
     * Recherche des produits selon un nom.
     * @param {*} nom nom du produit à rechercher
     * @returns 
     */
    async chercherProduits(nom) {
        try {
            const urlCible = this.urlBase + encodeURIComponent(nom);
            
            //On utilise un proxy pour contourner les problèmes de CORS, car l'API OpenFoodFacts ne permet pas les requêtes directes depuis le navigateur.
            const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(urlCible);

            // On effectue la requête fetch vers le proxy, qui redirigera vers l'API OpenFoodFacts
            const reponse = await fetch(proxyUrl);
            
            if (!reponse.ok) {
                throw new Error(`Serveur injoignable (Code: ${reponse.status})`);
            }

            // On parse la réponse JSON pour obtenir les données des produits
            const donnees = await reponse.json();
            return donnees.products || [];
            
        } catch (erreur) {
            console.error("Erreur réseau API :", erreur);
            throw erreur; 
        }
    }
}