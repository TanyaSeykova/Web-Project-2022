<?php

    $file = $_GET['audioPath'];
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($file).'"');
    header('Content-Length: ' . filesize($file));

    ob_clean();
    flush();
  
    readfile($file);

    exit;
?>