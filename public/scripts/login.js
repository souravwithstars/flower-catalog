const showRegister = () => {
  const registerLink = document.getElementById('register-link');
  registerLink.style.visibility = 'visible';
  return;
};

const sendRequest = xhrRequest => {
  const { method, pathname, body } = xhrRequest;
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status !== 200) {
      showRegister();
      return;
    }
    document.location.href = '/guest-book';
  };
  xhr.open(method, pathname);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(body);
  return;
};

const validateUser = () => {
  const xhrRequest = {
    method: 'POST',
    pathname: '/logged-in'
  }

  const form = document.querySelector('form');
  const formData = new FormData(form);
  const parsedForm = new URLSearchParams(formData).toString();
  xhrRequest.body = parsedForm;
  sendRequest(xhrRequest);
  form.reset();
  return;
};