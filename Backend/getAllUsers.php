<?php
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $stmt = $mysqli->prepare("SELECT * FROM users");
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$result) {
        $response = [
            'status' => 'error',
            'message' => 'Error fetching result: ' . $stmt->error
        ];
        echo json_encode($response);
        exit;
    }

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
            'message' => 'No users found'
        ];
    }

    echo json_encode($response);
} else {
    $response = [
        'status' => 'error',
        'message' => 'Invalid request method'
    ];
    echo json_encode($response);
}
?>
