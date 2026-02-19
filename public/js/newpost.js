const newpostFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const post_title = document.querySelector('#post_title').value.trim();
    const post_text = document.querySelector('#post_text').value.trim();
    
  
    if (post_title && post_title) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/posts/new', {
        method: 'POST',
        body: JSON.stringify({ post_title, post_text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/#recent-post');
      } else {
        alert('Failed to log in');
        console.log(req.body)
      }
    }
  };
  
  document
    .querySelector('.newpost-form')
    .addEventListener('submit', newpostFormHandler);