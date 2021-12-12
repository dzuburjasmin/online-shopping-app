<?php
 $dbhost = "localhost";
 $dbuser = "root";
 $dbpass = "root1234";
 $db = "products";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
   
?>