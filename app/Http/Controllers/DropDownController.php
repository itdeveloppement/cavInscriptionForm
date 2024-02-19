<?php 

namespace App\Http\Controllers;
use App\Models\DropDownAges;
use App\Models\DropDownTailles;
use App\Models\DropDownPoids;
use Illuminate\Http\Request;

class DropDownController extends Controller {

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
     * Methode pour recuperer le contenue liste deroulante ages
     * 
     * @returm 
     */
    public function dropDownAges() {

        $dropDownAges = DropDownAges::all();

        if (!empty($dropDownAges)) {
            // Clean the data before encoding to JSON
            $cleanedDataAges = $this->cleanData($dropDownAges->toArray());

            // Renvoyer les données au format JSON
            header('Content-Type: application/json');
            // echo json_encode($cleanedDataAges);
            return response()->json($cleanedDataAges);
            
        };  
        // redirection vers page erreur technique
    }

  /**
     * Methode pour recuperer le contenue liste deroulante tailles
     * 
     * @returm 
     */
    public function dropDownTailles() {

        $dropDownTailles = DropDownTailles::all();

        if (!empty($dropDownTailles)) {
            // Clean the data before encoding to JSON
            $cleanedDataTailles = $this->cleanData($dropDownTailles->toArray());

            // Renvoyer les données au format JSON
            header('Content-Type: application/json');
            return response()->json($dropDownTailles);
        }; 
        // redirection vers page erreur technique
    }

    /**
     * Methode pour recuperer le contenue liste deroulante poids
     * 
     * @returm 
     */
    public function dropDownPoids() {

        $dropDownPoids = DropDownPoids::all();

        if (!empty($dropDownPoids)) {
            $cleanedDataPoids = $this->cleanData($dropDownPoids->toArray());

            // Renvoyer les données au format JSON
            header('Content-Type: application/json');
            return response()->json($cleanedDataPoids);
        };

        // redirection vers page erreur technique
        
    }

    
}      
