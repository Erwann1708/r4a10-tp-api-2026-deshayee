export default class Api {
    constructor() {
        // On retourne sur l'API V1 (la seule vraie recherche texte) 
        // mais sur le serveur "world" pour éviter le blocage CORS !
        this.urlBase = "https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=20&fields=product_name_fr,product_name,brands,image_front_url,nutriments&search_terms=";
    }

    async chercherProduits(nom) {
        try {
            const reponse = await fetch(this.urlBase + encodeURIComponent(nom));
            
            if (!reponse.ok) {
                throw new Error(`Erreur serveur (${reponse.status})`);
            }

            const donnees = await reponse.json();
            return donnees.products || [];
            
        } catch (erreur) {
            console.error("Erreur réseau API :", erreur);
            throw erreur; 
        }
    }
}