"use client";

import { AccountFilesUploadPostApiResponse } from "@/utils/apis/account/files/upload/POST/accountFilesUploadPostApi";
import { Button } from "@/components/components/atoms/button";
import { useRef } from "react";

interface FileUploadProps {
  label: string;
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  isLoading?: boolean;
  file?: AccountFilesUploadPostApiResponse["file"] | null;
}

const FileUpload = ({
  label,
  onChange,
  disabled,
  isLoading,
  file,
  accept = ".pdf,.jpg,.jpeg,.png",
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (onChange) onChange(file);
  };

  return (
    <div
      className="flex justify-between items-center w-full border  rounded p-3 bg-card/30"
      onClick={handleClick}
    >
      <div className="inline-flex flex-col">
        <span className="text-muted-foreground text-sm">{label}</span>
        {file && (
          <span className="text-muted-foreground text-sm">
            {file?.original_filename || ""}
          </span>
        )}
      </div>
      <Button
        disabled={disabled || isLoading}
        variant={"secondary"}
        size={"sm"}
        state="warning"
      >
        {isLoading ? "در حال بارگذاری..." : "انتخاب فایل"}
      </Button>

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUpload;
