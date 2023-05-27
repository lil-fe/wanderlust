<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: ./index.html");
        exit();
    }

    // Controlla se è stato caricato un file
    if (isset($_FILES["image"])) {
        $targetDir = "./user-pics/";  // Directory di destinazione per salvare le immagini
        $targetFile = $targetDir . basename($_FILES["image"]["name"]);  // basename restituisce il nome del file senza il percorso completo

        // Controlla se il file è un'immagine valida
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION)); // restituisce l'estensione del file in piccolo
        $allowedExtensions = array("jpg", "jpeg", "png", "gif");
        if (in_array($imageFileType, $allowedExtensions)) { // in_array verifica se è presente $imageFileType in $allowedExtensions
            // Sposta il file nella directory di destinazione
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                // Restituisce l'URL dell'immagine caricata
                $imageUrl = "user-pics/" . basename($_FILES["image"]["name"]);
                //echo json_encode(array("imageUrl" => $imageUrl));
                echo $imageUrl;
                exit();
            } else {
                // Errore nel salvataggio del file
                echo json_encode(array("error" => "Errore nel caricamento dell'immagine."));
                exit();
            }
        } else {
            // Tipo di file non consentito
            echo json_encode(array("error" => "Sono consentiti solo file di immagini JPG, JPEG, PNG e GIF."));
            exit();
        }
    } else {
        // Nessun file caricato
        echo json_encode(array("error" => "Nessun file caricato."));
        exit();
    }
?>