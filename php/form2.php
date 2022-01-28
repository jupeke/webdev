<?php
    $name = "";
    $error = "";
    $comment = "";
    $details_ok = False;

    if(isset($_POST["name"]) && isset($_POST["comment"])){
        $name = $_POST["name"];
        $comment = $_POST["comment"];
        $details_ok = True;
    }

    $head =
        '<head>
        <title>PHP Home</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="styles.css">
        </head>';

    $form =
        '<form method="post">
          <label for="name">Your name:</label><br>
          <input type="text" id="name" name="name" value="'.$name.'"><br>
          <label for="comment">Comment:</label><br>
          <input type="text" id="comment" name="comment" value="'.$comment.'"><br>
          <input type="submit" value="Submit">
        </form>';
    
    $message =
        '<p>Write you name and a comment in the text fields
        and press the button.</p>';

    if ($details_ok){
        $message =
            '<p>Your name is "'.$name.'" and comment "'.$comment.'".</p>';
    }
    $body =
        '<body>
            <ul id="linkbar">
              <?php include "links.php" ?>
            </ul>
            <h1>Forms 2</h1>'
            .$message
            .$form.
        '</body>';

    $html = '<html>'.$head.$body.'</html>';
    echo $html;
?>
