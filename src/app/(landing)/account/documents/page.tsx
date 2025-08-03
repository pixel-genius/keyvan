"use client";

import {
  IconFile,
  IconDownload,
  IconEye,
  IconUpload,
  IconCheck,
  IconClock,
  IconChevronRight,
} from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();

  const documents = [
    {
      id: 1,
      name: "کارت ملی",
      type: "تصویر",
      status: "تایید شده",
      uploadDate: "1402/01/15",
      fileSize: "2.5 MB",
    },
    {
      id: 2,
      name: "شناسنامه",
      type: "تصویر",
      status: "تایید شده",
      uploadDate: "1402/01/15",
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      name: "مدرک تحصیلی",
      type: "PDF",
      status: "در انتظار تایید",
      uploadDate: "1402/01/20",
      fileSize: "3.2 MB",
    },
  ];

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
        {/* Upload New Document */}
        <div className="bg-primary rounded-2xl p-6 shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconUpload size={32} className="text-primary-foreground" />
            </div>
            <Typography
              variant={"paragraph/md"}
              weight="bold"
              className="text-primary-foreground mb-2"
            >
              آپلود مدرک جدید
            </Typography>
            <Typography
              variant={"paragraph/sm"}
              className="text-primary-foreground/90 mb-6"
            >
              فایل‌های مجاز: JPG, PNG, PDF (حداکثر 5MB)
            </Typography>
            <button className="bg-primary-foreground text-primary px-8 py-3 rounded-xl font-bold hover:bg-primary-foreground/90 transition-colors">
              <Typography variant={"paragraph/sm"} weight="bold">
                انتخاب فایل
              </Typography>
            </button>
          </div>
        </div>

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
              مدارک آپلود شده
            </Typography>
          </div>

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-card rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      doc.status === "تایید شده" ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <IconFile
                      size={24}
                      className={
                        doc.status === "تایید شده"
                          ? "text-primary"
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
                      {doc.type} • {doc.fileSize}
                    </Typography>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${
                    doc.status === "تایید شده"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {doc.status === "تایید شده" ? (
                    <IconCheck size={14} />
                  ) : (
                    <IconClock size={14} />
                  )}
                  {doc.status}
                </div>
              </div>

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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
