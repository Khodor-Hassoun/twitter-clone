<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

$username = $_POST["username"];

$query = $mysqli->prepare("SELECT id, name, profile_picture FROM users where username = '$username'");
$query->execute();
$array = $query->get_result();

$response = $array->fetch_all(MYSQLI_ASSOC);

$json = json_encode($response);
echo $json;

?>