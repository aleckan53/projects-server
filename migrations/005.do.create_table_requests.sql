CREATE TABLE requests (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  project_id INTEGER REFERENCES projects(id) NOT NULL,
  sender_id INTEGER REFERENCES users(id) NOT NULL,
  recipient_id INTEGER REFERENCES users(id) NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  text TEXT DEFAULT 'New join request' NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

ALTER TABLE projects 
  ADD COLUMN 
    leader_id INTEGER REFERENCES users(id) NOT NULL;

ALTER TABLE user_projects
  ADD COLUMN
    title TEXT DEFAULT 'Contributor';