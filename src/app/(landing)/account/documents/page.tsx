"use client";

import {
  IconFile,
  IconDownload,
  IconEye,
  IconUpload,
  IconCheck,
  IconClock,
  IconChevronRight,
  IconTrash,
} from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import BottomSheet from "@/app/_components/BottomSheet";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DocumentsPage = () => {
  const router = useRouter();

  const [documents, setDocuments] = useState<
    {
      id: number;
      name: string;
      type: string;
      status: string;
      uploadDate: string | null;
      fileSize: string | null;
      required: boolean;
    }[]
  >([
    {
      id: 1,
      name: "کارت ملی",
      type: "تصویر",
      status: "آپلود نشده",
      uploadDate: null,
      fileSize: null,
      required: true,
    },
    {
      id: 2,
      name: "مجوز توزیع استانی یا کشوری",
      type: "تصویر",
      status: "آپلود نشده",
      uploadDate: null,
      fileSize: null,
      required: true,
    },
    {
      id: 3,
      name: "جواز کسب",
      type: "تصویر",
      status: "آپلود نشده",
      uploadDate: null,
      fileSize: null,
      required: true,
    },
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [uploadingDocument, setUploadingDocument] = useState<number | null>(
    null,
  );

  const handleDeleteDocument = (documentId: number) => {
    const doc = documents.find((doc) => doc.id === documentId);
    if (doc) {
      setDocumentToDelete({ id: doc.id, name: doc.name });
      setShowDeleteConfirm(true);
    }
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === documentToDelete.id
            ? {
                ...doc,
                status: "آپلود نشده",
                uploadDate: null,
                fileSize: null,
              }
            : doc,
        ),
      );
      setShowDeleteConfirm(false);
      setDocumentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDocumentToDelete(null);
  };

  const handleFileUpload = (
    documentId: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("فرمت فایل مجاز نیست. لطفاً فایل JPG، PNG یا PDF آپلود کنید.");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم فایل نباید بیشتر از 5 مگابایت باشد.");
      return;
    }

    setUploadingDocument(documentId);

    // Simulate upload process
    setTimeout(() => {
      const today = new Date().toLocaleDateString("fa-IR");
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";

      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "در انتظار تایید",
                uploadDate: today,
                fileSize: fileSize,
              }
            : doc,
        ),
      );

      setUploadingDocument(null);
      event.target.value = ""; // Clear input
    }, 2000);
  };

  return (
    <div
      className="px-4 pt-28 flex flex-col gap-6 min-h-screen bg-background"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex justify-between items-end">
        <Typography variant={"paragraph/md"} weight="bold">
          مستندات و مدارک
        </Typography>
        <div
          className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
          onClick={() => router.back()}
        >
          <IconChevronRight
            size={24}
            className="text-muted-foreground rotate-180"
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Documents List */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <IconFile size={16} className="text-primary" />
            </div>
            <Typography
              variant={"paragraph/md"}
              weight="bold"
              className="text-foreground"
            >
              مدارک مورد نیاز
            </Typography>
          </div>

          <Typography
            variant={"paragraph/sm"}
            className="text-muted-foreground bg-muted/50 p-3 rounded-lg"
          >
            فایل‌های مجاز: JPG, PNG, PDF (حداکثر 5MB)
          </Typography>

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-card rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      doc.status === "تایید شده"
                        ? "bg-primary/10"
                        : doc.status === "آپلود نشده"
                          ? "bg-red-50"
                          : "bg-muted"
                    }`}
                  >
                    <IconFile
                      size={24}
                      className={
                        doc.status === "تایید شده"
                          ? "text-primary"
                          : doc.status === "آپلود نشده"
                            ? "text-red-500"
                            : "text-muted-foreground"
                      }
                    />
                  </div>
                  <div>
                    <Typography
                      variant={"paragraph/sm"}
                      weight="bold"
                      className="text-foreground"
                    >
                      {doc.name}
                    </Typography>
                    <Typography
                      variant={"paragraph/xs"}
                      className="text-muted-foreground"
                    >
                      {doc.fileSize
                        ? `${doc.type} • ${doc.fileSize}`
                        : doc.type}
                    </Typography>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${
                    doc.status === "تایید شده"
                      ? "bg-primary/10 text-primary"
                      : doc.status === "آپلود نشده"
                        ? "bg-red-50 text-red-500"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {doc.status === "تایید شده" ? (
                    <IconCheck size={14} />
                  ) : doc.status === "آپلود نشده" ? (
                    <IconUpload size={14} />
                  ) : (
                    <IconClock size={14} />
                  )}
                  {doc.status}
                </div>
              </div>

              {doc.status === "آپلود نشده" ? (
                <div className="flex justify-center">
                  <label className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors cursor-pointer">
                    <Typography variant={"paragraph/sm"} weight="bold">
                      آپلود فایل
                    </Typography>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileUpload(doc.id, e)}
                      className="hidden"
                      disabled={uploadingDocument === doc.id}
                    />
                  </label>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <Typography
                    variant={"paragraph/xs"}
                    className="text-muted-foreground"
                  >
                    آپلود شده در {doc.uploadDate}
                  </Typography>
                  <div className="flex gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <IconEye size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <IconDownload size={16} />
                    </button>
                    <button
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => handleDeleteDocument(doc.id)}
                      title="حذف فایل"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                </div>
              )}

              {uploadingDocument === doc.id && (
                <div className="mt-3 text-center">
                  <Typography variant={"paragraph/xs"} className="text-primary">
                    در حال آپلود...
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation BottomSheet */}
      <BottomSheet
        isOpen={showDeleteConfirm}
        onClose={cancelDelete}
        hasBackdrop={true}
        hasBlur={true}
        isClosable={true}
      >
        <div className="py-6 px-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconTrash size={32} className="text-red-500" />
            </div>
            <Typography
              variant={"paragraph/lg"}
              weight="bold"
              className="text-foreground mb-2"
            >
              حذف فایل
            </Typography>
            <Typography
              variant={"paragraph/sm"}
              className="text-muted-foreground"
            >
              آیا مطمئن هستید که می‌خواهید &quot;{documentToDelete?.name}&quot;
              را حذف کنید؟
            </Typography>
            <Typography
              variant={"paragraph/xs"}
              className="text-muted-foreground mt-2"
            >
              این عمل قابل بازگشت نیست
            </Typography>
          </div>

          <div className="flex gap-3">
            <button
              onClick={cancelDelete}
              className="flex-1 bg-muted text-muted-foreground py-3 rounded-xl font-bold hover:bg-muted/80 transition-colors"
            >
              <Typography variant={"paragraph/sm"} weight="bold">
                انصراف
              </Typography>
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
            >
              <Typography variant={"paragraph/sm"} weight="bold">
                حذف
              </Typography>
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default DocumentsPage;
