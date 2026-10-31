import { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import Button from "../common/Button";
import Input from "../common/Input";
import { FiUserPlus, FiMail, FiInfo } from "../../assets/icons";

export default function CreateUserModal({
  show = false,
  onHide,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "user",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username.replace(/^@/, ""),
      email: formData.email,
      role: formData.role,
      address: { city: "New York", state: "NY" },
      company: { name: "Store Operations", title: formData.role },
      image: "",
    });
  };

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title={
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40, backgroundColor: "#EFF4FF", color: "#3525CD" }}
          >
            <FiUserPlus size={20} />
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-dark">Add New User</h5>
            <div className="text-muted small fw-normal">
              Create a new account for your store management team.
            </div>
          </div>
        </div>
      }
      size="md"
      footer={
        <div className="d-flex justify-content-end gap-2 w-100">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={<FiUserPlus size={16} />}
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. John"
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Doe"
              required
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. johndoe"
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              icon={<FiMail size={16} />}
              required
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-medium text-dark mb-1">
              Role
            </label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{ borderRadius: 8, borderColor: "#C7C4D8", padding: "0.55rem 0.75rem" }}
            >
              <option value="user">User / Customer</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="col-12 col-sm-6">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Info Box */}
        <div
          className="p-3 rounded-3 d-flex align-items-start gap-2"
          style={{ backgroundColor: "#EFF4FF", border: "1px solid #D9E3F6" }}
        >
          <FiInfo size={18} className="text-primary mt-1 flex-shrink-0" />
          <div className="small text-muted" style={{ fontSize: "0.825rem" }}>
            Simulated action: User account creation is simulated in the active session. DummyJSON will not persist new accounts to remote storage.
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}
