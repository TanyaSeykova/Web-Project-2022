<?php

    $dataPath = $_GET['dataPath'];
    $dataContents=file_get_contents($dataPath);

    if($dataContents){
        $data= json_decode($dataContents);
        echo json_encode(["status" => "success", "message" => $data]);
    }
        else {
            echo json_encode(["status" => "error", "message" => "Data file could not be read."]);
        }

?>