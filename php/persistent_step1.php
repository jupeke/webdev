<?php
    require 'links.php';
    // Constants. Syntax: define(name, value, case-insensitive)
    // These are for button texts.
    define("SAVE_NEW", "Save new comment", false);

    // The home view of this application:
    define("HOME","persistent_step1.php",false);

    // Get the eventual values from the client:
    $user_action = isset($_POST["user_action"]) ? $_POST["user_action"]: "none";
    $id_comment = isset($_GET["id_comment"]) ? $_GET["id_comment"]: -1;
    $comment = isset($_POST["comment"]) ? $_POST["comment"]: "";

    // Common variables:
    $message = "";
    $new = True;

    // Database info:
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db1";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // If a form with POST method has been sent (if user has pressed a button):
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // User actions: what to do in different cases:
        if($user_action === SAVE_NEW){
            if(empty($comment)){
                $message = 'Comment is empty! Write a comment, please!';
            } else{
                if(comment_insert($comment, $conn)){
                    $message = 'Comment saved successfully';
                } else{
                    $message = 'Error in saving a comment: '.$conn->error;
                }
            }
        }
    }
    // If message is not set,
    if (empty($message)){
        $message =
            'Write a comment in the text field and press the button.';
    }

    // HTML is put together here.
    $head =
        '<head>
            <title>PHP Home</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="styles.css">
        </head>';

    $body =
        '<body>
            <ul id="linkbar">
              '.$links_html.'
            </ul>
            <h1>Persistent comments</h1>
            <p>The comments are saved to a MySQL database (persistent memory).</p>
            <p class="message">'.$message.'</p>
            <div>'.comments_get_all($conn).'</div>'.
            create_comment_form($new, $id_comment, $comment).
        '</body>';

    $html = '<html>'.$head.$body.'</html>';

    echo $html;


    // Insert a new comment into comments table. Return True or false
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
        $output = "<table><tr><th>Saved comments</th></tr>";
        if ($result->num_rows > 0) {
            // Extract the comments:
            while($row = $result->fetch_assoc()) {
                $id = $row["id"];
                $output .=
                    '<tr><td>'.$row["comment"].'</td></tr>';
            }
        }
        $output .= "</table>";
        return $output;
    }

    function create_comment_form($new, $id_comment, $comment){
        $text = SAVE_NEW;
        $action_value = HOME;
        $form =
          '<form method="post" action="'.$action_value.'"?>
              <label for="comment">Comment:</label><br>
              <input type="text" id="comment" name="comment" value="'.$comment.'"><br>
              <input type="submit" name="user_action" value="'.$text.'">
          </form>';
        return $form;
    }
?>
