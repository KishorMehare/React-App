<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload Form</title>
</head>
<body>
    <form id="fileUploadForm" enctype="multipart/form-data">
        <input type="file" name="file" id="fileInput">
        <button type="submit">Upload File</button>
    </form>
    <div id="imageContainer"></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#fileUploadForm').submit(function(event) {
                event.preventDefault();
                var formData = new FormData($(this)[0]);
                $.ajax({
                    url: '<?php echo $_SERVER["PHP_SELF"]; ?>',
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        $('#imageContainer').html('<img src="' + response + '" alt="Uploaded Image">');
                    }
                });
            });
        });
    </script>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Check if file was uploaded without errors
        if (isset($_FILES["file"]) && $_FILES["file"]["error"] == 0) {
            $targetDir = "uploads/";
            $targetFile = $targetDir . basename($_FILES["file"]["name"]);

            // Move the uploaded file to the target directory
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
                // Return the path to the uploaded file
                echo '<script>$("#imageContainer").html(\'<img src="' . $targetFile . '" alt="Uploaded Image">\');</script>';
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        } else {
            echo "File upload failed.";
        }
    }
    ?>
</body>
</html>
