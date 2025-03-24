import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { Fade } from "@progress/kendo-react-animation";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardActions,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";


const defaultExperiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    period: "2021 - Present",
    description:
      "Led development of enterprise-scale React applications, mentored junior developers, and implemented CI/CD pipelines.",
    technologies: ["React", "Node.js", "AWS", "TypeScript"],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd",
    period: "2019 - 2021",
    description:
      "Developed and maintained multiple client projects, implemented responsive designs, and optimized application performance.",
    technologies: ["Vue.js", "Python", "Docker", "PostgreSQL"],
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2018 - 2019",
    description:
      "Created responsive web applications and collaborated with designers to implement pixel-perfect interfaces.",
    technologies: ["JavaScript", "HTML/CSS", "React", "Sass"],
  },
];

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [experiences, setExperiences] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
    technologies: "",
  });

  
  useEffect(() => {
    try {
      const storedExperiences = localStorage.getItem("workExperiences");

      if (storedExperiences && JSON.parse(storedExperiences).length > 0) {
        setExperiences(JSON.parse(storedExperiences));
      } else {
        setExperiences(defaultExperiences);
        localStorage.setItem(
          "workExperiences",
          JSON.stringify(defaultExperiences)
        );
      }
    } catch (error) {
      console.error("Error loading experiences from localStorage:", error);
      setExperiences(defaultExperiences);
      localStorage.setItem(
        "workExperiences",
        JSON.stringify(defaultExperiences)
      );
    }
  }, []);

  useEffect(() => {
    if (experiences && experiences.length > 0) {
      try {
        localStorage.setItem("workExperiences", JSON.stringify(experiences));
      } catch (error) {
        console.error("Error saving experiences to localStorage:", error);
      }
    }
  }, [experiences]);

  const openAddDialog = () => {
    setEditIndex(null);
    setFormData({
      title: "",
      company: "",
      period: "",
      description: "",
      technologies: "",
    });
    setDialogOpen(true);
  };

  const openEditDialog = (index) => {
    setEditIndex(index);
    const experience = experiences[index];
    setFormData({
      ...experience,
      technologies: experience.technologies.join(", "),
    });
    setDialogOpen(true);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setConfirmDialogOpen(true);
  };

  const handleDelete = () => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(deleteIndex, 1);
    setExperiences(updatedExperiences);
    setConfirmDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.company || !formData.period) {
      alert("Title, company and period are required!");
      return;
    }

    const technologiesArray = formData.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");

    const experienceData = {
      ...formData,
      technologies: technologiesArray,
    };

    const updatedExperiences = [...experiences];

    if (editIndex !== null) {
      updatedExperiences[editIndex] = experienceData;
    } else {
      updatedExperiences.push(experienceData);
    }

    setExperiences(updatedExperiences);
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <Fade enter={inView}>
          <div className="experience-content" ref={ref}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="experience-title">Work Experience</h2>
              <Button className="add-experience-button" onClick={openAddDialog}>
                Add Experience
              </Button>
            </div>
            <div className="experience-list">
              {experiences && experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <Fade enter={inView} key={index} className="experience-item">
                    <div className="experience-icon">
                      <div className="icon-wrapper">
                        <Briefcase className="briefcase-icon" />
                      </div>
                    </div>

                    <Card className="experience-card">
                      <CardHeader className="experience-card-header">
                        <CardTitle>{exp.title}</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <p className="experience-company">{exp.company}</p>
                        <p className="experience-period">{exp.period}</p>
                        <p className="experience-description">
                          {exp.description}
                        </p>
                        <div className="experience-tech-list">
                          {exp.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="experience-tech">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <CardActions className="mt-4 flex justify-end">
                          <Button
                            icon="k-icon k-i-pencil"
                            className="edit-button mr-2"
                            onClick={() => openEditDialog(index)}
                          />
                          <Button
                            icon="k-icon k-i-trash"
                            className="delete-button"
                            onClick={() => confirmDelete(index)}
                          />
                        </CardActions>
                      </CardBody>
                    </Card>
                  </Fade>
                ))
              ) : (
                <div className="no-experiences-message">
                  <p>No work experiences found. Add your first experience!</p>
                </div>
              )}
            </div>
          </div>
        </Fade>
      </div>

      {/* Add/Edit Dialog */}
      {dialogOpen && (
        <Dialog
          title={
            editIndex !== null ? "Edit Work Experience" : "Add Work Experience"
          }
          onClose={() => setDialogOpen(false)}
          width={500}
        >
          <div className="p-4">
            <div className="mb-4">
              <label className="block mb-2">Job Title*</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Company*</label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Period*</label>
              <Input
                name="period"
                value={formData.period}
                onChange={handleInputChange}
                placeholder="e.g., 2021 - Present"
                className="w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Technologies (comma-separated)
              </label>
              <Input
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="e.g., React, Node.js, TypeScript"
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-600">* Required fields</p>
          </div>

          <DialogActionsBar>
            <Button
              onClick={() => setDialogOpen(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="submit-button primary">
              {editIndex !== null ? "Update" : "Add"} Experience
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {/* Confirm Delete Dialog */}
      {confirmDialogOpen && (
        <Dialog
          title="Confirm Delete"
          onClose={() => setConfirmDialogOpen(false)}
          width={400}
        >
          <p className="p-4">
            Are you sure you want to delete this work experience?
          </p>
          <DialogActionsBar>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} className="delete-button danger">
              Delete
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </section>
  );
};

export default Experience;
