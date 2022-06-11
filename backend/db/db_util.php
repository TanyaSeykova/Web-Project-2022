<?php

    class DB {

        private $connection;
        private $config_data;

        function __construct() {
            
            $config_data = json_decode(file_get_contents("../../config_consts.json"), true);
            $host = $config_data['DB_HOST'] . ':' . $config_data['DB_PORT'];
            $dbname = $config_data['DB_NAME'];
            $username = $config_data['DB_USERNAME'];
            $password = $config_data['DB_PASSWORD'];
            
            $dsn = "mysql:host=$host;dbname=$dbname";
            $this->connection = new PDO($dsn, $username, $password);
        }

        function getConnection() {
            return $this->connection;
        }

    }

?>