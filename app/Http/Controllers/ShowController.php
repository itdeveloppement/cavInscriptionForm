<?php 

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

// affichage de la homepage et transfert de l'id à app
class ShowController extends Controller {

    public function show($id)
    {
        // Retourner la vue homepage et transfert de l'id
        return view('homepage', ['id' => $id]);
    }
}