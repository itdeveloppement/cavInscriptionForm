# Cigale Aventure
- Formulaire de verification ou de collecte d'information pour la preparation du materiel avant une activité

# version
- version 1

# Technologie
- Laravel Framework 10.3.2
- PHP 8.1.13
- Apache 2.4.54.2

# Environnement cpanel o2swith
- dossier laravel : ???
- sous domaine test.gestioncloud.com
- BDD : jmwd5247_doli625 (celle de fourmitest2)
- connexion via : https://test.gestioncloudmc.com/700002000

# Environnement site ground
- dossier Laravel : cavInscriptionForm
- sous domaine outdoor.cigaleaventure.com
- BDD : dbetxgjwagullv(Test-mars 2022 (celle de dolibarr fourmitest2)
- connexion via : http://outdoor.cigaleaventure.com/cavInscriptionForm/public/700002000

# Environnement en local
- dossier Laravel : cavInscriptionForm
- via`localhost`:port/id participant 1, 2, 3
- BDD cigav_form_inscription / USER root
- Modalités de connexion :
  - verifier le .env
  - lancer serveur local wamp
  - lancer dans le dossier racine du projet : php artisan serve
  
  # Parametrage du code entre local et serveur distant
  modification de l'url fetsh dans showData
