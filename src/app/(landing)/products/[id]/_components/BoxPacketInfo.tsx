// components/BoxPacketInfo.tsx

import Typography from "@/components/components/atoms/typography";

interface BoxPacketInfoProps {
  count: number | string;
  label?: string;
}

const BoxPacketInfo = ({
  count,
  label = "تعداد پاکت در باکس",
}: BoxPacketInfoProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <Typography variant="paragraph/xs" weight="normal">
        {count}
      </Typography>
      <p className="mx-2">- - - - - - - - -</p>
      <Typography variant="paragraph/xs" weight="normal">
        {label}
      </Typography>
    </div>
  );
};

export default BoxPacketInfo;
