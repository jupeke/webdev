<?php
    require 'links.php';
    // Constants (false to make name case-sensitive). Syntax:
    // define(name, value, case-insensitive)
    define("SAVE_NEW", "Save new comment", false);
    define("SAVE_OLD", "Save changes", false);
    define("EDIT", "Edit", false);
    define("DEL", "Delete", false);

    $error = "";
    $comment = "";
    $message = "";
    $message_ok = False;

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
                    $message_ok = True;
                }
            }
        }
        else if($user_action === DEL){
            $id = isset($_GET["id_comment"]) ? $_GET["id_comment"]: -1;
            if(comment_delete($id, $conn)){
                $message = 'Comment deleted successfully';
            } else{
                $message = 'Error in deleting a comment: '.$conn->error;
            }
            $message_ok = True;
        }
        else if($user_action === EDIT){
            $id = isset($_GET["id_comment"]) ? $_GET["id_comment"]: -1;
            if(comment_delete($id, $conn)){
                $message = 'Comment deleted successfully';
            } else{
                $message = 'Error in deleting a comment: '.$conn->error;
            }
            $message_ok = True;
        }
    }
    $head =
        '<head>
            <title>PHP Home</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="styles.css">
        </head>';

    if (!$message_ok){
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
            <div>'.comments_get_all($conn).'</div>'.
            create_comment_form().
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

    // Update (replace) a comment with id=$id_comment. $new_comment will be
    // the new value. Return True or false based on success.
    function comment_update($id_comment, $new_comment, $connection){
        $sql = "UPDATE comments SET comment = '".$new_comment."' WHERE id=".
            $id_comment;
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
        $output = "<table><tr><th>Saved comments</th><th>Actions</th></tr>";
        if ($result->num_rows > 0) {
            // Extract the comments:
            while($row = $result->fetch_assoc()) {
                $id = $row["id"];
                $output .=
                    '<tr><td>'.$row["comment"].'</td><td>'.
                    create_delete_button($id).'</td></tr>';
            }
        }
        $output .= "</table>";
        return $output;
    }

    // Retrieve a comment with the id_comment given.
    function get_comment($connection, $id_comment){
        $sql = "SELECT comment FROM comments WHERE id=".$id_comment;
        $result = $connection->query($sql);
        $comment = "";
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $comment = $row["comment"];
        }
        return $comment;
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

    function create_comment_form($new, $id_comment, $comment){
        $text = SAVE_NEW;
        $action_value = "form_with_db.php";
        if(!$new){
            $text = SAVE_OLD;
            $action_value = "form_with_db.php?id=".$id_comment;
        }
        $form =
          '<form method="post" action="'.$action_value.'"?>
              <label for="comment">Comment:</label><br>
              <input type="text" id="comment" name="comment" value="'.$comment.'"><br>
              <input type="submit" name="user_action" value="'.$text.'">
          </form>';
    }
?>
