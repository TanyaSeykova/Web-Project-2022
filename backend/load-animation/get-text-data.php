<?php

    $dataPath = $_GET['dataPath'];

    $data = json_decode(file_get_contents($dataPath));

    echo json_encode($data);
?>