<html>
  <head>
    <title>PHP Home</title>
  </head>

  <body>
    <h1>Hello!</h1>

    <p>Web Development with PHP server-side language (Hypertext Preprocessor).
      Below you see a result of PHP code on the server:</p>

    <?php
      $result = "";
      for($i = 0; $i < 10; $i++){
        for($k = 0; $k < 70; $k++){
          $result .= "*";
        }
        $result .= "<br>";
      }
      echo $result;
    ?>

	  <p><a href="https://www.w3schools.com">This is a link to w3schools.</a></p>
    <p><a href="https://github.com/kerkkaju/webdev/php/blob/master"
      target="_blank">Codes on GitHub by JP
    </a></p>
  </body>
</html>
