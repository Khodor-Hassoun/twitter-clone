<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = $_POST["userId"];
$username = $_POST["username"];
$name = $_POST["name"];
$phone = (int)$_POST["phone"];
$email = $_POST["email"];
$password =hash('sha256', $_POST["password"]) ;
$dob = $_POST["dob"];
$flag = 1;

$query = $mysqli->prepare("SELECT * FROM `users` as u where u.username = '$username'"); // checks for username if taken
$query->execute();
$array = $query->get_result();

$response[0] = $array->fetch_all(MYSQLI_ASSOC);

if(($response[0])){
    $response[0] = 1;
    $flag = 0;
}else $response[0] = 0;

$query = $mysqli->prepare("SELECT * FROM users where email = '$email'"); // checks for email if taken
$query->execute();
$array = $query->get_result();

$response[1] = $array->fetch_all(MYSQLI_ASSOC);

if(($response[1])){
    $response[1] = 1;
    $flag = 0;
}else $response[1] = 0;

$query = $mysqli->prepare("SELECT * FROM users where phone = '$phone'"); // checks for phone if taken
$query->execute();
$array = $query->get_result();

$response[2] = $array->fetch_all(MYSQLI_ASSOC);

if(($response[2])){
    $response[2] = 1;
    $flag = 0;
}else $response[2] = 0;

if($flag){
    $query = $mysqli->prepare("UPDATE `users` SET `name`='$name',`username`='$username',`email`='$email',`phone`='$phone',`password`='$password',`dob`='$dob' WHERE id=$userId");
    $query->execute();
}$response[3] = $flag;
$json = json_encode($response);
echo $json;

?>