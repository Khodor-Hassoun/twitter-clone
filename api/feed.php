<?php

header("Access-Control-Allow-Origin: *");
include("connection.php");

if(isset($_POST["userId"])){
    $user_id = $_POST["userId"];

    $query = $mysqli->prepare("SELECT u.id, u.name, u.username, u.profile_picture,t.id as tweet, t.date, t.text, t.images FROM `users` as u, tweets as t WHERE u.id = t.user_id and t.user_id in (SELECT following_id1 from followers where follwer_id = $user_id)");
    $query->execute();
    $array = $query->get_result();

    $response = $array->fetch_all(MYSQLI_ASSOC);
}else if (isset($_POST["profileId"])){
    $profileId = $_POST["profileId"];

    $query = $mysqli->prepare("SELECT u.id, u.name, u.username, u.profile_picture,t.id as tweet, t.date, t.text, t.images FROM `users` as u, tweets as t WHERE u.id = t.user_id and u.id = $profileId");
    $query->execute();
    $array = $query->get_result();

    $response = $array->fetch_all(MYSQLI_ASSOC);
}

$json = json_encode($response);
echo $json;

?>
