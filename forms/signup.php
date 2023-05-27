<!-- 
    >>> pg_free_result(): libera la memoria associata a un risultato di una
        query eseguita con pg_query() o pg_query_params():
    >>> pg_close(): chiude una connessione attiva a postgre.
    >>> pg_query_params(): permette di eseguire una query parametrizzata.
    >>> pg_fetch_array(): recupera una tupla dal risultato di una query come
        un array associativo (tipo map).
-->
<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: ../index.html");
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
                    //echo "Username già esistente.";
                    header("Location: ../index.html");
                    /*echo '<div class="alert alert-danger signup-alerts" role="alert" id="existing-username-alert">
                        <strong>Username</strong> già esistente.</div>';*/
                    echo 'alert("Username già esistente")';
                    exit();
                }

                /* Controlla se l'email esiste già. */
                $email = $_POST["email"];
                $query = "SELECT * FROM users WHERE email=$1";
                $result = pg_query_params($dbconn, $query, array($email));
                if ($tuple = pg_fetch_array($result, null, PGSQL_ASSOC)) {
                    //echo "Email già esistente.";
                    exit();
                }

                /* Registrazione dell'utente */
                $psw = $_POST["psw"];
                $query = "INSERT INTO users VALUES ($1::text, $2::text, $3::text)";
                $result = pg_query_params($dbconn, $query, array($username, $email, $psw));
                if ($result) {
                    header("Location: ../index.html");
                    exit();
                } else {
                    echo "Registrazione fallita." . pg_last_error($dbconn);
                    exit();
                }
            }

            pg_free_result($result);
            pg_close($dbconn);
        ?>
    </body>
</html>