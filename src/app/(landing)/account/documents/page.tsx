"use client";

import {
  IconCheck,
  IconClock,
  IconDownload,
  IconEye,
  IconFile,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import { useAccountFilesUploadPost } from "@/utils/apis/account/files/upload/POST/accountFilesUploadPostApi";
import Typography from "@/components/components/atoms/typography";
import { useAuthStore } from "@/utils/store/authenticate.store";
import BottomSheet from "@/app/_components/BottomSheet";
import PageTitle from "@/app/_components/PageTitle";
import { UploadFileApiCategory } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";

type DocumentState = {
  id: number;
  name: string;
  type: string;
  status: string;
  key: UploadFileApiCategory;
  uploadDate: string | null;
  fileSize: string | null;
  required: boolean;
}[];

const DocumentsPage = () => {
  const { userProfileInfo } = useAuthStore();
  const [documents, setDocuments] = useState<DocumentState>([
    {
      id: 1,
      name: "کارت ملی",
      type: "تصویر",
      status: "آپلود نشده",
      key: "national_card",
      uploadDate: null,
      fileSize: null,
      required: true,
    },
    {
      id: 2,
      name: "مجوز توزیع استانی یا کشوری",
      type: "تصویر",
      status: "آپلود نشده",
      key: "business_license",
      uploadDate: null,
      fileSize: null,
      required: true,
    },
    {
      id: 3,
      name: "جواز کسب",
      type: "تصویر",
      status: "آپلود نشده",
      key: "certification",
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

  const accountFileUploadMutate = useAccountFilesUploadPost({
    onError: () => {
      toast.error("خطا در آپلود فایل");
    },
  });

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

  const handleFileUpload = ({
    documentId,
    event,
    key,
  }: {
    documentId: number;
    event: React.ChangeEvent<HTMLInputElement>;
    key: UploadFileApiCategory;
  }) => {
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
      toast.error(
        "فرمت فایل مجاز نیست. لطفاً فایل JPG، PNG یا PDF آپلود کنید.",
      );
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم فایل نباید بیشتر از 5 مگابایت باشد.");
      return;
    }

    setUploadingDocument(documentId);
    accountFileUploadMutate
      .mutateAsync({
        user_id: userProfileInfo?.user_id,
        category: key,
        file,
      })
      .then((res) => {
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc.id === documentId
              ? {
                  ...doc,
                  status: "در انتظار تایید",
                  uploadDate: res.file.created_at,
                  fileSize: (res.file.size / (1024 * 1024)).toFixed(1) + " MB",
                }
              : doc,
          ),
        );
      })
      .finally(() => {
        setUploadingDocument(null);
        event.target.value = "";
        event.target.files = null;
      });
  };

  return (
    <div className="pb-4 pt-8 flex flex-col gap-6 bg-background" dir="rtl">
      {/* Header */}
      <PageTitle title="اسناد و مدارک" />

      <div className="space-y-6 mt-8">
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
                      onChange={(e) =>
                        handleFileUpload({
                          documentId: doc.id,
                          event: e,
                          key: doc.key,
                        })
                      }
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
