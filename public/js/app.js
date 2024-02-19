const app = {

      baseEndpoint: {
            // endpoint_bulletin : `https://outdoor.cigaleaventure.com/cavInscriptionForm/public`,) 
            // endpoint_bulletin: 'http://localhost:8001',
            endpoint_bulletin: 'http://localhost:8001',
            },

  /*
            // 590001844 ID d'un bulletin existant sur la base fourmi test 2 sur le serveur site Ground
            // 101823 ID d'un bulletin existant sur la base de données fourmi test 2 en local Marti
            // 1, 2 ou 3 ID d'un bulletin existant sur la base de données simplifié en local Marti
            
    */
// appel des fonction a l'ouverture du document
init: function() {

      // Récupèration du dernier segment de l'URL = recuepartion id bulletin
      const id = document.location.pathname.split('/').pop(); // recuper l'url courante est extrait la variable
      showData.init(id);
      }
}
// a l'ouverture appel de la fonction init
document.addEventListener('DOMContentLoaded', app.init);