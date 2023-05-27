<?php
    session_start();

    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: ../index.html");
        exit();
    } else {
        $dbconn = pg_connect("host=localhost user=postgres password=psql
            port=5432 dbname=Wanderlust")
            or die('Connessione al db fallita: ' . pg_last_error());
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Accesso</title>
    </head>
    <body>
        <?php
            if ($dbconn) {
                /* Controlla se l'utente con questa mail è già registrato. */
                $email = $_POST["email"];
                $query = "SELECT * FROM users WHERE email=$1";
                $result = pg_query_params($dbconn, $query, array($email));
                if (!($tuple = pg_fetch_array($result, null, PGSQL_ASSOC))) {
                    // sostituire con alert
                    $_SESSION["login_error"] = "Non ti sei ancora registrato";
                    header("Location: ../index.html");
                    exit();
                }

                //$pwd = password_hash($_POST["pwd"], PASSWORD_DEFAULT);
                /* Controlla se la password inserita coincide con quella nel db. */
                $psw = $_POST["psw"];
                $query = "SELECT * FROM users WHERE email=$1 AND psw=$2";
                $result = pg_query_params($dbconn, $query, array($email, $psw));
                if (!($tuple = pg_fetch_array($result, null, PGSQL_ASSOC))) {
                    // sostituire con alert
                    $_SESSION["Login_error"] = "Password errata.";
                    header("Location: ..index.html");
                    exit();
                }

                /* Blocco da eseguire in caso di successo. */
                $_SESSION["logged_in"] = true;
                $_SESSION["username"] = $tuple["username"];
                header("Location: ../index.html");
                exit();
                /*$username = $tuple["username"];
                echo "Benvenuto $username.";*/
            }

            pg_free_result($result);
            pg_close($dbconn);
        ?>
    </body>
</html>