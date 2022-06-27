<?php

    $commentsPath = $_GET['commentsPath'];
    $commentsContents=file_get_contents($commentsPath);

    if($commentsContents){
        $comments= json_decode($commentsContents);
        echo json_encode(["status" => "success", "message" => $comments]);
    }
        else {
            echo json_encode(["status" => "error", "message" => "Data file could not be read."]);
        }

?>