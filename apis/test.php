<?php
    header("Access-Control-Allow-Origin: *");

    include("connection.php");

    $query = $mysqli->prepare("SELECT name, username, email, phone FROM users");
    $query->execute();
    $array = $query->get_result();
    
    $response = [];
    
    while($a = $array->fetch_assoc()){
        $response[] = $a;
    }
    
    $json = json_encode($response);
    echo $json;
    
?>