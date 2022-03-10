<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <ul id="linkbar">
      <?php include 'links.php'; ?>
      <?php echo $links_html; ?>
    </ul>
    <h1>My first form</h1>
    <p>Here the client (browser) sends an HTTP request to the server by
      using the GET method.</p>
    <?php
      if(isset($_GET["name"]) && !empty($_GET["name"])){
          echo "Hello ".$_GET["name"];
      } else{
          echo "No name given" ;
      }
    ?>
    <p>Write you name in the text field and press the button.</p>
    <form method="get">
      <label for="name">Your name:</label><br>
      <input type="text" id="name" name="name" value=""><br>
      <input type="submit" value="Submit">
    </form>

  </body>
</html>
