

function toggleMark(taskId) {
   
    const taskTitle = document.getElementById(`task-title-${taskId}`);
    const markButton = document.getElementById(`mark-unmark-${taskId}`);

    
    if (taskTitle.classList.contains("completed")) {
        
        taskTitle.classList.remove("completed");
        markButton.textContent = "Mark Task";
    } else {
        taskTitle.classList.add("completed");
        markButton.textContent = "Unmark Task";
    }
}

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()