<?php

    $configPath = $_GET['configPath'];
    $configContents=file_get_contents($configPath);
    
if($configContents){
    $configData = json_decode($configContents);
    echo json_encode(["status" => "success", "message" => $configData]);
}
    else {
        echo json_encode(["status" => "error", "message" => "Config file could not be read."]);
    }



    
?>