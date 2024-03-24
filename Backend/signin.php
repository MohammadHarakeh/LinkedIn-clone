<?php
include ('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    if (empty($email) || empty($password)) {
        $response["status"] = "error";
        $response["message"] = "Please fill out all fields.";
        echo json_encode($response);
        exit;
    }

    $response = array();
 
    $check_user = $mysqli->prepare('SELECT id, email, password FROM users WHERE email=?');
    $check_user->bind_param('s', $email);
    $check_user->execute();
    $check_user->store_result();
    $check_user->bind_result($id, $email, $hashed_password);
    $check_user->fetch();
    $num_rows = $check_user->num_rows();

    if ($num_rows == 0) {
        $response["status"] = "error";
        $response["message"] = "User with this email does not exist.";

} else{
    if(password_verify($password, $hashed_password)) {
        $response["status"] = "success";
        $response["message"] = "Login successful.";
        $response['id'] = $id;
    } else {
        $response["status"] = "error";
        $response["message"] = "Incorrect password.";
    }
}

    echo json_encode($response);
}