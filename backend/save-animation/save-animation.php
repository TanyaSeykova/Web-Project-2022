<?php

    //var_dump($_POST['animationData']);
   
    require_once("./db_save_animation.php");

    if( isset($_POST['animationData']) && isset($_FILES['inputFile']) && isset($_FILES['audioFile']) ) {

        try {
            $animationData = json_decode($_POST['animationData'], true);
            $animationName = $animationData['name'];
            $configData = $animationData['configData'];
            $path = './saved-animations/' . $animationName;
            
            //mkdir няма да създаде папка с вече съществуващо име, затова служи и за проверка дали съществува вече тази анимация
            if(!mkdir($path, 0777)) {
                $error = error_get_last();
                echo json_encode(["status" => "error", "message" => $error["message"]]);
                exit;
            }

            $dataFileName = $animationName . '-data.json';
            $dataFilePath = $path . '/' . $dataFileName;
            move_uploaded_file($_FILES['inputFile']['tmp_name'], $dataFilePath);

            $configFileName = $animationName . '-config.json';
            $configFilePath = $path . '/' . $configFileName;
            file_put_contents($configFilePath, json_encode($configData));

            $audioFileName = $_FILES['audioFile']['name'];
            $audioFilePath = $path . '/' . $audioFileName;
            move_uploaded_file($_FILES['audioFile']['tmp_name'], $audioFilePath);

            $animationDBInfo = array();
            $animationDBInfo['name'] = $animationName;
            $animationDBInfo['dataFileName'] = $dataFileName;
            $animationDBInfo['configFileName'] = $configFileName;
            $animationDBInfo['audioFileName'] = $audioFileName;

            addAnimationToDB($animationDBInfo);

            echo json_encode(["status" => "success", "message" => "success", "name" => $animationName]);

        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]); 
        }
        

    } else {
        echo json_encode(["status" => "error", "message" => "data could not be recieved"]);
    }
    
?>