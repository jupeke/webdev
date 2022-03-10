<?php
    require 'links.php';
    $name = "";
    $message = "";

    // Checks if there are any not-empty message from the client:
    if(isset($_POST["name"])){
        $name = $_POST["name"];
        if(empty($name)){
            $message = 'No name given!';
        } else{
            $message = 'Hello '.$name.'!';
        }
    }
    // HTML for the head section:
    $head =
        '<head>
            <title>PHP Home</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="styles.css">
        </head>';

    // HTML for the form:
    $form =
        '<form method="post">
            <label for="name">Your name:</label><br>
            <input type="text" id="name" name="name" value="'.$name.'"><br>
            <input type="submit" value="Submit">
        </form>';

    // HTML for the body section:
    $body =
        '<body>
            <ul id="linkbar">'.$links_html.'</ul>
            <h1>Forms 1 with PHP oriented approach</h1>
            <p>Here the client (browser) sends an HTTP request to the server by
              using the POST method. </p>
            <p class="message">'.$message.'<p>'.
            $form.
        '</body>';

    $html = '<html>'.$head.$body.'</html>';
    echo $html;
?>
