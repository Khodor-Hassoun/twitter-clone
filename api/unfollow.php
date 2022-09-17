<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$follow = (int)$_POST["follow"];

$query = $mysqli->prepare("DELETE FROM `followers` WHERE follwer_id = $userId and following_id1 = $follow");
$query->execute();

echo json_encode("yes");
?>