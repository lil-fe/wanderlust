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
        <title>Accesso</title>
    </head>
    <body>
        <?php
            if ($dbconn) {
                $email = $_POST["email"];
                $q1 = "SELECT * FROM utente WHERE email=$1";
                $res = pg_query_params($dbconn, $q1, array($email));
                
                if (!($tuple = pg_fetch_array($res, null, PGSQL_ASSOC))) {
                    echo "Non ti sei ancora registrato.<br/>
                        Clicca <a href=./index.html>qui</a> per registrarti.";
                } else {
                    //$pwd = password_hash($_POST["pwd"], PASSWORD_DEFAULT);
                    $pwd = $_POST["pwd"];
                    $q2 = "SELECT * FROM utente WHERE email=$1 AND pwd=$2";
                    $res = pg_query_params($dbconn, $q2, array($email, $pwd));
                    if (!($tuple = pg_fetch_array($res, null, PGSQL_ASSOC))) {
                        echo "Password errata.<br/>
                            Clicca <a href=./login.html>qui</a> per riprovare.";
                    } else {
                        $name = $tuple["name"];
                        echo "Login effettuato: benvenuto $name.";
                    }
                }
            }

            pg_free_result($res);
            pg_close($dbconn);
        ?>
    </body>
</html>