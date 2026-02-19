const editpostFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const post_title = document.querySelector('#post_title').value.trim();
    const post_text = document.querySelector('#post_text').value.trim();
    const post_id = document.querySelector('#post_id').textContent;
  
    if (event.target.id === 'updateBtn') {
      // If the update button was clicked, send the updated post data to the server
    
    if (post_title && post_text) {
      // Send the updated post data to the server
      console.log('this is the post_id');
      console.log(post_id);
      const response = await fetch(`/api/posts/edit/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_title, post_text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/api/posts/${post_id}`);
      } else {
        alert('Failed to update post');
      }
    }
  } else if (event.target.id === 'deleteBtn') {
    // If the delete button was clicked, send a DELETE request to the server
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete post');
    }
  }
};
  
  document.querySelector('#updateBtn').addEventListener('click', editpostFormHandler);
  document.querySelector('#deleteBtn').addEventListener('click', editpostFormHandler);
  