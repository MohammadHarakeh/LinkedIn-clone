<?php
include("connection.php");

$postText = $_POST['postText'];
$postImage = $_POST['postImage'];
$userId = $_POST['userId'];

$query = $mysqli -> prepare('INSERT INTO posts (postText, postImage, userId) VALUES (?, ?, ?)');
$query -> bind_param("ssi", $postText, $postImage, $userId);
if($query -> execute()){
  $response['status'] = "success";
  $response['message'] = "post saved successfully";;

}else{
  $response['status'] = "failed";
  $response['message'] = "post not saved";
}

echo json_encode($response);
?>
