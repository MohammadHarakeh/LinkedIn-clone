<?php
include ('connection.php');

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["image"]) && isset($_POST['id'])) {
    $image = file_get_contents($_FILES['image']['tmp_name']);
    $image = base64_encode($image);
    $id = $_POST['id'];
    $text = $_POST['text'];


    $stmt = $mysqli->prepare("INSERT INTO posts (id, image, text) VALUES (?, ?, ?)");
    $stmt->bind_param("ibs", $id, $image, $text);

    if ($stmt->execute()) {
        $response["status"] = "success";
        $response["message"] = "Image uploaded successfully.";
    } else {
        $response["status"] = "error";
        $response["message"] = "Error uploading image and text: " . $mysqli->error;
    }

    $stmt->close();
} else {
    $response["status"] = "error";
    $response["message"] = "Please select an image, provide an ID, and insert text.";
}

echo json_encode($response);
?>
