<?php
include 'dbcontroller.php'; 
$query = "SELECT * FROM items";
$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result)>0) {
        for ( $i=1; $i<=mysqli_num_rows($result); $i++)
        {
        $row[$i]=mysqli_fetch_array($result,MYSQLI_ASSOC);
           
        }
    }
echo json_encode($row);


   
?>