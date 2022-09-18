<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

$user_id = $_POST["userId"];
$search = $_POST["search"];

$query = $mysqli->prepare("SELECT u.id, u.name, u.username, u.profile_picture FROM users as u WHERE u.username LIKE '%".$search."%' and u.id !=  $user_id and u.id not in (select blocked_id FROM blocks WHERE blocker_id = $user_id) and u.id != $user_id");
$query->execute();
$array = $query->get_result();

$response = $array->fetch_all(MYSQLI_ASSOC);


echo json_encode($response);

?>