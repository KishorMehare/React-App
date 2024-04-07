<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
</head>
<body>
    <form id="registrationForm">
        <input type="text" name="name" placeholder="Name">
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Register</button>
    </form>
    <div id="message"></div>

    <table id="userTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready(function() {
            // Initialize DataTable
            $('#userTable').DataTable();

            // Form submission with Ajax
            $('#registrationForm').submit(function(event) {
                event.preventDefault();
                var formData = $(this).serialize();
                $.ajax({
                    url: '<?php echo $_SERVER["PHP_SELF"]; ?>',
                    type: 'POST',
                    data: formData + '&action=register',
                    success: function(response) {
                        $('#message').html(response);
                        // Reload DataTable with updated data
                        $('#userTable').DataTable().ajax.reload();
                    }
                });
            });

            // Fetch initial data 
            $('#userTable').DataTable({
                "ajax": {
                    "url": '<?php echo $_SERVER["PHP_SELF"]; ?>',
                    "type": "POST",
                    "data": function(d) {
                        d.action = 'fetch_users';
                    }
                },
                "columns": [
                    {"data": "name"},
                    {"data": "email"}
                ]
            });
        });
    </script>

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['action']) && $_POST['action'] == 'register') {
        // Handle form submission (Registration)
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        
        $connection = new mysqli("localhost", "username", "password", "database_name");
        if ($connection->connect_error) {
            die("Connection failed: " . $connection->connect_error);
        }

        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
        if ($connection->query($sql) === TRUE) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $sql . "<br>" . $connection->error;
        }

        $connection->close();
    } elseif (isset($_POST['action']) && $_POST['action'] == 'fetch_users') {
        // Fetch users from the database
        $connection = new mysqli("localhost", "username", "password", "database_name");
        if ($connection->connect_error) {
            die("Connection failed: " . $connection->connect_error);
        }

        $sql = "SELECT name, email FROM users";
        $result = $connection->query($sql);

        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode(array('data' => $data));

        $connection->close();
    }
}

?>
</body>
</html>
