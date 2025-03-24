import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@progress/kendo-react-layout";

export const About = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    role: "",
    period: "",
    company: "",
    items: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedSkills = localStorage.getItem("skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else {
      const defaultSkills = [
        {
          role: "Senior Full Stack Developer",
          period: "2020 - Present",
          company: "Tech Solutions Inc.",
          items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
          description:
            "Leading development of enterprise web applications using modern technologies.",
        },
        {
          role: "Frontend Developer",
          period: "2018 - 2020",
          company: "Digital Innovations",
          items: ["Node.js", "Python", "PostgreSQL", "Redis"],
          description:
            "Developed responsive web applications and improved user experiences.",
        },
        {
          role: "Software Engineer",
          period: "2016 - 2018",
          company: "StartUp Labs",
          items: ["Figma", "Adobe XD", "UI/UX", "Prototyping"],
          description:
            "Built and maintained various web applications and services.",
        },
      ];
      setSkills(defaultSkills);
      localStorage.setItem("skills", JSON.stringify(defaultSkills));
    }
  }, []);

  useEffect(() => {
    if (skills.length > 0) {
      localStorage.setItem("skills", JSON.stringify(skills));
    }
  }, [skills]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const itemsArray = formData.items
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const newSkill = {
      ...formData,
      items: itemsArray,
    };

    if (editing) {
      const updatedSkills = [...skills];
      updatedSkills[editIndex] = newSkill;
      setSkills(updatedSkills);
      setEditing(false);
      setEditIndex(null);
    } else {
      setSkills([...skills, newSkill]);
    }

    setFormData({
      role: "",
      period: "",
      company: "",
      items: "",
      description: "",
    });

    setShowForm(false);
  };

  const handleEdit = (index) => {
    const skill = skills[index];
    setFormData({
      ...skill,
      items: skill.items.join(", "),
    });
    setEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updatedSkills = skills.filter((_, i) => i !== index);
      setSkills(updatedSkills);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        <button
          onClick={() => {
            if (editing) {
              setEditing(false);
              setEditIndex(null);
              setFormData({
                role: "",
                period: "",
                company: "",
                items: "",
                description: "",
              });
            }
            setShowForm(!showForm);
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: editing ? "#f44336" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showForm ? (editing ? "Cancel Edit" : "Cancel") : "Add New Entry"}
        </button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: "20px" }}>
          <CardHeader>
            <CardTitle>{editing ? "Edit Entry" : "Add New Entry"}</CardTitle>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="role"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="period"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Period:
                </label>
                <input
                  type="text"
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="company"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Company:
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="items"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Skills (comma separated):
                </label>
                <input
                  type="text"
                  id="items"
                  name="items"
                  value={formData.items}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="React, TypeScript, CSS"
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="description"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    minHeight: "80px",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {editing ? "Update Entry" : "Add Entry"}
              </button>
            </form>
          </CardBody>
        </Card>
      )}

      {skills.map((skill, index) => (
        <Card key={index} style={{ marginBottom: "20px" }}>
          <CardHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardTitle>{skill.role}</CardTitle>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <CardSubtitle>{skill.period}</CardSubtitle>
          </CardHeader>
          <CardBody>
            <p>
              <strong>Company:</strong> {skill.company}
            </p>
            <p>
              <strong>Skills:</strong> {skill.items.join(", ")}
            </p>
            <p>{skill.description}</p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
