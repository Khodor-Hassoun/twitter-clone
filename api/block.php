<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$block = (int)$_POST["block"];

// removing follows first
$query = $mysqli->prepare("SELECT `follwer_id`, `following_id1`, `date` FROM `followers` WHERE follwer_id = $userId and following_id1 = $block");
$query->execute();
$array = $query->get_result();
$response = $array->fetch_all(MYSQLI_ASSOC);

if(isset($response[0])){
    $query = $mysqli->prepare("DELETE FROM `followers` WHERE follwer_id = $userId and following_id1 = $block");
    $query->execute();
}

$query = $mysqli->prepare("SELECT `follwer_id`, `following_id1`, `date` FROM `followers` WHERE follwer_id = $block and following_id1 = $userId");
$query->execute();
$array = $query->get_result();
$response = $array->fetch_all(MYSQLI_ASSOC);

if(isset($response[0])){
    $query = $mysqli->prepare("DELETE FROM `followers` WHERE follwer_id = $block and following_id1 = $userId");
    $query->execute();
}
// blocks
$query = $mysqli->prepare("INSERT INTO `blocks`(`blocker_id`, `blocked_id`) VALUE (?, ?)");
$query->bind_param("ii", $userId, $block);
$query->execute();

echo json_encode("yes");
?>