<?php
    require 'links.php';
    // Constants (false to make name case-sensitive). Syntax:
    // define(name, value, case-insensitive)
    define("SAVE_NEW", "Save new comment", false);
    define("EDIT", "Edit", false);
    define("DEL", "Delete", false);

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
            isset($_POST["user_action"]) ? $_POST["user_action"]: "none";

        // User actions:
        if($user_action === SAVE_NEW){
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
        } else if($user_action === DEL){
            $id = isset($_GET["id_comment"]) ? $_GET["id_comment"]: -1;
            if(comment_delete($id, $conn)){
                $message = 'Comment deleted successfully';
            } else{
                $message = 'Error in deleting a comment: '.$conn->error;
            }
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
            <p>The comments are saved to a MySQL database (persistent memory).</p>
            <p class="message">'.$message.'</p>
            <p class="bold">Saved comments:<p>
            <div>'.comments_get_all($conn).'</div>'.
            $form.
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

    // Delete a comment with id=$id_comment from comments. Return True or false
    // based on success
    function comment_delete($id_comment, $connection){
        $sql = "DELETE FROM comments WHERE id=".$id_comment;
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
        $output = "<table>";
        if ($result->num_rows > 0) {
            // Extract the comments:
            while($row = $result->fetch_assoc()) {
                $id = $row["id"];
                $output .=
                    '<tr><td>'.$row["comment"].'</td><td>'.
                    create_delete_button($id)."</td></tr>";
            }
        }
        $output .= "</table>";
        return $output;
    }
    // Create a new form element containing an input element.
    function create_delete_button($id_comment){
        $btn =
          '<form class="inline" method="post"
            action="form_with_db.php?id_comment='.$id_comment.'"?>
            <input type="submit" name="user_action" value="'.DEL.'">
          </form>';

        return $btn;
    }
?>
