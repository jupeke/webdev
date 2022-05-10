<?php
    require 'links.php';
    $name = "";
    $message = "No name given!";

    // Checks if there are any not-empty message from the client:
    if(isset($_POST["name"])){
        $name = $_POST["name"];
        if(!empty($name)){
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
            <ul id="linkbar">'.links("root").'</ul>
            <h1>My first form (PHP-first approach)</h1>
            <p>Here the client (browser) sends an HTTP request to the server by
              using the POST method. </p>
            <p class="message">'.$message.'<p>
            <p>Write you name in the text field and press the button.</p>'.
            $form.
        '</body>';

    $html = '<html>'.$head.$body.'</html>';
    echo $html;
?>
