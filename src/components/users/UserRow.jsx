
import { EditIcon, TrashIcon } from "../../assets/icons";
import Badge from "../common/Badge";
import PlaceholderBox from "../common/PlaceholderBox";

export default function UserRow({
  user,
  onEdit,
  onDelete,
}) {
  if (!user) return null;

  return (
    <tr>
      <td className="py-3">
        <div className="d-flex align-items-center gap-3">
          <PlaceholderBox
            width="40px"
            height="40px"
            borderRadius="50%"
            text={`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`}
            style={{ backgroundColor: "#E0F2FE", color: "#026AA2", fontWeight: 700 }}
          />
          <div>
            <div className="fw-semibold text-dark">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-muted small">@{user.username}</div>
          </div>
        </div>
      </td>
      <td className="py-3 text-muted">{user.email}</td>
      <td className="py-3">
        <Badge
          variant={user.role === "Admin" ? "new" : "neutral"}
          pill
        >
          {user.role}
        </Badge>
      </td>
      <td className="py-3">
        <Badge
          variant={user.status === "Active" ? "success" : "neutral"}
          pill
        >
          {user.status || "Active"}
        </Badge>
      </td>
      <td className="py-3 text-muted">{user.joinedDate || "N/A"}</td>
      <td className="py-3 text-end">
        <div className="d-inline-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-light text-primary p-2 rounded-2"
            onClick={() => onEdit && onEdit(user)}
            aria-label={`Edit ${user.firstName}`}
          >
            <EditIcon size={16} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light text-danger p-2 rounded-2"
            onClick={() => onDelete && onDelete(user)}
            aria-label={`Delete ${user.firstName}`}
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
