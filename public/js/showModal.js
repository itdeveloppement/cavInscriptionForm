
const showModal = {
    // GESTION DE LA MODALE

    // recuperation des donnée du participant en cours ds la modal
    init: function (idParticipant, idBulletin){
        
        // recuperation des données de la base de donnée
        bulletin = idBulletin;
        participant = idParticipant;

       
        fetch(`${app.baseEndpoint.endpoint_bulletin}/api/inscriptions/bulletin/${bulletin}/participant/${participant}`,) 

        .then( function(response) {
            if (!response.ok) {
                // Throw a 404 error if the response status is not in the 200 range
                throw new Error(`Bulletin not found (${response.status})`);
              }
            return response.json(response);
            })

        .then( function(objetParticipant) {
            showModal.extractDataParticipantModal(objetParticipant, idParticipant, idBulletin);
            showModal.openModal(idParticipant, idBulletin);
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

    // extration des données
    extractDataParticipantModal: function (participant, idParticipant, idBulletin) {
               
        prenom = participant.NomPrenom;
        age = participant.age_id;
        taille = participant.taille_id;
        poid = participant.poid_id;

        showModal.createEltParticipantModal(prenom, age, taille, poid, idParticipant, idBulletin);
    },

    // creation des elements du dom pour la modale pour un participant
    createEltParticipantModal: function(prenom, age, taille, poid, idParticipant, idBulletin) {
      
        // creation des elements d'affichage des participants
        const divElt01 = document.createElement("div");
        divElt01.classList.add("div5bModal");
        
        // champ prenom
        const divElt1 = document.createElement("div");
        divElt1.classList.add("div5a");
        
        const divElt2 = document.createElement("div");
        divElt2.classList.add("champ_participant");
              
        const divElt2M = document.createElement("input");
            divElt2M.type = "text";
            divElt2M.id = "prenom";
            divElt2M.name = "prenom";
            divElt2M.placeholder="Prenom";
            divElt2M.value = prenom;

        // champ age
        const divElt3 = document.createElement("div");
        divElt3.classList.add("div5ba");
        
        const divElt4 = document.createElement("div");
        divElt4.classList.add("champ_participant");

        const divElt4s = document.createElement("select");
            divElt4s.type = "text";
            divElt4s.id = "dropDownAges";
            divElt4s.name = "ages";
          
        // champs taille
        const divElt5 = document.createElement("div");
        divElt5.classList.add("div5bb");
        
        const divElt6 = document.createElement("div");
        divElt6.classList.add("champ_participant");

        const divElt6s = document.createElement("select");
            divElt6s.type = "text";
            divElt6s.id = "dropDownTailles";
            divElt6s.name = "tailles";

        // champs poids
        const divElt7 = document.createElement("div");
        divElt7.classList.add("div5bc");
        
        const divElt8 = document.createElement("div");
        divElt8.classList.add("champ_participant");

        const divElt8s = document.createElement("select");
            divElt8s.type = "text";
            divElt8s.id = "dropDownPoids";
            divElt8s.name = "poids";

        // boutons fermer
        const divElt12 = document.createElement("div");
        divElt12.classList.add("champ_participant");
        divElt12.classList.add("div5bd");

        const divElt13 = document.createElement("buttom");
        divElt13.classList.add("boutons");
        divElt13.id = "fermerModal";
        divElt13.textContent = "Fermer";

        // boutons valider
        const divElt9 = document.createElement("div");
        divElt9.classList.add("champ_participant");
        divElt9.classList.add("div5bd");
        
        const divElt11 = document.createElement("buttom");
        divElt11.classList.add("boutons");
        divElt11.textContent = "Valider";

        // ecouteur evenement sur btm valider
        divElt9.addEventListener('click', function(){
            // affichage message validation des modifications
            showModal.messageValidateChange()

            // fermeture modal après 2 secondes pour visionner message
            setTimeout(function() {
                modal.classList.remove("active");
                showModal.valueChampsModal(idParticipant, idBulletin);
                showModal.deleteEltModal();
                showModal.deleteEltModalMessage();
                
                // ajout de la classe pour afficher les bouton modifier
                const divElt11 = document.getElementsByClassName('div5bd');
                var array = Array.from(divElt11); 
                for (const elt of array) {
                    elt.style.display = 'flex';
                } 
            }, 2000); // 2000 millisecondes = 2 seconde
        });
        
        // hiarchisation des elements du dom
        const formEltPartcipant = document.querySelector("#affichageParticipant2");
        
        formEltPartcipant.append(divElt01);

         // buton fermer
        divElt01.append(divElt12);
        divElt12.append(divElt13);

        // champ prenom
        divElt01.append(divElt1);
        divElt1.append(divElt2);
        divElt2.append(divElt2M);

        // champ ages
        divElt01.append(divElt3);
        divElt3.append(divElt4);
        divElt4.append(divElt4s);
     
        // champ tailles
        divElt01.append(divElt5);
        divElt5.append(divElt6);
        divElt6.append(divElt6s);

        // champ poids
        divElt01.append(divElt7);
        divElt7.append(divElt8);
        divElt8.append(divElt8s);

        // elements buttons valider
        divElt01.append(divElt9);
        divElt9.append(divElt11);

        // affichage des données des listes
        showDropDown.init(age, taille, poid);
        

        // ecouteur element sur btm fermer modal
        const fermerModal = document.getElementById("fermerModal");
        fermerModal.addEventListener("click", function() {
            modal.classList.remove("active");
            showModal.deleteEltModal()
           
            // ajout de la classe pour afficher les bouton modifier
            const divElt11 = document.getElementsByClassName('div5bd');
            // il faut transformer htmlCollection en tableau pour l'effacer
            var array = Array.from(divElt11); 
            // lecture du tabelau
            for (const elt of array) {
           // a jout de la class
            elt.style.display = 'flex';
            } 
        });
        
    },  
    // ferme la modale
    closeModal: function() {
        modalElt = document.getElementById('modal');
        modalEltclassList.remove("active");
    },

    // suprime les elements du dom de la modal
    deleteEltModal: function () {
        // supression du dom affichage participant ds la modale
        eltDomDelete = document.querySelector("#affichageParticipant2 .div5bModal ");
        eltDomDelete.remove(); 
    },

    // suprimer les elements du dom pour le message de validation
    deleteEltModalMessage: function () {
        // supression du dom affichage participant ds la modale
        eltDomDeleteMessage = document.querySelector(".messageValidateChange ");
        eltDomDeleteMessage.remove(); 
    },

    // ouvre la modale
    openModal: function(idParticipant, idBulletin) {
        const modal = document.getElementById("modal");
        modal.classList.add("active");
 
        // showModal.dataParticipantModal(idParticipant, idBulletin);
        },

    // recuperation des valeurs des champs
    valueChampsModal: function(idParticipant, idBulletin) {
    const name = document.getElementById('prenom').value;
    const age = document.getElementById('dropDownAges').value;
    const taille = document.getElementById('dropDownTailles').value;
    const poids = document.getElementById('dropDownPoids').value;

   showModal.updateParticipant(idParticipant, idBulletin, name, age, taille, poids);


    },
    // envoi des données à la bbd
    updateParticipant: async function (idParticipant, idBulletin, name, age, taille, poids){

            // envoi des données a la base
            const response = await fetch(`${app.baseEndpoint.endpoint_bulletin}/api/inscriptions/bulletin/${idBulletin}/participant/${idParticipant}`, 
            
            { 
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                {
                    prenom: name,
                    ages: age,
                    tailles: taille,
                    poids: poids,
                })
            }
        );
            const participant = await response.json();
            showModal.deleteEltParticipant();

            // affichage du message de validation des modifications
            // showModal.messageValdateChange()
            // retour par accueil
            showData.init(idBulletin);

            /* --------------------------------------------------
        // recuperation participant de l'id current
        idCurrent = participant.id

        // console.log(participant);

        // recuperation pour l'idCurrent de l'htmlcollection avec age, poids ...deleteEltParticipant. d'un participant
        eltHTMLCollection = document.getElementsByClassName(idCurrent);
        // transformer htmlCollection en tableau
        var eltArray = Array.from(eltHTMLCollection); 
        // lecture du tabelau
        // console.log(eltArray);

            for (const elt of eltArray) {
                // console.log(elt)

                if(participant.NomPrenom){
                    eltPrenom = document.getElementById("prenomParticipant ");
                    console.log(eltPrenom);
                    eltPrenom.value = participant.NomPrenom;
                }

                if(participant.taille_id){
                    eltTaille = document.getElementById("taille");
                    eltTaille.value = participant.taille_id;
                }

                if(participant.age_id){
                    eltAge = document.getElementById("age");
                    eltAge.value = participant.age_id;
                }

                if(participant.poid_id){
                    eltPoids = document.getElementById("poids");
                    eltPoids.value=participant.poid_id;
                }
                
            } 
        // mise a jour des champs
        eltPrenom = document.getElementById("prenomParticipant");
        console.log(eltPrenom.value);
        
        // showData. updateParticipant(idParticipant, idBulletin);
        // showData.init(idParticipant, idBulletin);
          -------------------------------------------------------  */
        }, 

     // suprime les element du dom de la liste de participant
    deleteEltParticipant: function () {
        // supression du dom ade la liste de participânt
        eltDomParent = document.querySelector(".affichageParticipant");
      
        // console.log(eltDomDelete);
        eltDomEnfant = eltDomParent.children;

        var eltArray = Array.from(eltDomEnfant); 
        // lecture du tabelau
     
        for (const elt of eltArray) {
            elt.remove();
        }
    },

    // message validation des modifications
    messageValidateChange: function () {

        // creation de l'element      
        const divElt15 = document.createElement("div");
        divElt15.classList.add("champ_participant");
        divElt15.classList.add("messageValidateChange");
        divElt15.textContent = "Vos modifications sont enregistrées";

        // placement de l'element dans le dom
        const messageValidateChange = document.querySelector(".message-contenu");
        messageValidateChange.append(divElt15);
    }

   
}