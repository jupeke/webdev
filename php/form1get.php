<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <ul id="linkbar">
      <?php include 'links.php'; ?>
      <?php  echo links("root"); ?>
    </ul>
    <h1>My first form (GET)</h1>
    <p>Here the client (browser) sends an HTTP request to the server by
      using the GET method.</p>
    <?php
      if(isset($_GET["myname"]) && !empty($_GET["myname"])){
          $message = "Hello ".$_GET["myname"]."!";
      } else{
          $message = "No name given!" ;
      }
      echo '<p class="message">'.$message.'<p>';
    ?>
    <p>Write you name in the text field and press the button.</p>
    <form method="get">
      <label for="name">Your name:</label><br>
      <input type="text" id="name" name="myname" value=""><br>
      <input type="submit" value="Submit">
    </form>

  </body>
</html>
