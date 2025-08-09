import ArrowGrey from "../../../assets/images/ArrowGrey.svg?react";

const PolicyList = () => {
  const handleClick = (url: string) => {
    window.open(url, "_blank"); // 새 탭으로 열기
  };

  return (
    <div className="w-full border border-[#ECEEF0] rounded-xl">
      {[
        {
          title: "개인정보 처리방침",
          url: "https://www.notion.so/2499e4b6a8bf80fa8192e573f3c3633a",
        },
        {
          title: "서비스 이용약관",
          url: "https://www.notion.so/2499e4b6a8bf8061a485d9e56b71c348",
        },
      ].map(({ title, url }, idx, arr) => (
        <div
          key={url}
          onClick={() => handleClick(url)}
          style={{
            padding: "18px 20px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: idx < arr.length - 1 ? "1px solid #ddd" : "none",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor =
              "#f0f4ff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor =
              "transparent";
          }}
        >
          <span className="text-[#56585A] text-[0.875rem]">{title}</span>
          <ArrowGrey />
        </div>
      ))}
    </div>
  );
};

export default PolicyList;
