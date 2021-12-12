<?php
include 'dbcontroller.php';
$items=$_POST['items'];
$name=$_POST['name'];
$surname=$_POST['surname'];
$address=$_POST['address'];
$postcode=$_POST['postcode'];
$city=$_POST['city'];
$phonenumber=$_POST['phonenumber'];
$total=$_POST['total'];
$namesurname=$name."/".$surname;
$addresscitypostcode=$address."/".$city."/".$postcode;
$sql ="INSERT INTO orders (itemsordered,namesurname,addresscitypostcode,phonenumber,totalprice) VALUES ('".$items."','".$namesurname."','".$addresscitypostcode."','".$phonenumber."','".$total."')";
if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "Thank you ".$name." ".$surname." for your order! Order ID:".$last_id;
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
?>

