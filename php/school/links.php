<?php
    function links($level){
        if($level === "root"){
            $prefix_db_comments = "db_comments/";
            $prefix_up = "";
        } else if ($level === "db_comments"){
            $prefix_db_comments = "";
            $prefix_up = "../";
        }

        $links =
          '<li><a href="index.php">Home</a></li>
          <li>
            <div class="dropdown">
              <a class="dropbtn">Forms</a>
              <div class="dropdown-content">
                <a href="'.$prefix_up.'form1.php">Form 1 (POST)</a>
                <a href="'.$prefix_up.'form1get.php">Form 1 (GET)</a>
                <a href="'.$prefix_up.'form1_php_first.php">Form 1 (php_1st)</a>
                <a href="'.$prefix_up.'form2.php">Form 2</a>
              </div>
            </div>
          </li>
          <li>
            <div class="dropdown">
              <a class="dropbtn">Persistent comments</a>
              <div class="dropdown-content">
                <a href="'.$prefix_db_comments.'step0.php">Starting point</a>
                <a href="'.$prefix_db_comments.'step1.php">Step 1 - Read and Write</a>
                <a href="'.$prefix_db_comments.'step2.php">Step 2 - Delete</a>
                <a href="'.$prefix_db_comments.'step3.php">Step 3 - Update</a>
                <a href="'.$prefix_db_comments.'step4_imgs.php">Step 4 - Images</a>
                <a href="'.$prefix_db_comments.'step5_imgs_with_js.php">Step 5 - Images & JS</a>
                <a href="'.$prefix_db_comments.'imagetesting.php">Testing</a>
              </div>
            </div>
          </li>

          <li><a class="out" href="https://www.w3schools.com/php"
            target="_blank">Tutorial</a></li>
          <li><a class="out" href="https://github.com/kerkkaju/webdev/tree/master/php"
            target="_blank">Codes</a>
          </li>
        ';
        return $links;
    }
?>
