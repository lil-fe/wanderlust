<?php
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: /");
    } else {
        $dbconn = pg_connect("host=localhost user=postgres password=psql
            port=5432 dbname=WanderlustUsers")
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
                $email = $_POST["email"];
                $q1 = "SELECT * FROM utente WHERE email=$1";
                $res = pg_query_params($dbconn, $q1, array($email));
                if ($tuple=pg_fetch_array($res, null, PGSQL_ASSOC)) {
                    echo "Sembri essere già registrato.<br/>
                        Clicca <a href=./login.html>qui</a> per loggarti!";
                } else {
                    $name = $_POST["name"];
                    $surname = $_POST["surname"];
                    $pwd = $_POST["pwd"];
                    $q2 = "INSERT INTO utente VALUES ($1, $2, $3, $4)";
                    $res = pg_query_params($dbconn, $q2, array($name, $surname, $email, $pwd));
                    if ($res) {
                        echo "Registrazione completata.<br/>
                            Clicca <a href=./login.html>qui</a> per loggarti!";
                    }
                }
            }

            pg_free_result($res);
            pg_close($dbconn);
        ?>
    </body>
</html>