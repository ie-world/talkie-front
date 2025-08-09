import ArrowGrey from "../../../assets/images/ArrowGrey.svg?react";

interface AgreementCheckboxesProps {
  checked1: boolean;
  setChecked1: React.Dispatch<React.SetStateAction<boolean>>;
  checked2: boolean;
  setChecked2: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgreementCheckboxes = ({
  checked1,
  setChecked1,
  checked2,
  setChecked2,
}: AgreementCheckboxesProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6 mt-6">
      <label className="flex items-center gap-2 text-sm text-[#56585A] select-none cursor-pointer">
        <input
          type="checkbox"
          checked={checked1}
          onChange={() => setChecked1((prev) => !prev)}
          className="w-4 h-4"
        />
        <span>(필수) 이용약관 동의</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              "https://www.notion.so/2499e4b6a8bf8061a485d9e56b71c348",
              "_blank"
            );
          }}
          className="ml-auto"
          aria-label="서비스 이용약관 링크 열기"
        >
          <ArrowGrey className="w-4 h-4 cursor-pointer hover:text-[#1A75FF]" />
        </button>
      </label>

      <label className="flex items-center gap-2 text-sm text-[#56585A] select-none cursor-pointer">
        <input
          type="checkbox"
          checked={checked2}
          onChange={() => setChecked2((prev) => !prev)}
          className="w-4 h-4"
        />
        <span>(필수) 개인정보 수집 및 이용 동의</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              "https://www.notion.so/2499e4b6a8bf80fa8192e573f3c3633a",
              "_blank"
            );
          }}
          className="ml-auto"
          aria-label="개인정보 처리방침 링크 열기"
        >
          <ArrowGrey className="w-4 h-4 cursor-pointer hover:text-[#1A75FF]" />
        </button>
      </label>
    </div>
  );
};

export default AgreementCheckboxes;
