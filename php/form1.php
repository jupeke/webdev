<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <ul id="linkbar">
      <?php include 'links.php'; echo links("root"); ?>
    </ul>
    <h1>My first form (POST)</h1>
    <p>Here the client (browser) sends an HTTP request to the server by
      using the POST method.</p>
    <?php
      if(isset($_POST["myname"]) && !empty($_POST["myname"])){
          $message = "Hello ".$_POST["myname"]."!";
      } else{
          $message = "No name given!" ;
      }
      echo '<p class="message">'.$message.'<p>';
    ?>
    <p>Write you name in the text field and press the button.</p>
    <form method="post">
      <label for="name">Your name:</label><br>
      <input type="text" id="name" name="myname" value=""><br>
      <input type="submit" value="Submit">
    </form>

  </body>
</html>
