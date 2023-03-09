<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <h1>My first form (GET)</h1>
    <p>Here the client (browser) sends an HTTP request 
        to the server by using the GET method.</p>
    <?php
      if (isset($_GET["fname"]) && !empty($_GET["myname"])){
        $message = "Hello ".$_GET["myname"]."!";
      } else{
        $message = "Nothing yet sent";
      }
      echo $message;
    ?>
    <p>Write you name in the text field and press the button.</p>
    <form method="get">
      <label for="fname">Your firstname:</label><br>
      <input type="text" id="fname" name="fname"><br>
      <label for="lastname">Your lastname:</label><br>
      <input type="text" id="lastname" name="lastname"><br>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>