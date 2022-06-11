<?php

    require_once('../db/db_util.php');

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "SELECT name
                FROM animations";
        
        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($result)>0){
        echo json_encode(["status" => "success", "animationNames" => $result]);
        }
        else {
            echo json_encode(["status" => "error", "message" => "List of animations is empty."]);
            
        }

    } catch (PDOException $e) {
       
        echo json_encode(["status" => "error", "message" => "DB error"]);
        
    }
    

?>