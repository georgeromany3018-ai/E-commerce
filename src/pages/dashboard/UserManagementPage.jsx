import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PlaceholderBox from "../../components/common/PlaceholderBox";
import EmptyState from "../../components/common/EmptyState";
import CreateUserModal from "../../components/users/CreateUserModal";
import EditUserModal from "../../components/users/EditUserModal";
import DeleteUserBottomSheet from "../../components/users/DeleteUserBottomSheet";
import {
  FiUserPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiUsers,
  FiShield,
  FiUserCheck,
} from "../../assets/icons";
import {
  fetchUsersDash,
  addUser,
  updateUser,
  deleteUser,
} from "../../store/Slices/usersDashSlice";
import { deleteUserApi } from "../../services/users";
import toast, { Toaster } from "react-hot-toast";

export default function UserManagementPage({
  onCreateUserClick,
  onEditUserClick,
  onDeleteUserClick,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, users, limit, skip, total, totalPages } =
    useSelector((store) => store.usersDash);

  const [searchedUser, setSearchedUser] = useState("");
  const [role, setRole] = useState("");
  const [sortOpt, setSortOpt] = useState("asc");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState(null);

  const [showDeleteSheet, setShowDeleteSheet] = useState(false);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);

  useEffect(() => {
    dispatch(
      fetchUsersDash({
        limit: 8,
        skip: 0,
        sortBy: "firstName",
        sortOpt,
        searchedUser: searchedUser.trim(),
        role,
      })
    );
  }, [dispatch, sortOpt, searchedUser, role]);

  const currentPage = Math.floor(skip / limit) + 1;
  const windowSize = Math.min(5, totalPages);
  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - windowSize + 1)
  );

  const calcSkip = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    dispatch(
      fetchUsersDash({
        limit,
        skip: (page - 1) * limit,
        sortBy: "firstName",
        sortOpt,
        searchedUser: searchedUser.trim(),
        role,
      })
    );
  };

  const handleRetry = () => {
    dispatch(
      fetchUsersDash({
        limit,
        skip,
        sortBy: "firstName",
        sortOpt,
        searchedUser: searchedUser.trim(),
        role,
      })
    );
  };

  const handleOpenCreateModal = () => {
    if (onCreateUserClick) {
      onCreateUserClick();
    } else {
      setShowCreateModal(true);
    }
  };

  const handleViewUser = (user) => {
    navigate(`/dashboard/users/${user.id}`);
  };

  const handleEditClick = (user) => {
    if (onEditUserClick) {
      onEditUserClick(user);
    } else {
      setSelectedEditUser(user);
      setShowEditModal(true);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedDeleteUser(user);
    setShowDeleteSheet(true);
    if (onDeleteUserClick) {
      onDeleteUserClick(user);
    }
  };

  const from = total === 0 ? 0 : skip + 1;
  const to = Math.min(skip + users.length, total);

  // Distinct roles on page
  const distinctRolesCount = new Set(users.map((u) => u.role)).size;

  return (
    <div className="user-management-page pb-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#1D1929" }}>
            User Management
          </h2>
          <p className="text-muted small mb-0">
            Control customer accounts, administrator roles, and access credentials.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            icon={<FiUserPlus size={16} />}
            onClick={handleOpenCreateModal}
          >
            Create New User
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="p-3 rounded-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="d-flex align-items-center gap-2 flex-grow-1"
          style={{ maxWidth: 440 }}
        >
          <Input
            placeholder="Search by name, email, or username..."
            icon={<FiSearch size={16} />}
            className="w-100"
            value={searchedUser}
            onChange={(e) => setSearchedUser(e.target.value)}
          />
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <select
            className="form-select form-select-sm"
            style={{
              width: "auto",
              minWidth: 140,
              borderRadius: 8,
              borderColor: "#E2E8F0",
            }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="moderator">Moderator</option>
            <option value="user">Customer / User</option>
          </select>

          <select
            className="form-select form-select-sm"
            style={{
              width: "auto",
              minWidth: 160,
              borderRadius: 8,
              borderColor: "#E2E8F0",
            }}
            value={sortOpt}
            onChange={(e) => setSortOpt(e.target.value)}
          >
            <option value="asc">Name: A to Z</option>
            <option value="desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Users Table Card */}
      <div
        className="rounded-3 overflow-hidden mb-4"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              style={{
                backgroundColor: "#F8F9FF",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <tr>
                <th className="text-muted small text-uppercase py-3 ps-3">
                  User
                </th>
                <th className="text-muted small text-uppercase py-3">
                  Role
                </th>
                <th className="text-muted small text-uppercase py-3">
                  Company & Title
                </th>
                <th className="text-muted small text-uppercase py-3">
                  Location
                </th>
                <th className="text-muted small text-uppercase py-3 text-end pe-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }, (_, index) => (
                  <tr
                    key={`user-skeleton-${index}`}
                    className="placeholder-glow"
                    style={{ borderBottom: "1px solid #F1F5F9" }}
                  >
                    <td className="ps-3">
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className="placeholder rounded-circle"
                          style={{ width: 42, height: 42, flexShrink: 0 }}
                        />
                        <div className="flex-grow-1">
                          <span
                            className="placeholder col-8 mb-2"
                            style={{ height: 14 }}
                          />
                          <br />
                          <span
                            className="placeholder col-5"
                            style={{ height: 11 }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className="placeholder rounded"
                        style={{ width: 70, height: 24 }}
                      />
                    </td>
                    <td>
                      <span
                        className="placeholder col-7 mb-1"
                        style={{ height: 14 }}
                      />
                      <br />
                      <span
                        className="placeholder col-5"
                        style={{ height: 11 }}
                      />
                    </td>
                    <td>
                      <span
                        className="placeholder col-6"
                        style={{ height: 14 }}
                      />
                    </td>
                    <td className="text-end pe-3">
                      <span
                        className="placeholder rounded me-1"
                        style={{ width: 28, height: 28 }}
                      />
                      <span
                        className="placeholder rounded me-1"
                        style={{ width: 28, height: 28 }}
                      />
                      <span
                        className="placeholder rounded"
                        style={{ width: 28, height: 28 }}
                      />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    <div className="text-danger fw-semibold mb-2">
                      Failed to load users
                    </div>
                    <p className="text-muted small mb-3">
                      {typeof error === "string"
                        ? error
                        : "Something went wrong while loading users."}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleRetry}
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-5">
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const roleStyle =
                    u.role === "admin"
                      ? { bg: "#F5F3FF", color: "#7C3AED" }
                      : u.role === "moderator"
                        ? { bg: "#EFF4FF", color: "#3525CD" }
                        : { bg: "#DCFCE7", color: "#16A34A" };

                  return (
                    <tr
                      key={u.id}
                      style={{ borderBottom: "1px solid #F1F5F9" }}
                    >
                      <td className="ps-3">
                        <div className="d-flex align-items-center gap-3">
                          {u.image ? (
                            <img
                              src={u.image}
                              alt={u.firstName}
                              width={42}
                              height={42}
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <PlaceholderBox
                              width={42}
                              height={42}
                              label={`${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}`}
                              radius="50%"
                            />
                          )}
                          <div>
                            <div
                              className="fw-semibold text-dark mb-0"
                              style={{ fontSize: "0.925rem" }}
                            >
                              {u.firstName} {u.lastName}
                            </div>
                            <div className="text-muted small">
                              {u.email} • @{u.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className="badge text-capitalize"
                          style={{
                            backgroundColor: roleStyle.bg,
                            color: roleStyle.color,
                            fontWeight: 500,
                            padding: "6px 10px",
                            borderRadius: 6,
                          }}
                        >
                          {u.role || "User"}
                        </span>
                      </td>
                      <td>
                        <div className="fw-medium text-dark">
                          {u.company?.name || "—"}
                        </div>
                        <div className="text-muted small">
                          {u.company?.title || "—"}
                        </div>
                      </td>
                      <td className="small text-muted">
                        {u.address?.city || u.address?.state
                          ? `${u.address.city || ""}, ${u.address.state || ""}`
                          : "—"}
                      </td>
                      <td className="text-end pe-3">
                        <div className="d-inline-flex gap-1">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-light text-primary border-0 p-2"
                            title="View User Details"
                            onClick={() => handleViewUser(u)}
                          >
                            <FiEye size={15} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-light text-secondary border-0 p-2"
                            title="Edit User"
                            onClick={() => handleEditClick(u)}
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-light text-danger border-0 p-2"
                            title="Delete User"
                            onClick={() => handleDeleteClick(u)}
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="text-muted small">
            Showing{" "}
            <strong className="text-dark">
              {from}-{to}
            </strong>{" "}
            of <strong className="text-dark">{total}</strong> users
          </div>

          {totalPages > 1 && (
            <div>
              <Pagination className="my-2 justify-content-center">
                {currentPage > 1 && (
                  <Pagination.First
                    onClick={() => calcSkip(1)}
                    disabled={isLoading}
                  />
                )}

                <Pagination.Prev
                  onClick={() => calcSkip(currentPage - 1)}
                  disabled={isLoading || currentPage <= 1}
                />

                {Array.from({ length: windowSize }, (_, index) => {
                  const page = startPage + index;
                  return (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      disabled={isLoading}
                      onClick={() => calcSkip(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next
                  onClick={() => calcSkip(currentPage + 1)}
                  disabled={isLoading || currentPage >= totalPages}
                />

                {currentPage < totalPages && (
                  <Pagination.Last
                    onClick={() => calcSkip(totalPages)}
                    disabled={isLoading}
                  />
                )}
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* 3 Summary Cards at bottom */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Total Registered Users
              </span>
              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#EFF4FF", color: "#3525CD" }}
              >
                <FiUsers size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-1">{total}</div>
            <div className="text-success small fw-medium">
              Live DummyJSON accounts
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Active Roles in View
              </span>
              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}
              >
                <FiShield size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-1">
              {distinctRolesCount} Distinct Roles
            </div>
            <div className="text-muted small">
              admin • moderator • user
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div
            className="p-3 rounded-3 h-100"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small text-uppercase fw-semibold">
                Accounts in View
              </span>
              <div
                className="p-2 rounded-2"
                style={{ backgroundColor: "#F5F3FF", color: "#7C3AED" }}
              >
                <FiUserCheck size={18} />
              </div>
            </div>
            <div className="fs-4 fw-bold text-dark mb-1">
              {users.length} Users
            </div>
            <div className="text-muted small">
              Page {currentPage} of {Math.max(1, totalPages)}
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Bottom Sheets */}
      <CreateUserModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={(newUser) => {
          dispatch(addUser(newUser));
          setShowCreateModal(false);
        }}
      />

      <EditUserModal
        show={showEditModal}
        user={selectedEditUser}
        onHide={() => {
          setShowEditModal(false);
          setSelectedEditUser(null);
        }}
        onSubmit={(updatedUser) => {
          dispatch(updateUser(updatedUser));
          setShowEditModal(false);
          setSelectedEditUser(null);
        }}
      />

      <DeleteUserBottomSheet
        show={showDeleteSheet}
        user={selectedDeleteUser}
        onHide={() => {
          setShowDeleteSheet(false);
          setSelectedDeleteUser(null);
        }}
        onConfirmDelete={async () => {
          if (!selectedDeleteUser) return;
          const userId = selectedDeleteUser.id;
          const userName = `${selectedDeleteUser.firstName} ${selectedDeleteUser.lastName}`;
          try {
            await deleteUserApi(userId);
          } catch {
            // Simulated operation in DummyJSON
          }
          dispatch(deleteUser(userId));
          setShowDeleteSheet(false);
          setSelectedDeleteUser(null);
          toast.success(
            `User ${userName} removed (Simulated)`,
            { id: `delete-user-${userId}` }
          );
        }}
      />
      <Toaster position="top-right" />
    </div>
  );
}
