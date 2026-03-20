/**
 * Modèle Produit
 * Classe représentant un produit alimentaire
 * Elle a pour rôle de nettoyer et simplifier les données brutes renvoyer par L'API
 * Cela permet au reste de l'application de manipuler un objet propre
 */
export default class Produit {
    
    /**
     * Prend en paramètre bloc de données brut renvoyé par l'api qui correspond au JSON d'un produit
     * @param {*} apiData 
     */
    constructor(apiData) {
        //On recupère le nom du produit (en français en priorité si cela est possible)
        this.nom = apiData.product_name_fr || apiData.product_name || "Produit inconnu";
        
        // On récupère la marque et l'image
        this.marque = apiData.brands || "Marque inconnue";
        this.image = apiData.image_front_url || apiData.image_url || ""; // Image vide si non trouver
        
        // On extrait les nutriments pour 100g (gestion des cas où la donnée n'existe pas)
        const nutriments = apiData.nutriments || {};
        this.calories = nutriments['energy-kcal_100g'] || 0; //Calories pour 100g
        this.proteins = nutriments.proteins_100g || 0;      //Protéines
        this.glucides = nutriments.carbohydrates_100g || 0;    //Glucides
        this.lipides = nutriments.fat_100g || 0;   //Lipides
    }
}