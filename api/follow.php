<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$follow = (int)$_POST["follow"];
$today = date("Y-m-d");
print gettype($userId)  . $follow . $today;
$query = $mysqli->prepare("INSERT INTO `followers` (`follwer_id`, `following_id1`, `date`) VALUE (?, ?, ?)");
$query->bind_param("iis", $userId, $follow, $today);
$query->execute();

echo json_encode("yes");
?>