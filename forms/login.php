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
                    echo "Non ti sei ancora registrato.";
                    return;
                }

                //$pwd = password_hash($_POST["pwd"], PASSWORD_DEFAULT);
                /* Controlla se la password inserita coincide con quella nel db. */
                $psw = $_POST["psw"];
                $query = "SELECT * FROM users WHERE email=$1 AND psw=$2";
                $result = pg_query_params($dbconn, $query, array($email, $psw));
                if (!($tuple = pg_fetch_array($result, null, PGSQL_ASSOC))) {
                    echo "Password errata.";
                    return;
                }

                /* Blocco da eseguire in caso di successo. */
                $username = $tuple["username"];
                echo "Benvenuto $username.";
            }

            pg_free_result($res);
            pg_close($dbconn);
        ?>
    </body>
</html>