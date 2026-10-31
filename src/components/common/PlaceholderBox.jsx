import React from "react";

// Per spec: API images (product, category, user) are rendered as plain neutral placeholder boxes.
export default function PlaceholderBox({
  width = "100%",
  height = "200px",
  borderRadius = "12px",
  text = "Image Placeholder",
  className = "",
  style = {},
  aspectRatio,
}) {
  return (
    <div
      className={`image-placeholder-box ${className}`}
      style={{
        width,
        height: aspectRatio ? "auto" : height,
        aspectRatio,
        borderRadius,
        ...style,
      }}
      aria-label={text}
      role="img"
    >
      <span>{text}</span>
    </div>
  );
}
