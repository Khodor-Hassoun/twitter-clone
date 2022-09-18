<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$follow = (int)$_POST["follow"];

$query = $mysqli->prepare("SELECT * FROM `followers` WHERE follwer_id = $userId and following_id1 = $follow");
$query->execute();
$array = $query->get_result();
$response = $array->fetch_all(MYSQLI_ASSOC);

if(isset($response[0])){
    echo json_encode(1);
}else{
    echo json_encode(0);
}
?>