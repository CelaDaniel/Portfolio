import { useState, useEffect } from 'react';

import axios from 'axios';

const Project = () => {
  const [projects, setProjects] = useState([
    {
      name: '',
      html_url: '',
      description: '',
      language: '',
    },
  ]);
  useEffect(() => {
    axios
      .get('https://api.github.com/users/Alex289/repos', {
        responseType: 'json',
      })
      .then((response) => {
        setProjects(response.data);
      });
  }, []);

  return (
    <>
      {projects.map((project, index) => (
        <div
          key={index}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-3 p-3">
          <h4 className="font-semibold text-lg tracking-wide">
            <a
              className="hover:text-gray-700 transition"
              target="_blank"
              rel="noopener noreferrer"
              href={project.html_url}>
              {project.name}
            </a>
          </h4>
          <p className="col-span-2">{project.description}</p>
          <p>{project.language}</p>
        </div>
      ))}
    </>
  );
};

export default Project;
