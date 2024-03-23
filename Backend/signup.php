<?php
include ('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $name = isset($_POST["name"]) ? $_POST["name"] : "";
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";

    
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $check_user = $mysqli->prepare('SELECT email FROM users WHERE email=?');
    $check_user->bind_param('s', $email);
    $check_user->execute();
    $check_user->store_result();
    $user_exists = $check_user->num_rows();

    if ($user_exists > 0) {
        $response["status"] = "error";
        $response["message"] = "email already exists.";
    } else {
        $query = $mysqli->prepare('INSERT INTO users (name, email, password) VALUES (?,?,?)');
        $query->bind_param('sss', $name, $email, $hashed_password);
        $query->execute();

        $response['status'] = "success";
        $response['message'] = "User $email was created successfully.";
    }
    echo json_encode($response);
}

elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['id'])) {
        $response = [
            'status' => 'error',
            'message' => 'User ID is missing'
        ];
        echo json_encode($response);
        exit;
    }

    $user_id = $_GET['id'];

    $query = $mysqli->prepare('SELECT * FROM users WHERE id = ?');
    $query->bind_param("i", $user_id);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        $userInfo = [];
        while ($row = $result->fetch_assoc()) {
            $userInfo[] = $row;
        }
        $response = [
            'status' => 'success',
            'user_info' => $userInfo
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'No user found with the given ID'
        ];
    }
    echo json_encode($response);
}
?>
