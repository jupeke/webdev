<html>
  <head>
    <title>PHP Home</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
  </head>

  <body>
    <h1>Hello!</h1>

    <p>Web Development with PHP server-side language (Hypertext Preprocessor).
      Below you see a result of PHP code on the server:</p>

    <?php
      $result = "";
      for($i = 0; $i < 10; $i++){
        for($k = 0; $k < 10-$i; $k++){
          $result .= "O ";
        }
        for($k = 0; $k < $i+1; $k++){
          $result .= "H ";
        }
        $result .= "<br>";
      }
      echo $result;
    ?>

  </body>
</html>
