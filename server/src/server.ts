import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

interface Issue {
  id: number;
  title: string;
  description: string;
}

let issues: Issue[] = [
  { id: 1, title: 'First Issue', description: 'This is the first issue' },
  { id: 2, title: 'Second Issue', description: 'This is the second issue' },
];

app.get('/api/issues', (req, res) => {
  res.json(issues);
});

app.post('/api/issues', (req, res) => {
  const newIssue: Issue = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
  };
  issues.push(newIssue);
  console.log('Created:', newIssue);
  res.status(201).json(newIssue);
});

app.put('/api/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = issues.findIndex(issue => issue.id === id);
  if (index !== -1) {
    issues[index] = { ...issues[index], ...req.body };
    console.log('Updated:', issues[index]);
    res.json(issues[index]);
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

app.delete('/api/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedIssue = issues.find(issue => issue.id === id);
  issues = issues.filter(issue => issue.id !== id);
  if (deletedIssue) {
    console.log('Deleted:', deletedIssue);
    res.status(200).json(deletedIssue);
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});