<?php
include ('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST["userId"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $bio = $_POST["bio"];
    $experience = $_POST["experience"];
    $education = $_POST["education"];
    $skills = $_POST["skills"];

    if (empty($user_id) || empty($name) || empty($email) || empty($bio) || empty($experience) || empty($education) || empty($skills)) {
        $response["status"] = "error";
        $response["message"] = "Please fill out all fields.";
        echo json_encode($response);
        exit;
    }

    $update_user = $mysqli->prepare('UPDATE users SET name=?, email=?, bio=?, experience=?, education=?, skills=? WHERE UserID = ?');
    $update_user->bind_param('ssssssi', $name, $email, $bio, $experience, $education, $skills, $user_id);
    if ($update_user->execute()) {
        $response['status'] = "success";
        $response['message'] = "User $name with email $email was updated successfully.";
    } else {
        $response['status'] = "error";
        $response['message'] = "Failed to update user.";
    }
    echo json_encode($response);
    exit;
}
?>
