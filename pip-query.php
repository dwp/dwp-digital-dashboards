<?php
$query = $_GET['query'];

switch ($query) {
    case "sessionAndUsers":
        //http://www.bohyunkim.net/blog/archives/2831#.V9aAupMrJE5
        echo file_get_contents('https://spreadsheets.google.com/tq?tqx=&tq=SELECT%20A%2C%20B%2C%20C%20&key=19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366');
        break;
    case "deviceUsage":
        echo file_get_contents('http://spreadsheets.google.com/tq?key=19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366&range=R3:S5');
        break;
    case "totalUsers":
        echo file_get_contents('http://spreadsheets.google.com/tq?key=19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366&range=D3:F3');
        break;
    case "totalSessions":
        echo file_get_contents('http://spreadsheets.google.com/tq?key=19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366&range=D10:F10');
        break;
    case "sessionsToComplete":
        echo file_get_contents('http://spreadsheets.google.com/tq?key=19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366&range=D17:F17');
        break;
    case "completionRate":
        echo file_get_contents('http://spreadsheets.google.com/tq?key=19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366&range=H4:L6');
        break;
    case "completionTime":
        echo file_get_contents('http://spreadsheets.google.com/tq?key=19Uc0FgtNDp9EfFhiHZJHG0ax8ZCtdvxSkbZryiOxSKo&gid=1690305366&range=O3:Q5');
        break;
    default:
        echo "No Query to run";
}
?>
