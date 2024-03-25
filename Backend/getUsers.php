<?php
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {


    if (!isset($_GET['userId'])) {
        $response = [
            'status' => 'error',
            'message' => 'userId is missing'
        ];
        echo json_encode($response);
        exit;
    }

    $userId = $_GET['userId'];

    $stmt = $mysqli->prepare("SELECT * FROM users WHERE userId = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

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