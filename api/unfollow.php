<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$unfollow = (int)$_POST["unfollow"];

$query = $mysqli->prepare("DELETE FROM `followers` WHERE follwer_id = $userId and following_id1 = $unfollow");
$query->execute();

echo json_encode("yes");
?>