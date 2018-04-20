const socket = io();

const loginForm = document.querySelector('section:nth-of-type(1)');
const loginButton = document.querySelector('section:nth-of-type(1) button');
const username = document.querySelector('section:nth-of-type(1) form label input');
const chatForm = document.querySelector('section:nth-of-type(2)');
const usersOnline = document.querySelector('section:nth-of-type(2) ul');
const chatButton = document.querySelector('section:nth-of-type(2) > section:nth-of-type(2) > div:nth-of-type(1) form button');
const message = document.querySelector('section:nth-of-type(2) > section:nth-of-type(2) > div:nth-of-type(1) form input');
const output = document.querySelector('section:nth-of-type(2) > section:nth-of-type(2) > div:nth-of-type(1) ul');
const feedback = document.querySelector('section:nth-of-type(2) > section:nth-of-type(2) > div:nth-of-type(1) > div:first-of-type > div');

loginButton.addEventListener('click', e => {
  e.preventDefault();
  socket.emit('new user', username.value, data => {
    if (data) {
      chatForm.style.display = 'flex';
      loginForm.style.display = 'none';
    }
  });
  username.innerHTML = '';
});

socket.on('get users', data => {
  let userArray = '';
  data.forEach(username => {
    userArray += `<li>${username}</li>`;
  });
  usersOnline.innerHTML = userArray;
});

chatButton.addEventListener('click', e => {
  e.preventDefault();
  if (message.value === '') {
    e.preventDefault();
  } else {
    socket.emit('chat', {
      message: message.value,
      username: username.value
    });
  }
});

socket.on('chat', data => {
  feedback.innerHTML = '';
  message.value = '';
  output.innerHTML += `<li><strong>${data.username}:</strong> ${data.message}</li>`;
});

message.addEventListener('keypress', () => {
  socket.emit('typing', username.value);
});

socket.on('typing', data => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
