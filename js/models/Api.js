export default class Api {
    constructor() {
        this.urlBase = "https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=20&fields=product_name_fr,product_name,brands,image_front_url,nutriments&search_terms=";
    }

    async chercherProduits(nom) {
        try {
            const urlCible = this.urlBase + encodeURIComponent(nom);
            
            // On utilise un autre proxy, souvent mieux toléré par les réseaux stricts
            const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(urlCible);

            const reponse = await fetch(proxyUrl);
            
            if (!reponse.ok) {
                throw new Error(`Serveur injoignable (Code: ${reponse.status})`);
            }

            const donnees = await reponse.json();
            return donnees.products || [];
            
        } catch (erreur) {
            console.error("Erreur réseau API :", erreur);
            throw erreur; 
        }
    }
}