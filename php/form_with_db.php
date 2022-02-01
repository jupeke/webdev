<?php
    require 'links.php';
    $error = "";
    $comment = "";
    $message = "";
    $details_ok = False;

    if(isset($_POST["comment"])){
        $comment = $_POST["comment"];
        if(empty($comment)){
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
            <label for="comment">Comment:</label><br>
            <input type="text" id="comment" name="comment" value="'.$comment.'"><br>
            <input type="submit" value="Submit">
        </form>';

    if ($details_ok){
        $message =
            'Your comment: "'.$comment.'".';
    } else if (empty($message)){
        $message =
            'Write a comment in the text field
            and press the button.';
    }
    $body =
        '<body>
            <ul id="linkbar">
              '.$links_html.'
            </ul>
            <h1>Persistent comments</h1>
            <p>Persistent: comments are saved to a database.</p>
            <p class="message">'.$message.'<p>'.
            $form.
        '</body>';

    $html = '<html>'.$head.$body.'</html>';
    echo $html;
?>
