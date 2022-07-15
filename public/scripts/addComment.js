const generateTag = (tag, content) => `<${tag}> ${content}</${tag}>`;

const commentsHtml = allComments => {
  const thead = '<tr><th>Date</th><th>Name</th><th>Comment</th></tr>';
  let comments = '';

  allComments.forEach(({ date, name, comment }) => {
    const dateHtml = generateTag('td', date);
    const nameHtml = generateTag('td', name);
    const commentHtml = generateTag('td', comment);
    comments += generateTag('tr', `${dateHtml}${nameHtml}${commentHtml}`);
  });

  const tableData = thead + comments;

  return tableData;
};

const updateCommentsTable = response => {
  const allComments = JSON.parse(response);
  const table = document.querySelector('table');
  table.innerHTML = commentsHtml(allComments);
  return;
};

const showComments = () => {
  const method = 'GET';
  const pathname = '/api/comments';

  const xhr = new XMLHttpRequest();
  xhr.onload = () => { updateCommentsTable(xhr.response) };
  xhr.open(method, pathname);
  xhr.send();
  return;
};

const sendRequest = xhrRequest => {
  const { method, pathname, body } = xhrRequest;
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      xhr.send('Post Unsuccessfull');
      return;
    }
    console.log('Post Successfull');
  };
  xhr.open(method, pathname);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(body);
  showComments();
  return;
};

const addComment = () => {
  const xhrRequest = {
    method: 'POST',
    pathname: '/add-comment',
  }

  const form = document.querySelector('form');
  const formData = new FormData(form);
  const parsedForm = new URLSearchParams(formData).toString();
  xhrRequest.body = parsedForm;
  sendRequest(xhrRequest);
  form.reset();
  return;
};
