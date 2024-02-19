<?php 

namespace App\Http\Controllers;

use App\Models\Bulletin;
use App\Models\Participant;
use Illuminate\Http\Request;

class FormController extends Controller {

/**
 * fonction pour mettre les donnée au format json (nettoyage)
 */
    private function cleanData(array $data): array {
    
        // Supprimer les champs sensibles
        unset($data['created_at']);
        unset($data['updated_at']);

        // Formater les dates
        foreach ($data as &$value) {
            if (is_array($value) && isset($value['created_at'])) {
                $value['created_at'] = $value['created_at']->toIso8601String();
            }
        }

        // Convertir les valeurs null en chaînes vides
        array_walk_recursive($data, function (&$value) {
            if (is_null($value)) {
                $value = '';
            }
        });
    return $data;
    }

    
      



/**
    * methode pour modifier un participant
    */
    public function updateParticipant(Request $request, $bulletinId, $participantId)
    {
        // Rechercher le bulletin et le participant associé
        $bulletin = Bulletin::findOrFail($bulletinId);
        $participant = $bulletin->participants()->findOrFail($participantId);
        
        // var_dump($participant);
        // Mettre à jour les champs du participant avec les données reçues

        $participant->NomPrenom = $request->input('prenom');
        $participant->age_id = $request->input('ages');
        $participant->poid_id = $request->input('poids');
        $participant->taille_id = $request->input('tailles');
        $participant->save();

        //$participant->update($request->all());

        // verification. Si les données sont sauvegarder retour code 201 sinon 500
        if($participant->save()) {
            return response()->json($participant, 201);
        } else {
            return response()->json($participant, 500);
        }
    }

/**
     * methode pour recuperer un bulletin avec la session et le calendrier
     *
     * @return $bulletin | erreur404 si $bulletin est null
     * @param $id
     */
    public function bull($id){
        
        $bulletin = Bulletin::find($id)->load(
           'session.calendrier', 
           'participant.taille', 
           'participant.poid',
           'participant.age'
       );    

       if ($bulletin === null) {
           return response()->json(null, 404);
       }

        /*
        Log::info( print_r($response, false));
        if (!is_array($bulletin) and !is_object($bulletin)) return 1;
        $response = json_encode($bulletin);
        return $response; 
        */  

       // appel de la fonction pour mettre les données (nettoyées) au format json
        $data = $this->cleanData($bulletin->toArray());
        return response()->json($data);
    }    

/**
 * Mathodde pour recuperer un participant d'un buelletin
 * 
 * @return $participantBulletin // un participant pour un buletin
 */
    public function participantBulletin(Bulletin $bulletin, Participant $participant) 
    {
        // Charger les relations pour obtenir les informations du participant pour ce bulletin
        $bulletin->load('participants');
    
        // Trouver le participant spécifique dans les participants du bulletin
        $participant = $bulletin->participants->find($participant->id);
    
        return  $participant;
    }
}





