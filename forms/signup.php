<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    } else {
        $dbconn = pg_connect("host=localhost user=postgres password=psql
            port=5432 dbname=Wanderlust")
            or die('Connessione al db fallita: ' . pg_last_error());
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Registrazione</title>
    </head>
    <body>
        <?php
            if ($dbconn) {
                /* Controlla se l'username esiste già. */
                $username = $_POST["username"];
                $query = "SELECT * FROM users WHERE username=$1";
                $result = pg_query_params($dbconn, $query, array($username));
                if ($tuple = pg_fetch_array($result, null, PGSQL_ASSOC)) {
                    echo "Username già esistente.";
                    return;
                }

                /* Controlla se l'email esiste già. */
                $email = $_POST["email"];
                $query = "SELECT * FROM users WHERE email=$1";
                $result = pg_query_params($dbconn, $query, array($email));
                if ($tuple = pg_fetch_array($result, null, PGSQL_ASSOC)) {
                    echo "Email già esistente.";
                    return;
                }

                /* Registrazione dell'utente */
                $psw = $_POST["psw"];
                $query = "INSERT INTO users VALUES ($1, $2, $3)";
                $result = pg_query_params($dbconn, $query, array($username, $email, $psw));
                if ($res) {
                    echo "Registrazione completata";
                    header("Location: ../index.html");
                }
            }

            pg_free_result($result);
            pg_close($dbconn);
        ?>
    </body>
</html>