<?php
    require 'links.php';
    $name = "";
    $error = "";
    $comment = "";
    $message = "";
    $details_ok = False;

    if(isset($_POST["name"])){
        $name = $_POST["name"];
        $comment = $_POST["comment"];
        if(empty($name)){
            $message = 'No name given';
        } else{
            $details_ok = True;
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

    if ($details_ok){
        $message =
            'Your name is "'.$name.'" and comment "'.$comment.'".';
    } else if (empty($message)){
        $message =
            'Write your name and a comment in the text fields
            and press the button.';
    }
    // HTML for the body section:
    $body =
        '<body>
            <ul id="linkbar">
              '.$links_html.'
            </ul>
            <h1>Forms 2</h1>
            <p>Here the client (browser) sends an HTTP request to the server by
              using the POST method.</p>
            <p class="message">'.$message.'<p>'.
            $form.
        '</body>';

    $html = '<html>'.$head.$body.'</html>';
    echo $html;
?>
