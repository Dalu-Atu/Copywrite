"use client";

import { useConverter } from "./ConverterProvider";

export default function UploadTrigger({
  as: Tag = "button",
  children,
  ...rest
}) {
  const { openPicker, isProcessing } = useConverter();
  return (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      onClick={openPicker}
      disabled={isProcessing}
      {...rest}
    >
      {children}
    </Tag>
  );
}
