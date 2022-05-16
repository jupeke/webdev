<?php
    require '../links.php';
    // Constants. Syntax: define(name, value, case-insensitive)
    // These are for button texts.
    define("SAVE_NEW", "Save new comment", false);
    define("SAVE_OLD", "Save changes", false);
    define("DELETE_COMMENT", "Delete", false);
    define("DELETE_IMG", "Delete image", false);
    define("EDIT_COMMENT", "Edit", false);
    define("SAVE_IMG", "Save", false);
    define("SELECT_IMG", "Select Image", false);

    // The home view of this application:
    define("HOME","step4_imgs.php",false);

    // Get the eventual values from the client:
    $user_action = isset($_POST["user_action"]) ? $_POST["user_action"]: "none";
    $id_comment = isset($_GET["id_comment"]) ? $_GET["id_comment"]: -1;
    $id_image = isset($_GET["id_image"]) ? $_GET["id_image"]: -1;
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

        // User actions: what to do in different cases. Save new:
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
        // Delete:
        else if($user_action === DELETE_COMMENT){
            if(comment_delete($id_comment, $conn)){
                $message = 'Comment deleted successfully';
            } else{
                $message = 'Error in deleting a comment. '.$conn->error;
            }
        }
        // Edit:
        else if($user_action === EDIT_COMMENT){
            $comment = get_comment($id_comment, $conn);
            $message = 'Edit and save the comment';
            $new = False;
        }
        // Save changes:
        else if($user_action === SAVE_OLD){
            if(empty($comment)){
                $message = 'Comment is empty! Write something, please!';
                $new = False;   // For the new trial.
            } else{
                if(comment_update($id_comment, $comment, $conn)){
                    $message = 'Changes saved successfully';
                } else{
                    $message = 'Error in saving changes: '.$conn->error;
                }
            }
            $comment = "";  // No need to show in the text field now.
        }
        else if($user_action === SAVE_IMG){
            $message = image_insert($id_comment, $conn);
            $comment = "";  // No need to show in the text field now.
        }
        // Delete image:
        else if($user_action === DELETE_IMG){
            if(image_delete($id_image, $conn)){
                $message = 'Image deleted successfully';
            } else{
                $message = 'Error in deleting an image. '.$conn->error;
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
              '.links("db_comments").'
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
        $output = "<table><tr><th>Saved comments</th><th>Images</th><th>Actions</th></tr>";
        if ($result->num_rows > 0) {
            // Extract the comments:
            while($row = $result->fetch_assoc()) {
                $id = $row["id"];
                $output .=
                    '<tr><td>'.$row["comment"].'</td>'.
                    '<td>'.get_images_of_a_comment($id, $connection).'</td>'.
                    '<td>'.
                      create_button($id, DELETE_COMMENT, HOME).
                      create_button($id, EDIT_COMMENT, HOME).
                      create_upload_img_button($id, SELECT_IMG,SAVE_IMG, HOME).
                    '</td></tr>';
            }
        }
        $output .= "</table>";
        return $output;
    }
    // Decodes the image:
    function decode_image($raw_img, $filetype, $width, $height){
        $content = base64_encode($raw_img);
        return '<img src="data:image/'.$filetype.
              ';charset=utf8;base64,'.$content.'"
              width="'.$width.'" height="'.$height.'" >';
    }

    // Returns the images of a comment as HTML img elements:
    function get_images_of_a_comment($id_comment, $connection){
        $sql = "SELECT * FROM images WHERE id_comment=".$id_comment;
        $result = $connection->query($sql);
        $images = "";
        $width = 150;
        $height = 100;
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()){
                $filetype = isset($row["filetype"]) ? $row["filetype"]: "unknown";
                $id = $row["id"];
                $images .= "<div class='image'>".
                    decode_image($row["image"], $filetype, $width, $height);
                $images .= create_image_button($id, DELETE_IMG, HOME);
                $images .= "</div>";
            }
        } else{
            $images = "No images found";
        }
        return $images;
    }

    // Retrieve the comment with the id_comment given.
    function get_comment($id_comment, $connection){
        $sql = "SELECT comment FROM comments WHERE id=".$id_comment;
        $result = $connection->query($sql);
        $comment = "";
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $comment = $row["comment"];
        }
        return $comment;
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

    // Insert an image to the database:
    // Based on https://www.codexworld.com/store-retrieve-image-from-database-mysql-php/
    function image_insert($id_comment, $connection){
        $response = "ok";
        if(!empty($_FILES["image"]["name"])) {
            // Get file info
            $fileName = basename($_FILES["image"]["name"]);
            $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

            // Allow certain file formats
            $allowTypes = array('jpg','png','jpeg','gif');
            if(in_array($fileType, $allowTypes)){
                $image = $_FILES['image']['tmp_name'];
                $imgContent = addslashes(file_get_contents($image));

                // Insert image content into database
                $time = date_create()->format('Y-m-d H:i:s');
                $q = "INSERT into images (image,filetype,id_comment,created_at)
                    VALUES ('$imgContent','$fileType',$id_comment, '$time')";
                $insert = $connection->query($q);

                if($insert){
                    $response = "File uploaded successfully.";
                } else{
                    $response = "File upload failed, please try again. ";
                }
            }else{
                $response = 'Sorry, only JPG, JPEG, PNG or GIF files are allowed.';
            }
        } else{
            $response = 'Please select an image to upload.';
        }
        return $response;
    }

    // Delete an image with id=$id_image. Return True or false
    // based on success
    function image_delete($id_image, $connection){
        $sql = "DELETE FROM images WHERE id=".$id_image;
        if ($connection->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }

    // Returns the HTML for a submit button in a form.
    function create_button($id_comment, $button_text, $url_to_go){
        $action_value = $url_to_go."?id_comment=".$id_comment;
        $form =
          '<form method="post" action="'.$action_value.'">
              <input type="submit" name="user_action" value="'.$button_text.'">
          </form>';
        return $form;
    }

    // Returns the HTML for a button related to images.
    function create_image_button($id_image, $button_text, $url_to_go){
        $action_value = $url_to_go."?id_image=".$id_image;
        $form =
          '<form method="post" action="'.$action_value.'">
              <input type="submit" name="user_action" value="'.$button_text.'">
          </form>';
        return $form;
    }

    // Returns the HTML for image upload button. Note the not-so-obvious
    // trick to change the default file button text.
    function create_upload_img_button($id_comment, $select_button_text,
                                      $save_button_text, $url_to_go){
        $action_value = $url_to_go."?id_comment=".$id_comment;

        // Note the way to avoid problems with nested quotes (a bit over-kill here..).
        $form = <<< EOF
            <form action="{$action_value}" method="post" enctype="multipart/form-data">
                <input type="file" name="image">
                <input type="submit" name="user_action"
                    value="{$save_button_text}" >
            </form>
EOF
        ;
        // Note: The closing text EOF must be in the beginning of the line!
        return $form;
    }

    function create_comment_form($new, $id_comment, $comment){
        $text = SAVE_NEW;
        $action_value = HOME;
        if($new === False){
            $text = SAVE_OLD;
            $action_value .= "?id_comment=".$id_comment;
        }
        $form =
          '<form method="post" action="'.$action_value.'">
              <label for="comment">Comment:</label><br>
              <input type="text" id="comment" name="comment" value="'.$comment.'"><br>
              <input type="submit" name="user_action" value="'.$text.'">
          </form>';
        return $form;
    }
?>
