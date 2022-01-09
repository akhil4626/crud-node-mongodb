(function () {
  'use strict'
  const forms = document.querySelectorAll('.requires-validation')
  Array.from(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();


$('#add_user').submit(function (event) {
  alert('Data Insert Successfully');
})


// Update User
$('#update_user').submit(function (event) {
  event.preventDefault();

  var data_array = $(this).serializeArray();
  var data = {}

  $.map(data_array, function (n, i) {
    data[n['name']] = n['value']
  })

  console.log(data);
  var request = {
    "url": `http://localhost:3000/api/users/${data.id}`,
    "method": "PUT",
    "data": data
  }

  $.ajax(request).done(function (res) {
    alert('Data Updated Successfully');
  })
})

// Delete User
$('.delete').click(function (e) {
  e.preventDefault();
  var delete_id = $(this).data('id');

  if (confirm("Are you Sure")) {
    var request = {
      "url": `http://localhost:3000/api/users/${delete_id}`,
      "method": "DELETE",
    }
    $.ajax(request).done(function (res) {
      alert('Data Deleted Successfully');
      location.reload();
    })
  }
})

