<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$follow = (int)$_POST["follow"];
$today = date("Y-m-d");

$query = $mysqli->prepare("SELECT * FROM `followers` WHERE follwer_id = $userId and following_id1 = $follow");
$query->execute();
$array = $query->get_result();
$response = $array->fetch_all(MYSQLI_ASSOC);

if(isset($response[0])){
    $query = $mysqli->prepare("DELETE FROM `followers` WHERE follwer_id = $userId and following_id1 = $follow");
    $query->execute();
    echo json_encode("removed");
}else{
    $query = $mysqli->prepare("INSERT INTO `followers` (`follwer_id`, `following_id1`, `date`) VALUE (?, ?, ?)");
    $query->bind_param("iis", $userId, $follow, $today);
    $query->execute();
    echo json_encode("added");
}
?>