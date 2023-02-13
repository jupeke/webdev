<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <ul id="linkbar">
      <?php include 'links.php'; echo links("root");?>
    </ul>

    <h1>Hello!</h1>

    <p>Web Development with PHP server-side language (Hypertext Preprocessor).
      Below you see a result of PHP code on the server:</p>

    <?php
      $result = "";
      for($i = 0; $i < 10; $i++){
        for($k = 0; $k < 7; $k++){
          $result .= "*";
        }
        $result .= "<br>";
      }
      echo $result;
    ?>

  </body>
</html>
