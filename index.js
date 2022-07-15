const { myApp } = require('./src/app.js');

const main = (port, config) => {
  const sessions = {};

  const app = myApp(config, sessions);
  app.listen(port, () => console.log(`Server listening on ${port}`));
};

const PORT = 4567;
const config = {
  guestbook: 'resources/comments.json',
  path: 'public',
  templateFile: 'resources/guest-book.html',
  userDetails: 'resources/userDetails.json'
};

main(PORT, config);
