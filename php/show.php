<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
  </head>

  <body>
    <h1>My first form (GET)</h1>
    <?php
      function message($name){
        return "Hello ".$name."!";
      }
      $name = $_GET["myname"];
      echo message($name);
    ?>
    <p>Write you name in the text field and press the button.</p>
    <form method="get">
      <label for="name">Your firstname:</label><br>
      <input type="text" id="name" name="myname"><br>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
