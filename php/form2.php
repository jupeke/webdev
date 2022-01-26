
<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <ul id="linkbar">
      <?php include 'links.php';?>
      <li><a href="index.php">Home</a></li>
    </ul>
    <h1>My first forms</h1>
    <?php
      if(!isset($_POST["name"])){
          $name = $_POST["name"];
      } else if {
          echo "" ;
      } else{
          
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
