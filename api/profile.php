<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

$profileId = $_POST["profileId"];

$query = $mysqli->prepare("SELECT * FROM users where id = $profileId");
$query->execute();
$array = $query->get_result();

$response = $array->fetch_all(MYSQLI_ASSOC);

$query = $mysqli->prepare("SELECT count(following_id1) as nb FROM `followers` WHERE follwer_id =$profileId"); //counts the following
$query->execute();
$array = $query->get_result();

$response[1] = $array->fetch_all(MYSQLI_ASSOC);

$query = $mysqli->prepare("SELECT count(follwer_id) as nb FROM `followers` WHERE following_id1 =$profileId"); // counts the followers
$query->execute();
$array = $query->get_result();

$response[2] = $array->fetch_all(MYSQLI_ASSOC);

$json = json_encode($response);
echo $json;

?>