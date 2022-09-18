<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

$user_id = $_POST["userId"];

$query = $mysqli->prepare("SELECT name, username, profile_picture FROM users where id = $user_id");
$query->execute();
$array = $query->get_result();

$response = $array->fetch_all(MYSQLI_ASSOC);

$json = json_encode($response);
echo $json;

?>