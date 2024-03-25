<?php

include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $stmt = $mysqli->prepare("SELECT u.name, u.userId, p.postsId, p.postText, p.postImage FROM posts p JOIN users u on p.userId = u.userId");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $posts = array();
        while ($row = $result->fetch_assoc()) {
            $posts[] = $row;
        }
        $response = [
            'status' => 'success',
            'posts' => $posts
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'No posts found'
        ];
    }

    echo json_encode($response);
}
?>
