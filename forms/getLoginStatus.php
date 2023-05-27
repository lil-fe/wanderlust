<?php
    session_start();
    $loggedIn = isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] ? "true" : "false";
    $username = isset($_SESSION["username"]) ? $_SESSION["username"] : "User";
    $response = array("loggedIn" => $loggedIn, "username" => $username);    // => assegna un valore a una chiave in un array associativo
    echo json_encode($response);    // converte la response (array) in una stringa JSON per poterla restituire nella riposta AJAX
?>