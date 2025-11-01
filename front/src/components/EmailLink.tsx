// src/components/EmailLink.tsx
import React from "react";

type EmailLinkProps = {
  user: string;
  domain: string;
  className?: string;
  label?: string; // optional custom text to show
};

export default function EmailLink({
  user,
  domain,
  className = "",
  label,
}: EmailLinkProps) {
  // keep parts separate so HTML source doesn't show full email
  const [visible, setVisible] = React.useState(false);

  const email = `${user}@${domain}`;

  const handleClick = (e: React.MouseEvent) => {
    // first click reveals, second click actually follows the mailto
    if (!visible) {
      e.preventDefault();
      setVisible(true);
    }
  };

  return (
    <a
      href={visible ? `mailto:${email}` : "#"}
      onClick={handleClick}
      className={className || "text-[--color-primary] hover:text-[--color-accent] underline"}
    >
      {visible ? email : label ?? "Click to reveal email"}
    </a>
  );
}
