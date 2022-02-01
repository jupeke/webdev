<?php
    require 'links.php';
    // Constants (false to make name case-sensitive). Syntax:
    // define(name, value, case-insensitive)
    define("SAVE_NEW", "Save new comment", false);

    $error = "";
    $comment = "";
    $message = "";
    $details_ok = False;

    $servername = "localhost";
    //$username = "jp"; Not working: access denied
    //$password = "varpunen";
    $username = "root";
    $password = "";
    $dbname = "db1";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // If a form with POST method has been sent:
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user_action =
            isset($_REQUEST["user_action"]) ? $_REQUEST["user_action"]: "";

        // User actions:
        if($user_action = ){
          
        }

        if(isset($_POST["comment"])){
            $comment = $_POST["comment"];
            if(empty($comment)){
                $message = 'Comment is empty! Write a comment, please!';
            } else{
                if(comment_insert($comment, $conn)){
                    $message = 'Comment saved successfully';
                } else{
                    $message = 'Error in saving a comment: '.$conn->error;
                }
                $details_ok = True;
            }
        }
    }
    $head =
        '<head>
            <title>PHP Home</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="styles.css">
        </head>';

    $form =
        '<form method="post" action="form_with_db.php"?>
            <label for="comment">Comment:</label><br>
            <input type="text" id="comment" name="comment" value="'.$comment.'"><br>
            <input type="submit" name="user_action" value="'.SAVE_NEW.'">
        </form>';

    if (!$details_ok){
        if (empty($message)){
            $message =
                'Write a comment in the text field and press the button.';
        }
    }
    $body =
        '<body>
            <ul id="linkbar">
              '.$links_html.'
            </ul>
            <h1>Persistent comments</h1>
            <p>Persistent: comments are saved to a database.</p>
            <p class="message">'.$message.'<p>
            <p>'.comments_get_all($conn).'</p>'.
            $form.
        '</body>';

    $html = '<html>'.$head.$body.'</html>';
    echo $html;


    // Inserts a new comment into comments table. Return True or false
    // based on success
    function comment_insert($comment, $connection){
        $sql = "INSERT INTO comments (comment) VALUES ('".$comment."')";
        if ($connection->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
    // Retrieves all the comments from the db.
    function comments_get_all($connection){
        $sql = "SELECT * FROM comments";
        $result = $connection->query($sql);
        $output = "";
        if ($result->num_rows > 0) {
            // Extract the comments:
            while($row = $result->fetch_assoc()) {
                $output .= $row["comment"]."<br>";
            }
        }
        return $output;
    }
?>
