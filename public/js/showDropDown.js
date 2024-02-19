const showDropDown= {

    init: function(age, taille, poid) {

        // recuperation des données pour la liste deroulante ages
        fetch (`${app.baseEndpoint.endpoint_bulletin}/api/dropdown/ages`) 
            .then(function(response){
                return response.json();
            })
            .then(function(dataDropDownAges){
                
                showDropDown.dropDownAges(dataDropDownAges, age);

            })

        // recuperation des données pour la liste deroulante tailles
        fetch (`${app.baseEndpoint.endpoint_bulletin}/api/dropdown/tailles`) 
            .then(function(response){
                return response.json();
            })
            .then(function(dataDropDownTailles){
                showDropDown.dropDownTailles(dataDropDownTailles, taille);
            })

            .catch(function(error) {
                if (error.message.startsWith("Bulletin not found")) {
                    // Handle the 404 error specifically
                    console.error("Error: Bulletin not found");
                    // ICI IL FAUT RENVOYER SUR UNE PAGE MESSAGE "UNE ERREUR TECHNIQUE C EST PRODUITE MERCI DE CONTACTER CAV"
                  } else {
                    // Handle other errors
                    console.error("Error parsing JSON:", error);
                    // ... handle other errors appropriately
                    // ICI IL FAUT RENVOYER SUR UNE PAGE MESSAGE "UNE ERREUR TECHNIQUE C4EST PRODUITE MERCI DE CONTACTER CAV"
                  }
              });

        // recuperation des données pour la liste deroulante poids
        fetch (`${app.baseEndpoint.endpoint_bulletin}/api/dropdown/poids`) 
            .then(function(response){
                return response.json();
            })
            .then(function(dataDropDownPoids){
                showDropDown.dropDownPoids(dataDropDownPoids, poid);
            })

            .catch(function(error) {
                if (error.message.startsWith("Bulletin not found")) {
                    // Handle the 404 error specifically
                    console.error("Error: Bulletin not found");
                    // ICI IL FAUT RENVOYER SUR UNE PAGE MESSAGE "UNE ERREUR TECHNIQUE C EST PRODUITE MERCI DE CONTACTER CAV"
                  } else {
                    // Handle other errors
                    console.error("Error parsing JSON:", error);
                    // ... handle other errors appropriately
                    // ICI IL FAUT RENVOYER SUR UNE PAGE MESSAGE "UNE ERREUR TECHNIQUE C4EST PRODUITE MERCI DE CONTACTER CAV"
                  }
              });
            
        
    },

    // creation et affichage du contenue liste ages
    dropDownAges: function (dataDropDownAges, age){
    
        const dropDownAges = document.getElementById('dropDownAges');
        // creation de la l'option (ligneµ/champ) - choisir -
        const optionElt = document.createElement('option');
        optionElt.value = -1;
        optionElt.textContent = "- choisir -";
        dropDownAges.appendChild(optionElt);

        dataDropDownAges.forEach(function (ages) {
            const optionElt = document.createElement('option');
            optionElt.value = ages.id;
            optionElt.textContent = ages.libelle;
            dropDownAges.appendChild(optionElt);
            // affichage de l'age en cours
            if (ages.id === age) {
                optionElt.selected = true; // Sélectionnez l'option de la taille souhaitée
              }
        });
    },

    // creation et affichage du contenue liste tailles
    dropDownTailles: function (dataDropDownTailles, taille){

        const dropDownTailles = document.getElementById('dropDownTailles');

        const optionElt = document.createElement('option');
        optionElt.value = -1;
        optionElt.textContent = "- choisir -";
        dropDownTailles.appendChild(optionElt);

        dataDropDownTailles.forEach(function (tailles) {
            const optionElt = document.createElement('option');
            optionElt.value = tailles.id;
            optionElt.textContent = tailles.libelle;
            dropDownTailles.appendChild(optionElt);
            // affichage de la taille en cours
            if (tailles.id === taille) {
                optionElt.selected = true; // Sélectionnez l'option de la taille souhaitée
              }
        });
    },

    // creation et affichage du contenue liste ages
    dropDownPoids: function (dataDropDownPoids, poid){

        const dropDownPoids = document.getElementById('dropDownPoids');

        const optionElt = document.createElement('option');
        optionElt.value = -1;
        optionElt.textContent = "- choisir -";
        dropDownPoids.appendChild(optionElt);

        dataDropDownPoids.forEach(function (poids) {
            const optionElt = document.createElement('option');
            optionElt.value = poids.id;
            optionElt.textContent = poids.libelle;
            dropDownPoids.appendChild(optionElt);
            // affichage du poids en cours
            if (poids.id === poid) {
                optionElt.selected = true; // Sélectionnez l'option de la taille souhaitée
              }
        });
    },
}
