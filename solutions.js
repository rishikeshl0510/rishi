// Register the widget
Freshservice.load(function (freshservice) {
    // Create a custom widget that displays an import button
    var widget = {
      label: 'Import Knowledge Articles',
      template: '<button id="import-button">Import Knowledge Articles</button>',
      init: function () {
        // Add a click event listener to the import button
        document.getElementById('import-button').addEventListener('click', function () {
          // Open the file upload dialog
          var input = document.createElement('input');
          input.type = 'file';
          input.accept = '.csv';
          input.addEventListener('change', function () {
            // Upload the file to the server
            var formData = new FormData();
            formData.append('file', input.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/process-file');
            xhr.onload = function () {
              if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                // Display the number of articles imported
                alert(response.count + ' articles imported successfully.');
              }
            };
            xhr.send(formData);
          });
          input.click();
        });
      }
    };
    // Add the widget to the Solutions module
    freshservice.solutions.addCustomWidget(widget);
  });
  
