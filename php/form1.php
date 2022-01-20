
<html>
  <head>
    <title>PHP Home</title>
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <ul id="linkbar">
      <?php include 'links.php';?>
      <li><a href="index.php">Home</a></li>
    </ul>
    <h1>My first form</h1>
    <?php
      if(isset($_POST["name"])){
          echo "Hello ".$_POST["name"];
      } else{
          echo "" ;
      }

    ?>
    <p>Write you name in the text field and press the button.</p>
    <form method="post">
      <label for="name">Your name:</label><br>
      <input type="text" id="name" name="name" value=""><br>
      <input type="submit" value="Submit">
    </form>

  </body>
</html>
