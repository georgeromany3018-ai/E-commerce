import { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import Button from "../common/Button";
import Input from "../common/Input";
import { FiEdit2, FiMail, FiInfo } from "../../assets/icons";

export default function EditUserModal({
  show = false,
  user = null,
  onHide,
  onSubmit,
}) {
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
            <FiEdit2 size={20} />
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-dark">Edit User</h5>
            <div className="text-muted small fw-normal">
              Update user details and assigned system role.
            </div>
          </div>
        </div>
      }
      size="md"
    >
      {show && user && (
        <EditUserForm
          user={user}
          onHide={onHide}
          onSubmit={onSubmit}
        />
      )}
    </ModalWrapper>
  );
}

function EditUserForm({ user, onHide, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "user",
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
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username.replace(/^@/, ""),
      email: formData.email,
      role: formData.role,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 col-sm-6">
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
            icon={<FiMail size={16} />}
            required
          />
        </div>
      </div>

      <div className="mb-3">
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

      {/* Info Box */}
      <div
        className="p-3 rounded-3 d-flex align-items-start gap-2 mb-4"
        style={{ backgroundColor: "#EFF4FF", border: "1px solid #D9E3F6" }}
      >
        <FiInfo size={18} className="text-primary mt-1 flex-shrink-0" />
        <div className="small text-muted" style={{ fontSize: "0.825rem" }}>
          Simulated action: Changes take effect within this active browser session. DummyJSON will not persist updates to its backend.
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 w-100">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
