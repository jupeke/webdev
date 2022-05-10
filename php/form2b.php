<?php
    require 'links.php';
    $fname = "";
    $error = "";
    $lname = "";
    $message = "";
    $details_ok = False;

    if(isset($_POST["fname"]) && isset($_POST["lname"])){
        $fname = $_POST["fname"];
        $lname = $_POST["lname"];
        if(empty($name)){
            $message = 'Name is empty! Write a name, please!';
        } else if(empty($comment)){
            $message = 'Comment is empty! Write a comment, please!';
        } else{
            $details_ok = True;
        }
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

    if ($details_ok){
        $message =
            'Your name is "'.$name.'" and comment "'.$comment.'".';
    } else if (empty($message)){
        $message =
            'Write your name and a comment in the text fields
            and press the button.';
    }
    $body =
        '<body>
            <ul id="linkbar">
              '.links("root").'
            </ul>
            <h1>Forms 2 (two text fields)</h1>
            <p>The input is checked by server-side code.
            Test by leaving one of the fields empty.</p>
            <p class="message">'.$message.'<p>'.
            $form.
        '</body>';

    $html = '<html>'.$head.$body.'</html>';
    echo $html;
?>
