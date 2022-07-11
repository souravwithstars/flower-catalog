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

  const table = thead + comments;

  return generateTag('table', table);
};

module.exports = { commentsHtml };
