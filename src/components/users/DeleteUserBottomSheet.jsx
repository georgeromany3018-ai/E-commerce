import BottomSheet from "../common/BottomSheet";
import PlaceholderBox from "../common/PlaceholderBox";

export default function DeleteUserBottomSheet({
  show = false,
  user = null,
  onHide,
  onConfirmDelete,
}) {
  const targetUser = user || {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
  };

  const itemPreview = (
    <div className="d-flex align-items-center gap-3">
      {targetUser.image ? (
        <img
          src={targetUser.image}
          alt={targetUser.firstName}
          width={56}
          height={56}
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      ) : (
        <PlaceholderBox
          width={56}
          height={56}
          label={
            targetUser.firstName && targetUser.lastName
              ? `${targetUser.firstName[0]}${targetUser.lastName[0]}`
              : "USR"
          }
          radius="50%"
        />
      )}
      <div>
        <span
          className="badge text-uppercase mb-1"
          style={{
            backgroundColor:
              targetUser.role === "admin"
                ? "#F5F3FF"
                : targetUser.role === "moderator"
                  ? "#EFF4FF"
                  : "#DCFCE7",
            color:
              targetUser.role === "admin"
                ? "#7C3AED"
                : targetUser.role === "moderator"
                  ? "#3525CD"
                  : "#16A34A",
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        >
          {targetUser.role || "User"}
        </span>
        <div className="fw-bold text-dark">
          {targetUser.firstName} {targetUser.lastName}
        </div>
        <div className="small text-muted">
          {targetUser.email} • ID: #{targetUser.id}
        </div>
      </div>
    </div>
  );

  return (
    <BottomSheet
      show={show}
      onHide={onHide}
      onConfirm={onConfirmDelete}
      title="Delete User Account?"
      description="This action will remove the user from the current management view. DummyJSON delete operations are simulated and do not persist on the server."
      itemPreview={itemPreview}
      confirmText="Confirm Delete"
      cancelText="Cancel and Go Back"
      isDanger={true}
      footerNote="Simulated Action: DummyJSON write operations are simulated and non-persistent."
    />
  );
}
