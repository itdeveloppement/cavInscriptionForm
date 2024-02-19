const showData = {

    init: function(id) {
       // recuperation des donnéers de la bdd (bulletin et participants)
            fetch(`${app.baseEndpoint.endpoint_bulletin}/api/inscriptions/${id}`) 
            .then( function(response) {
                if (!response.ok) {
                    // Throw a 404 error if the response status is not in the 200 range
                    throw new Error(`Bulletin not found (${response.status})`);
                  }

                return response.json(response);
            })

            .then(function(bulletin) {
               
            // si un champ de la base de donnée est vide affecter la propriete null pour permetytre a json de poursuivre
                const cles = Object.keys(bulletin);
                const valeurs = Object.values(bulletin);
                function parcourirEtRemplacer(bulletin) {
                    for (const propriete in bulletin) {
                      if (bulletin[propriete] === null || bulletin[propriete] === undefined || bulletin[propriete] === "") {
                        bulletin[propriete] = null;
                      } else if (typeof bulletin[propriete] === "object") {
                        parcourirEtRemplacer(bulletin[propriete]);
                      }
                    }
                  }
                  parcourirEtRemplacer(bulletin);

               
                showData.extractData(bulletin);
                showData.selectDatasParticipant(bulletin);
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

    // extraction des données et affichage
    extractData: function (bulletin, dateFormatee){
           // champs non affichés 
           id_participant = bulletin.participant[0].bulletin_id;
           document.getElementById("participant_id1").textContent = id_participant;
           document.getElementById("participant_id2").textContent = id_participant;
       
           id_activite = bulletin.participant[0].activite_id;
           document.getElementById("activite_id1").textContent = id_activite;
           document.getElementById("activite_id2").textContent = id_activite;

            // traitement données du bulletin et affichage
            nomClient = bulletin.NomTiers;
            // ecran 1
            document.getElementById("nom1").textContent = nomClient;
            // ecran 2
            document.getElementById("nom2").textContent = nomClient;

            lieuActivite = bulletin.session.Lieu_Activite;
            document.getElementById("lieu1").textContent = lieuActivite;
            document.getElementById("lieu2").textContent = lieuActivite;

            activite = bulletin.session.intitule_custom;
            document.getElementById("activite1").textContent = activite;
            document.getElementById("activite2").textContent = activite;

            dateActivite = bulletin.session.calendrier.heured;
            
            showData.dateFormat(dateActivite);     
        },

        // affichage de la date au format
        extractDataDate: function (dateFormatee){
            document.getElementById("date1").textContent = dateFormatee;       
            document.getElementById("date2").textContent = dateFormatee;
        },

        // mise au format de la date
        dateFormat: function(dateActivite) {

        // Date au format "2023-06-10 09:00:00"
        const dateString = dateActivite;

        // Créer un objet Date à partir de la chaîne de date
        const dateObj = new Date(dateString);
        // Tableaux pour traduire les mois et les jours de la semaine
        const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        const jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

        // Extraire le jour, le mois, l'année, les heures et les minutes
        const jour = dateObj.getDate();
        const moisIndex = dateObj.getMonth();
        const annee = dateObj.getFullYear();
        const heure = dateObj.getHours();
        const minute = dateObj.getMinutes();
        const jourSemaineIndex = dateObj.getDay();
        // majuscule sur le premier jours e la semaine
        const jourSemaine = jours[jourSemaineIndex].charAt(0).toUpperCase() + jours[jourSemaineIndex].slice(1);
       
        // Formatter la date
        var dateFormatee = jourSemaine + " " + jour + " " + mois[moisIndex] + " " + annee + " à " + heure + "h" + (minute < 10 ? "0" : "") + minute;

        showData.extractDataDate(dateFormatee);
        },

        // LISTE DES PARTICIPANTS

    // recupertation des données des champs à afficher
    selectDatasParticipant: function(bulletin) {
        
            for (const participant of bulletin.participant) {
                idBulletin = bulletin.id;
                idParticipant = participant.id;
                

                prenom = participant.NomPrenom;
               
                if (participant.NomPrenom === null){
                    prenom = "";
                } else {  prenom = participant.NomPrenom;}
           
                // taille = participant.taille.libelle;
                if (participant.taille === null){
                    taille = "";
                } else { taille = participant.taille.libelle;}

                // poid = participant.poid.libelle;
                if (participant.poid === null){
                    poid = "";
                } else {poid = participant.poid.libelle;}

                // age = participant.age.libelle;
                if (participant.age === null){
                    age = "";
                } else { age = participant.age.libelle;}

                showData.createEltParticipant(idParticipant, idBulletin, prenom, taille, poid, age);
            }
        },

    // creation des elements des participants et remplissage des champs
    createEltParticipant: function(idParticipant, idBulletin, prenom, taille, poid, age) {
        
        // creation des elements d'affichage des participants
        const divElt01 = document.createElement("div");
        divElt01.classList.add("div5b");

        const divElt001 = document.createElement("div");
        divElt001.classList.add("text_titre_ecran");
        divElt001.textContent = "Participant";

        const divElt1 = document.createElement("div");
        divElt1.classList.add("div5a");
            const divElt2 = document.createElement("div");
            divElt2.id ="prenomParticipant";
            divElt2.classList.add("champ_participant");
            divElt2.textContent = prenom;
            divElt2.classList.add(idParticipant);
            // si champ vide / valeur par defaut
            if(prenom.length == 0) { 
            divElt2.textContent="Prenom";
            divElt2.classList.add("colorRed"); }

        const divElt3 = document.createElement("div");
        divElt3.classList.add("div5ba");
            const divElt4 = document.createElement("div");
            divElt4.id ="age";
            divElt4.classList.add("champ_participant");
           
            divElt4.textContent= age ;
            divElt4.classList.add(idParticipant);
            // si champ vide / valeur par defaut
            if(age.length == 0) { 
                divElt4.textContent="Age";
                divElt4.classList.add("colorRed"); }
       
        const divElt5 = document.createElement("div");
        divElt5.classList.add("div5bb");
            const divElt6 = document.createElement("div");
            divElt6.id ="taille";
            divElt6.classList.add("champ_participant");
            divElt6.textContent=taille;
            divElt6.classList.add(idParticipant);
            // si champ vide / valeur par defaut
            if(taille.length == 0) { 
                divElt6.textContent="Taille";
                divElt6.classList.add("colorRed"); }
        
        const divElt7 = document.createElement("div");
        divElt7.classList.add("div5bc");
            const divElt8 = document.createElement("div");
            divElt8.id ="poids";
            divElt8.classList.add("champ_participant");
            divElt8.textContent=poid;
            divElt8.classList.add(idParticipant);
            // si champ vide / valeur par defaut
            if(poid.length == 0) { 
                divElt8.textContent="Poids";
                divElt8.classList.add("colorRed"); }
       
        //element boutons modifier
        const divElt9 = document.createElement("div");
        divElt9.classList.add("champ_participant");
        divElt9.classList.add("div5bd");
        
        const divElt11 = document.createElement("buttom");
        divElt11.classList.add("boutons");
        divElt11.textContent="Modifier";
        divElt11.id = "ouvrirModal";
        divElt11.classList.add(idParticipant);

        // pose ecouteur evenement sur le bouton modifer pour ouverture modale
        divElt11.addEventListener("click", function() {

            // rendre invisible bouton modifer avec modif clas css 
            const divElt11 = document.getElementsByClassName('div5bd');
            // il faut transformer htmlCollection en tableau pour l'effacer
            var array = Array.from(divElt11); 
            // lecture du tabelau
            for (const elt of array) {
            
            // modif class css
            elt.style.display = 'none';
            }
            showModal.init(idParticipant, idBulletin); 
        })
        
        // hiarchisation des elements du DOM pour la liste des participants
        const formEltPartcipant = document.querySelector("div.affichageParticipant");

        // titre participant
        formEltPartcipant.append(divElt001);
     
        formEltPartcipant.append(divElt01);
        
        divElt01.append(divElt1);
        divElt1.append(divElt2);

        divElt01.append(divElt3);
        divElt3.append(divElt4);

        divElt01.append(divElt5);
        divElt5.append(divElt6);

        divElt01.append(divElt7);
        divElt7.append(divElt8);

        // elements buttons modifier
        divElt01.append(divElt9);
        divElt9.append(divElt11);
    }, 
    
}

