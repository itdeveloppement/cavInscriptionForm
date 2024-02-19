

<?php 
// pour le serveur hébergé
// header('Access-Control-Allow-Origin: https://fourmitest2.cigaleaventure.com');

// Pour le local
/*
header('Access-Control-Allow-Origin: https://localhost/dolibarr-17.0.3, http://localhost:8000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');
*/

// Sur Server
?> 

@php
header('Access-Control-Allow-Origin: https://cigaleaventure.gestioncloudmc.com/, https://cigaleaventure.gestioncloudmc.com//*');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');
@endphp

<?php 
// @include('template.header');
// $originalUri = $_SERVER['HTTP_X_ORIGINAL_URI'];
// echo '$originalUri';
// var_dump ($_BASEURI)

?>
<!-- HEADER A FACTORISER ET TROUVER SOLUTION POUR INCLUDE BLADE QUI NE FONCTIONNE PAS -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- -->
    <meta name="app-url" content="{{ config('app.url') }}">
    <title>Formulaire activite Cigale Aventure</title>
    <link rel="stylesheet" href="{{ asset('css/reboot.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    
   <!--  <link rel="stylesheet" href="assets/css/reboot.css"> 
    <link rel="stylesheet" href="assets/css/style.css"> -->

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap" rel="stylesheet">
    
</head>

<body>

    <div class="container">
        <div class="image" >
            
            <img class="image_logo" src="{{ asset('images/banniere.png') }}" alt="image logo Cigale Aventure">
        <!--
             <a class="text_faq" href="">F.A.Q</a> 
        -->

        </div>

        <div class="text_presentation">
             
                <span class="text_presentation1"><span class="text_presentation_vert">Préparation du materiel </span>de votre activités. <span class="text_presentation_vert">Vérifier et modifier </span>les informations : prénom, âge, taille, poids. 
            
        </div>
            
                <div class="text_titre_ecran1">Votre activité</div>

            <!-- donnée provenant de la BDD / affichage sur ecran 1 inf a 700px-->
        <form action="page.html" method="post">    

                <div class="box_activite_ecran1" >
                    <div id="participant_id1" class="intitule1 elementHidden"></div>
                    <div id="activite_id1" class="intitule1 elementHidden"></div>
                    <div id="nom1" class="intitule1"></div>
                    <div id="date1" class="intitule1"></div>
                    <div id="activite1" class="intitule1"></div>
                    <div id="lieu1" class="intitule1"></div>
                </div>

            <!-- donnée provenant BDD / affichage sur ecran 2 sup à 700px-->

                <div class="box_activite_ecran2" >
                    <div id="participant_id2" class="intitule2 elementHidden"></div>
                    <div id="activite_id2" class="intitule2 elementHidden"></div>
                    <div id="nom2"class="intitule2 nom1"></div>
                    <div id="date2" class="intitule2"></div>
                    <div id="activite2" class="intitule2"></div>
                    <div id="lieu2" class="intitule2"></div>
                </div>       

            <!-- FORMULAIRE D'AFFICHAGE -->
        
            <div class="text_titre_ecran2">Liste des participants</div>
            <!--  modification BDD / affichage sur tous les ecrans   -->
               
            <div class="affichageParticipant">
            <!-- <div class="text_titre_ecran">Participant1</div>
                    <div  class="div5b">
                
                        <div class="div5a">
                            <div class="champ_participant"></div>
                        </div>
                        <div class="div5ba">
                            <div id="age" class="champ_participant"></div>
                        </div>
                        <div class="div5bb">
                            <div id="taille" class="champ_participant"></div>
                        </div>
                        <div class="div5bc">
                            <div id="poids" class="champ_participant"></div>
                        </div> 
                    bouton de supression ou modification d'un participant   
                        <div id="boutonMod" class="div5bd champ_participant">                    
                            <buttom class="boutons">Mod</buttom>   
                        </div>  
                        <div id="boutonSup"class="div5bd champ_participant">
                                <buttom class="boutons">Sup</buttom>    
                        </div> 
                    </div>    
                    -->  
            </div>
        </form>  
    </div>

    <!-- MODAL A FACTORISER ET TROUVER SOLUTION POUR INCLUDE BLADE QUI NE FONCTIONNE PAS -->

    <div class="containerModal1">
        <div id="modal" class="modal">
            <div class="text_presentation">
                <span class="text_presentation1">Renseignier <span class="text_presentation_vert">pour chaque participant</span> le prénom, l'âge, la taille, le poids,  puis cliquer sur valider.</span>
            </div>
            <form id="modalForm">
                <div class="modal-contenu">
                        <div>
                            <div id="affichageParticipant2"></div>
                        </div>
                </div>
            </form>
            <!-- message de validation des modifcation -->
            <div class="message-contenu"></div>
            </div>
        </div>
    </div>

    <!-- FOOTER A FACTORISER ET TROUVER SOLUTION POUR INCLUDE BLADE QUI NE FONCTIONNE PAS -->
    
    <div class="div7 container">
        <span><span class="p3">Cigale Aventure est à votre écoute.</span><br><strong> (+33) 09 80 36 37 84</strong> - contact@cigaleaventure.com</span>
    </div>

</body>

</html>
        <!-- ecriture  le moteur blade -->
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('js/showData.js') }}"></script>
        <script src="{{ asset('js/showModal.js') }}"></script>
        <script src="{{ asset('js/showDropDown.js') }}"></script>
      
       
       
       