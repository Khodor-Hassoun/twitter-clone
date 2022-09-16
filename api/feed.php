<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

$user_id = $_POST["userId"];

$query = $mysqli->prepare("SELECT u.name, u.username, u.profile_picture, t.date, t.text, t.images FROM `users` as u, tweets as t WHERE u.id = t.id and t.user_id in (SELECT following_id1 from followers where follwer_id = $user_id)");
$query->execute();
$array = $query->get_result();

$response = $array->fetch_all(MYSQLI_ASSOC);

$json = json_encode($response);
echo $json;

?>