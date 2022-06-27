<?php
    require_once("../db/db_util.php");

    function addAnimationToDB($animationDBData) {

        try {
            $db = new DB();
            $connection = $db->getConnection();
            
            $sql = "INSERT INTO animations (name, dataFileName, configFileName, audioFileName, commentsFileName)
                    VALUES (:name, :dataFileName, :configFileName, :audioFileName, :commentsFileName)";
            $stmt = $connection->prepare($sql);
            $stmt->execute($animationDBData);
            
        } catch (PDOException $e) {
            throw new Exception($e->getMessage());
        }
        
    }
?>