<?php
    session_start();

    // Chiusura connessione al db
    if (isset($dbconn)) {
        pg_close($dbconn);
    }

    // Rimozione variabili di sessione
    unset($_SESSION["logged_in"]);
    unset($_SESSION["username"]);

    // session_destroy();

    // Reindirizza l'utente alla home
    header("Location: ../index.html");
    exit();
?>