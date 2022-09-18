<?php
    header("Access-Control-Allow-Origin: *");
    include("connection.php");

    $email = $_POST['email'];
    $password = hash('sha256',$_POST['password']);

    $query = $mysqli->prepare("SELECT id FROM users WHERE email=? AND password=?");
    $query->bind_param("ss", $email, $password);
    $query->execute();
    // $response = [];
    $response = $query->get_result();
    $user = $response->fetch_assoc(); // fetch data   
    echo json_encode($user);
?>