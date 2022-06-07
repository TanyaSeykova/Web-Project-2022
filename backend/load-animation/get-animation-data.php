<?php

    require_once('../db/db_util.php');
    $animationName = $_GET['animationName'];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "SELECT *
                FROM animations
                WHERE name = :animationName";
        
        $stmt = $connection->prepare($sql);
        $stmt->execute(["animationName" => $animationName]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "message" => "success", "animationData" => $result]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }

    
?>