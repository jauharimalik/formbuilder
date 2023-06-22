<?php
$nama = $_GET['nama'] ?? "Tamu";
$pesan = $_GET['pesan'] ?? "Selamat Ya";
$filex = "pesan.txt";
$txt = "Dari : ".$nama." - Pesan : ".$pesan."<br>";
$myfile = file_put_contents($filex, $txt.PHP_EOL , FILE_APPEND | LOCK_EX);

echo file_get_contents($filex);