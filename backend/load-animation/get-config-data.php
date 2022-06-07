<?php

    $configPath = $_GET['configPath'];

    $configData = json_decode(file_get_contents($configPath));

    echo json_encode($configData);
?>