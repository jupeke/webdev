
<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <ul id="linkbar">
      <?php include 'links.php';?>
    </ul>
    <h1>My first forms</h1>
    <?php
      $name = "";
      $error = "";
      $comment = "";
      if(!isset($_POST["name"])){
          $error = "Name empty?";
      } else if (!isset($_POST["comment"])){
          $error = "Comment empty?";
      } else{
          $name = $_POST["name"];
          $comment = $_POST["comment"];
      }
    ?>
    <p>Write you name in the text field and press the button.</p>
    <form method="post">
      <label for="name">Your name:</label><br>
      <input type="text" id="name" name="name" value=""><br>
      <label for="comment">Comment:</label><br>
      <input type="text" id="comment" name="comment" value=""><br>
      <input type="submit" value="Submit">
    </form>

  </body>
</html>
